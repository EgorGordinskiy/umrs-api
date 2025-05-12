import { seedDatabase } from '../functions';
import { Logger } from '@nestjs/common';

seedDatabase().catch((err: Error) => {
  Logger.error(err.message, err.stack, err.name);
});
