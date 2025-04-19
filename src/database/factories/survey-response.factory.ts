import { setSeederFactory } from 'typeorm-extension';
import { SurveyResponse } from '../../modules/survey/survey-response/survey-response.entity';
import { getRandomBoolean } from '../../common/utilFunctions';
import { Faker } from '@faker-js/faker';

export const getDataTypeOne = (faker: Faker) => {
  return {
    name: faker.person.fullName(),
    areYouCrazy: faker.helpers.arrayElement(['yes', 'no']),
    areYouCrazyReason: faker.lorem.sentence(),
    selectedAttributes: faker.helpers.arrayElements([
      'goodAtMath',
      'goodAtEnglish',
      'goodAtPhysics',
      'what?',
    ]),
  };
};

export const getDataTypeTwo = (faker: Faker) => {
  return {
    time: faker.date.past(),
    location: faker.location.streetAddress(),
    weather: faker.helpers.arrayElement(['sunny', 'cloudy', 'rainy']),
    temperature: faker.number.int({ min: 0, max: 100 }),
    wealth: faker.number.int({ min: 0, max: 100 }),
  };
};

export const getDataTypeThree = (faker: Faker) => {
  return {
    distance: faker.number.int({ min: 0, max: 100 }),
    departure: faker.location.streetAddress(),
    destination: faker.location.streetAddress(),
    time: faker.date.past(),
  };
};

export const getDataTypeFour = (faker: Faker) => {
  return {
    moneySpent: faker.number.int({ min: 0, max: 100 }),
    timeSpent: faker.number.int({ min: 0, max: 100 }),
    moneyEarned: faker.number.int({ min: 0, max: 100 }),
    order: faker.helpers.arrayElement(['yes', 'no']),
    organization: faker.helpers.arrayElement(['yes', 'no']),
    name: faker.person.fullName(),
    sex: faker.helpers.arrayElement(['male', 'female']),
  };
};

export default setSeederFactory(SurveyResponse, (faker) => {
  const response = new SurveyResponse();
  response.createdAt = faker.date.past();
  if (getRandomBoolean()) {
    response.updatedAt = faker.date.past({ refDate: response.createdAt });
  }
  response.metadata = {
    userAgent: faker.internet.userAgent(),
    timeSpent: faker.number.int(),
    device: {
      type: faker.helpers.arrayElement(['desktop', 'mobile', 'tablet']),
      os: faker.helpers.arrayElement([
        'linux',
        'windows',
        'ios',
        'android',
        'mac',
      ]),
      browser: faker.internet.userAgent(),
    },
  };

  return response;
});
