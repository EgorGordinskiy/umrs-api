import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export interface Sorting {
  property: string;
  direction: string;
}

export const SortingParams = createParamDecorator(
  (validParams: object, ctx: ExecutionContext): Sorting | null => {
    const req: Request = ctx.switchToHttp().getRequest();
    const sort = req.query.sort as string;
    if (!sort) return null;

    const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;
    if (!sort.match(sortPattern))
      throw new BadRequestException('Неверный формат сортировки');

    const [property, direction] = sort.split(':');
    if (!(property in validParams))
      throw new BadRequestException(
        `Неверное свойство для сортировки: ${property}`,
      );

    return { property, direction };
  },
);
