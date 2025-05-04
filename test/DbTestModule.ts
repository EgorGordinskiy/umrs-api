/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeOrmModule } from '@nestjs/typeorm';

export const DbTestModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'database',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entities: [...entities],
    synchronize: true,
  });
