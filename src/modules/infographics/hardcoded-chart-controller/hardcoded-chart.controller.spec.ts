import { Test, TestingModule } from '@nestjs/testing';
import { HardcodedChartController } from './hardcoded-chart.controller';

describe('HardcodedChartController', () => {
  let controller: HardcodedChartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HardcodedChartController],
    }).compile();

    controller = module.get<HardcodedChartController>(HardcodedChartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
