import CursorPaginatedRequestDto from './cursor-paginated-request.dto';
import { Repository } from 'typeorm';
import CursorPaginatedResponseDto from './cursor-paginated-response.dto';

interface CursorPaginatedEntity {
  id: string; // todo пока для строк только
  createdAt: Date;
}

export default async function getCursorPaginated<
  MyEntity extends CursorPaginatedEntity,
>(
  dto: CursorPaginatedRequestDto,
  entityName: string,
  repository: Repository<MyEntity>,
): Promise<CursorPaginatedResponseDto<MyEntity>> {
  const { cursor, limit } = dto;
  const queryBuilder = repository
    .createQueryBuilder(entityName)
    .orderBy(`${entityName}.createdAt`, 'DESC') // todo может ещё тут updatedAt как-то прикрутить
    .addOrderBy(`${entityName}.id`, 'DESC')
    .limit(limit + 1);

  if (cursor) {
    const [timestamp, lastId] = decodeCursor(cursor);
    queryBuilder.where(
      `(${entityName}.createdAt < :timestamp) OR (${entityName}.createdAt = :timestamp AND ${entityName}.id < :lastId)`,
      { timestamp, lastId },
    );
  }

  const items = await queryBuilder.getMany();
  const hasNextPage = items.length > limit;
  const results = hasNextPage ? items.slice(0, -1) : items;

  return {
    items: results,
    hasNextPage,
    nextCursor: hasNextPage
      ? encodeCursor(results[results.length - 1])
      : undefined,
  };
}

function encodeCursor<MyEntity extends CursorPaginatedEntity>(
  entity: MyEntity,
): string {
  return Buffer.from(`${entity.createdAt.toISOString()}_${entity.id}`).toString(
    'base64',
  );
}

function decodeCursor(cursor: string): [Date, number | string] {
  const [timestamp, id] = Buffer.from(cursor, 'base64')
    .toString('ascii')
    .split('_');

  let idParsed: number | string = parseInt(id, 10);
  if (Number.isNaN(idParsed)) {
    idParsed = id;
  }
  return [new Date(timestamp), idParsed];
}
