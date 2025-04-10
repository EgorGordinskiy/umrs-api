import { Module } from '@nestjs/common';
import { HardcodedChartController } from './hardcoded-chart-controller/hardcoded-chart.controller';

@Module({
  controllers: [HardcodedChartController],
})
export class InfographicsModule {}
