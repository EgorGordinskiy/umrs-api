import { setSeederFactory } from 'typeorm-extension';
import { getRandomBoolean } from '../../common/utilFunctions';
import { Survey } from '../../modules/survey/survey.entity';

export default setSeederFactory(Survey, (faker) => {
  const survey = new Survey();
  survey.title = faker.word.noun();
  survey.description = faker.lorem.sentence();
  survey.isActive = getRandomBoolean();
  survey.createdAt = faker.date.past();
  if (getRandomBoolean()) {
    survey.updatedAt = faker.date.past({ refDate: survey.createdAt });
  }

  return survey;
});
