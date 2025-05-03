import { seedDatabase } from '../functions/seedDatabase';
import { Logger } from '@nestjs/common';

seedDatabase().catch((err) => {
  Logger.error('Error during seeding:', err);
});
