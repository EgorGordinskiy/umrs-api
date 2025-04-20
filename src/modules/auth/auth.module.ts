import { Module } from '@nestjs/common';
import { OpenIdService } from './openid.service';
import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { UnauthorizedExceptionFilter } from './unauthorized-exception.filter';

@Module({
  exports: [OpenIdService, AuthGuard, UnauthorizedExceptionFilter],
  providers: [OpenIdService, AuthGuard, UnauthorizedExceptionFilter],
  controllers: [AuthController],
})
export class AuthModule {}
