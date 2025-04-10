import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

interface GraphDataPoint {
  timestamp: string;
  value: number;
}

interface GraphData {
  data: GraphDataPoint[];
}

@Controller('hardcoded-chart')
export class HardcodedChartController {
  @Get()
  @ApiOperation({ summary: 'Получить данные тестового графика' })
  public getHardcodedGraph(): Promise<GraphData> {
    return Promise.resolve({
      data: [
        { timestamp: '2025-01-01T00:00:00.000Z', value: 10 },
        { timestamp: '2025-01-02T00:00:00.000Z', value: 20 },
        { timestamp: '2025-01-03T00:00:00.000Z', value: 30 },
        { timestamp: '2025-01-04T00:00:00.000Z', value: 40 },
        { timestamp: '2025-01-05T00:00:00.000Z', value: 20 },
        { timestamp: '2025-01-06T00:00:00.000Z', value: 60 },
        { timestamp: '2025-01-07T00:00:00.000Z', value: 30 },
        { timestamp: '2025-01-08T00:00:00.000Z', value: 65 },
        { timestamp: '2025-01-09T00:00:00.000Z', value: 90 },
        { timestamp: '2025-01-10T00:00:00.000Z', value: 40 },
      ],
    });
  }
}
