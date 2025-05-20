import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SortDirection } from '../../database/extensions';
import { ObjectLiteral, QueryBuilder, Repository } from 'typeorm';

// query example:
// {
//   and: [
//     { key: 'name', value: 'John', operator: 'eq' },
//     {
//       or: [
//         { key: 'age', value: 30, operator: 'gt' },
//         { key: 'age', value: 25, operator: 'lt' },
//       ],
//     },
//   ],
// }

enum ComparisonOperator {
  EQ = 'eq',
  NEQ = 'neq',
  GT = 'gt',
  LT = 'lt',
  CONTAINS = 'contains',
  LIKE = 'like',
  IN = 'in',
  NOT_IN = 'notIn',
  JSON_CONTAINS = 'jsonContains',
  JSON_EQUALS = 'jsonEquals',
}

export interface FilterNode {
  type: 'condition' | 'logicalOperator';
}

export class ConditionNode implements FilterNode {
  type: 'condition';

  @ApiProperty({
    description: 'Поле для фильтрации',
    example: 'profile.employee.salary',
  })
  key: string;

  @ApiProperty({
    description: 'Значение для фильтрации',
    example: '5678',
  })
  value: unknown;

  @ApiProperty({
    description: 'Оператор для фильтрации',
    enum: Object.values(ComparisonOperator),
    default: Object.values(ComparisonOperator)[0],
  })
  operator: ComparisonOperator;
}

export class LogicalOperatorNode implements FilterNode {
  type: 'logicalOperator';

  @ApiProperty({
    description: 'Логический оператор для фильтрации',
    type: String,
    enum: ['and', 'or', 'not', 'nor'],
  })
  operator: 'and' | 'or' | 'not' | 'nor';

  children: FilterNode[];
}

export class DataRequestDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Имя сущности, откуда запрашивается данные' })
  entity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Имя колонки, откуда запрашивается данные' })
  column: string;

  @IsArray()
  @ApiProperty({
    description: 'Список JSON полей',
    example: ['id', 'name', 'profile.photo', 'profile.photo.width'],
  })
  fields?: string[];

  @IsObject()
  @ApiProperty({
    description: 'Фильтр по JSON',
  })
  filter?: FilterNode;

  // todo вот нельзя как-то учитывать и БД record и внутренний JSON и надо ли
  @IsObject()
  @ApiProperty({
    enum: Object.values(SortDirection),
    default: Object.values(SortDirection)[0],
    description: 'Сортировать JSON по полю',
  })
  sort?: { [key: string]: SortDirection };
}

function buildSqlFilter(
  node: FilterNode,
  entityName: string,
  paramValues: any[] = [],
): { sql: string; values: any[] } {
  if ('key' in node && 'value' in node && 'operator' in node) {
    // Handle condition node
    paramValues.push(node.value);
    const paramIndex = paramValues.length;

    switch (node.operator) {
      case 'eq':
        return {
          sql: `${entityName}.${node.key} = $${paramIndex}`,
          values: paramValues,
        };
      case 'neq':
        return {
          sql: `${entityName}.${node.key} != $${paramIndex}`,
          values: paramValues,
        };
      case 'gt':
        return {
          sql: `${entityName}.${node.key} > $${paramIndex}`,
          values: paramValues,
        };
      case 'lt':
        return {
          sql: `${entityName}.${node.key} < $${paramIndex}`,
          values: paramValues,
        };
      case 'contains':
        paramValues[paramIndex - 1] = `%${node.value}%`;
        return {
          sql: `${entityName}.${node.key} LIKE $${paramIndex}`,
          values: paramValues,
        };
      case 'in':
        return {
          sql: `${entityName}.${node.key} = ANY($${paramIndex})`,
          values: paramValues,
        };
      case 'jsonContains':
        return {
          sql: `${entityName}.${node.key}::jsonb @> $${paramIndex}::jsonb`,
          values: paramValues,
        };
      default:
        throw new Error(`Unsupported operator: ${node.operator}`);
    }
  } else if ('and' in node) {
    const conditions = node.and.map((child) =>
      buildSqlFilter(child, entityName, paramValues),
    );
    return {
      sql: `(${conditions.map((c) => c.sql).join(' AND ')})`,
      values: paramValues,
    };
  } else if ('or' in node) {
    const conditions = node.or.map((child) =>
      buildSqlFilter(child, entityName, paramValues),
    );
    return {
      sql: `(${conditions.map((c) => c.sql).join(' OR ')})`,
      values: paramValues,
    };
  } else if ('not' in node) {
    const condition = buildSqlFilter(node.not, entityName, paramValues);
    return {
      sql: `NOT (${condition.sql})`,
      values: paramValues,
    };
  } else if ('nor' in node) {
    const conditions = node.nor.map((child) =>
      buildSqlFilter(child, entityName, paramValues),
    );
    return {
      sql: `NOT (${conditions.map((c) => c.sql).join(' OR ')})`,
      values: paramValues,
    };
  }

  throw new Error('Invalid filter node structure');
}

// Helper function to execute the query
export async function executeJsonFilter<T>(
  dataSource: DataSource,
  filter: FilterNode,
  entityName: string,
  sortBy?: { [key: string]: 'ASC' | 'DESC' },
): Promise<T[]> {
  const { sql: whereSql, values } = buildSqlFilter(filter, entityName);

  let query = `SELECT * FROM ${entityName} WHERE ${whereSql}`;

  // Add sorting if provided
  if (sortBy) {
    const orderClauses = Object.entries(sortBy)
      .map(([key, direction]) => `${entityName}.${key} ${direction}`)
      .join(', ');
    query += ` ORDER BY ${orderClauses}`;
  }

  // Execute the query using DataSource
  return dataSource.query(query, values);
}
