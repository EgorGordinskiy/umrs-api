import { Module } from '@nestjs/common';

@Module({
  exports: [AuthModule],
})
export class AuthModule {}
