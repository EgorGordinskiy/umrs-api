import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './constants';
import { OffsetPaginated } from './offset-paginated';

export const OffsetPaginationParams = createParamDecorator(
  (options: unknown, ctx: ExecutionContext): OffsetPaginated => {
    const req: Request = ctx.switchToHttp().getRequest();
    let page = parseInt(req.query.page as string);
    let size = parseInt(req.query.size as string);

    page = isNaN(page) ? DEFAULT_PAGE : page;
    size = isNaN(size) ? DEFAULT_LIMIT : size;

    const limit = size;
    const offset = (page - 1) * size;

    const params = plainToClass(OffsetPaginated, {
      page,
      size,
      limit,
      offset,
    });

    console.log(params);

    const errors = validateSync(params, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => Object.values(err.constraints || {}).join(', '))
        .join('; ');
      throw new BadRequestException(
        `Неверные параметры постраничного выбора: ${errorMessages}`,
      );
    }

    return params;
  },
);
