import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { DataRequestDTO } from './request-data.dto';

export const GetHardcodedGraphSwaggerOperation = () =>
  ApiOperation({
    summary: 'Получить некоторые данные из БД',
    description:
      'Получить данные из одной таблицы БД с возможностью выбрать данные из ' +
      'разных колонок, установить комплексную фильтрацию с несколькими условиями, ' +
      'отсортировать по колонкам и добавить пагинацию.',
  });

export const GetHardcodedGraphSwaggerBody = () =>
  ApiBody({
    description: 'User creation data',
    type: DataRequestDTO,
    examples: {
      default: {
        value: {
          entity: 'my_table',
          fields: ['column1', 'column2'],
          filter: {
            column1: {
              eq: 'value1',
            },
            column2: {
              gt: 10,
            },
          },
          sort: {
            column1: 'ASC',
          },
          pagination: {
            limit: 10,
            offset: 0,
          },
        },
      },
    },
  });
