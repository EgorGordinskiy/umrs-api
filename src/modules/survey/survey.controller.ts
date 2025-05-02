import { Controller, Get, Param, Query } from '@nestjs/common';
import { Survey } from './survey.entity';
import { SurveyService } from './survey.service';
import { BaseCrudController } from '../../common/abstract/controller';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Анкеты')
@Controller('survey')
export class SurveyController extends BaseCrudController<
  Survey,
  CreateSurveyDto,
  UpdateSurveyDto
> {
  constructor(protected readonly service: SurveyService) {
    super(service);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Получить анкету по ID.',
    description: 'Получить анкету по ID и связанным с ней данным.',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID анкеты' })
  @ApiOkResponse({ description: 'Анкета успешно получена.' })
  @ApiNotFoundResponse({ description: 'Анкета не найдена.' })
  public async findOne(
    @Param('id') id: string,
    @Query('withSchema') withSchema: boolean = false,
    @Query('withResponses') withResponses: boolean = false,
  ): Promise<Survey> {
    return await this.service.findOne(id, withSchema, withResponses);
  }
}
