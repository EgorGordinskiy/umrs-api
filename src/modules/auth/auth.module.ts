import { Module } from '@nestjs/common';
import { OpenIdService } from './openid.service';
import { AuthGuard } from './auth.guard';

@Module({
  exports: [OpenIdService, AuthGuard],
  providers: [OpenIdService, AuthGuard],
})
export class AuthModule {}
