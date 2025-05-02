import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import OffsetPaginated from './offset-paginated';

export const PaginationParams = createParamDecorator(
  (ctx: ExecutionContext): OffsetPaginated => {
    const req: Request = ctx.switchToHttp().getRequest();
    const page = parseInt(req.query.page as string);
    const size = parseInt(req.query.size as string);

    return new OffsetPaginated({
      page: page,
      size: size,
    });
  },
);
