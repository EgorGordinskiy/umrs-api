/* eslint-disable @typescript-eslint/no-explicit-any */
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { SurveyResponse } from '../../modules/survey/survey-response/survey-response.entity';
import { Survey } from '../../modules/survey/survey.entity';
import {
  getDataTypeOne,
  getDataTypeTwo,
  getDataTypeThree,
  getDataTypeFour,
} from '../factories/survey-response.factory';
import { Faker, faker } from '@faker-js/faker';
import { SurveySchema } from '../../modules/survey/survey-schema/survey-schema.entity';

export default class SurveySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // фабрики
    const surveyFactory = factoryManager.get(Survey);
    const surveyResponseFactory = factoryManager.get(SurveyResponse);
    const surveySchemaFactory = factoryManager.get(SurveySchema);

    // репозитории
    const surveysRepository = dataSource.getRepository(Survey);
    const surveySchemaRepository = dataSource.getRepository(SurveySchema);
    const surveyResponseRepository = dataSource.getRepository(SurveyResponse);

    // создать одну схему на время
    const schema = await surveySchemaFactory.make();
    await surveySchemaRepository.save(schema);

    // создать ответы на анкеты 4-х типов для каждой анкеты
    const createSurveyType = async (
      amount: number,
      dataCreate: (arg: Faker) => Record<string, any>,
    ) => {
      return await Promise.all(
        Array(amount)
          .fill('')
          .map(async () => {
            return await surveyResponseFactory.make({
              data: dataCreate(faker),
            });
          }),
      );
    };

    const getRandomInt = () => {
      return faker.number.int({ min: 1, max: 100 });
    };

    const responsesTypeOne = await createSurveyType(
      getRandomInt(),
      getDataTypeOne,
    );
    const responsesTypeTwo = await createSurveyType(
      getRandomInt(),
      getDataTypeTwo,
    );
    const responsesTypeThree = await createSurveyType(
      getRandomInt(),
      getDataTypeThree,
    );
    const responsesTypeFour = await createSurveyType(
      getRandomInt(),
      getDataTypeFour,
    );

    const surveyResponsesTypes = [
      responsesTypeOne,
      responsesTypeTwo,
      responsesTypeThree,
      responsesTypeFour,
    ];

    // создать сами анкеты, связав их с временной пустой схемой и созданными ответами

    for (let i = 0; i < 4; i++) {
      await surveyResponseRepository.save(surveyResponsesTypes[i]);
      const survey = await surveyFactory.make({
        responses: surveyResponsesTypes[i],
        schema,
      });
      await surveysRepository.save(survey);
    }
  }
}
