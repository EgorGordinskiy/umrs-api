import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../../typeorm.config';
import { DEVELOPMENT } from '../../common/constants';
import { Logger } from '@nestjs/common';

export default async function clearDatabase(
  dataSource = new DataSource(dataSourceOptions),
) {
  if (process.env.NODE_ENV !== DEVELOPMENT) {
    throw new Error('Очистка базы данных только для среды разработки');
  }
  if (!dataSource.isInitialized) {
    Logger.log('Initializing database...');
    await dataSource.initialize();
  }
  await dataSource.dropDatabase();
  await dataSource.synchronize();
}
