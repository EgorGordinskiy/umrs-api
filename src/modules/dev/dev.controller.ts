import { Controller, Get } from '@nestjs/common';
import seedDatabase from '../../database/runSeeders';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import clearDatabase from '../../database/clearDatabase';
import { DataSource } from 'typeorm';

/**
 * Специфичные для нужд разработки endpoint'ы управления пока только базой данных
 * чтобы, допустим, не перезапускать контейнер БД для регенерации тестовых данных
 * или не запускать регенерацию из консоли.
 */
@ApiTags('Для разработки')
@Controller('dev')
export class DevController {
  constructor(private readonly dataSource: DataSource) {}

  @Get('seed')
  @ApiOperation({ summary: 'Сгенерировать тестовые данные.' })
  public async seed() {
    await seedDatabase(true, this.dataSource);
  }

  @Get('reseed')
  @ApiOperation({
    summary: 'Перезаписать существующие данные в базе данных новыми тестовыми.',
  })
  public async reseed() {
    await clearDatabase(this.dataSource);
    await seedDatabase(true, this.dataSource);
  }
}
