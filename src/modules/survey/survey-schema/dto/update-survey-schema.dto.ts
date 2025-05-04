import { SurveySchemaStructure } from '../survey-schema.entity';

export class UpdateSurveySchemaDto {
  readonly id: string;
  readonly name?: string;
  readonly structure?: SurveySchemaStructure;
}
