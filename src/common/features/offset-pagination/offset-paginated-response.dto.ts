export type OffsetPaginatedResponse<T> = {
  /**
   * Общее количество записей в базе данных.
   */
  totalItems: number;
  /**
   * Номер страницы, на которой ответ был получен.
   */
  page: number;
  /**
   * Размер изначально запрошенной страницы.
   */
  size: number;
  /**
   * Список полученных элементов.
   */
  items: T[];
};
