/**
 * DTO для обновления анкеты.
 */
export class UpdateSurveyDto {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly isActive?: boolean;
  readonly schemaId?: number;
}
