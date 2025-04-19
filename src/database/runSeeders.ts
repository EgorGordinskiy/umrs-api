import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { dataSourceOptions } from '../typeorm.config';
import { Survey } from '../modules/survey/survey.entity';
import { SurveyResponse } from '../modules/survey/survey-response/survey-response.entity';

const greenConsoleLog = (text: string) => console.log(`\x1b[32m${text}\x1b[0m`);
const redConsoleLog = (text: string) => console.log(`\x1b[31m${text}\x1b[0m`);

export default async function seedDatabase(
  dataSource = new DataSource(dataSourceOptions),
) {
  await dataSource.initialize();

  // region Не генерировать новые данные при каждом перезапуске контейнера разработки
  const surveyCount = await dataSource.getRepository(Survey).count();
  const surveyResponseCount = await dataSource
    .getRepository(SurveyResponse)
    .count();

  if (surveyCount > 0 || surveyResponseCount > 0) {
    redConsoleLog(
      "Data already exists in the database. New data won't be seeded. " +
        'Please restart the database service if you need to reseed.',
    );
    await dataSource.destroy();
    return;
  }
  // endregion

  await runSeeders(dataSource, {
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
  });

  greenConsoleLog('Data was seeded with test data!');
  await dataSource.destroy();
}

seedDatabase().catch((err) => {
  console.error('Error during seeding:', err);
});
