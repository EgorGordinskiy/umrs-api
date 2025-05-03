import { Controller, Get, Logger } from '@nestjs/common';
import { seedDatabase } from '../../database/functions/seedDatabase';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import clearDatabase from '../../database/functions/clearDatabase';
import { DataSource } from 'typeorm';

/**
 * Специфичные для нужд разработки endpoint'ы управления пока только базой данных
 * чтобы, допустим, не перезапускать контейнер БД для регенерации тестовых данных
 * или не запускать регенерацию из консоли.
 */
@ApiTags('Для разработки')
@Controller('dev')
export class DevController {
  private readonly logger = new Logger(DevController.name);

  constructor(private readonly dataSource: DataSource) {}

  @Get('seed')
  @ApiOperation({ summary: 'Сгенерировать тестовые данные.' })
  public async seed() {
    await seedDatabase(true, this.dataSource);
    this.logger.log('Seeding finished');
  }

  @Get('reseed')
  @ApiOperation({
    summary: 'Перезаписать существующие данные в базе данных новыми тестовыми.',
  })
  public async reseed() {
    await clearDatabase(this.dataSource);
    await seedDatabase(true, this.dataSource);
    this.logger.log('Reseeding finished');
  }
}
