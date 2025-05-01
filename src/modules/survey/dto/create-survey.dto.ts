/**
 * DTO для создания новой анкеты.
 */
export class CreateSurveyDto {
  readonly title: string;
  readonly description?: string;
  readonly isActive?: boolean = true;
  readonly schemaId: number;
}
