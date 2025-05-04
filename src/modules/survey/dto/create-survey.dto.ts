import { IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * DTO для создания новой анкеты.
 */
export class CreateSurveyDto {
  @IsString()
  readonly title: string;
  @IsOptional()
  readonly description?: string;
  @IsOptional()
  readonly isActive?: boolean = true;
  @IsUUID()
  readonly schemaId: string;
}
