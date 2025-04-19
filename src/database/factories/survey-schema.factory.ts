import { setSeederFactory } from 'typeorm-extension';
import { SurveySchema } from '../../modules/survey/survey-schema/survey-schema.entity';
import { getRandomBoolean } from '../../common/utilFunctions';

export default setSeederFactory(SurveySchema, (faker) => {
  const schema = new SurveySchema();
  schema.name = faker.word.noun();
  schema.createdAt = faker.date.past();
  if (getRandomBoolean()) {
    schema.updatedAt = faker.date.past({ refDate: schema.createdAt });
  }

  schema.structure = {
    blocks: [],
    actions: [],
  };

  return schema;
});
