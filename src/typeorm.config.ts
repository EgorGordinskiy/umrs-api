import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { DEVELOPMENT } from './common/constants';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: process.env.NODE_ENV === DEVELOPMENT,

  // логирование
  logging: ['error'],
  maxQueryExecutionTime: 5000, // логировать запросы, выполняющиеся более 5 с
};

const AppDataSource = new DataSource(dataSourceOptions);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
