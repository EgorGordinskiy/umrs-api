import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { dataSourceOptions } from '../typeorm.config';
import { Survey } from '../modules/survey/survey.entity';
import { SurveyResponse } from '../modules/survey/survey-response/survey-response.entity';
import { Logger } from '@nestjs/common';
import { DEVELOPMENT } from '../common/constants';

export default async function seedDatabase(
  force = false,
  dataSource = new DataSource(dataSourceOptions),
) {
  if (process.env.NODE_ENV !== DEVELOPMENT) {
    throw new Error('Генерация тестовых данных только для среды разработки');
  }

  if (!dataSource.isInitialized) {
    Logger.log('Initializing database...');
    await dataSource.initialize();
  }

  // region Не генерировать новые данные при каждом перезапуске контейнера разработки
  if (!force) {
    const surveyCount = await dataSource.getRepository(Survey).count();
    const surveyResponseCount = await dataSource
      .getRepository(SurveyResponse)
      .count();

    if (surveyCount > 0 || surveyResponseCount > 0) {
      Logger.error(
        "Data already exists in the database. New data won't be seeded. " +
          'Please restart the database service if you need to reseed.',
      );
      await dataSource.destroy();
      return;
    }
  }
  // endregion

  await runSeeders(dataSource, {
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
  });

  Logger.log('Data was seeded with test data!');
}

seedDatabase().catch((err) => {
  Logger.error('Error during seeding:', err);
});
