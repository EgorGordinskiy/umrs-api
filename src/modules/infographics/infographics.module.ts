import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { HardcodedChartController } from './hardcoded-chart.controller';

@Module({
  controllers: [HardcodedChartController],
  imports: [AuthModule],
})
export class InfographicsModule {}
