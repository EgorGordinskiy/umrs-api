import { SurveySchemaStructure } from '../survey-schema.entity';

export class CreateSurveySchemaDto {
  readonly name: string;
  readonly structure: SurveySchemaStructure;
}
