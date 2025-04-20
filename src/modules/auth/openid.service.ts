import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as client from 'openid-client';
import * as process from 'node:process';
import { Request } from 'express';

@Injectable()
export class OpenIdService implements OnModuleInit {
  public config: client.Configuration;
  private readonly logger = new Logger(OpenIdService.name);

  async onModuleInit() {
    const server = URL.parse(process.env.KEYCLOAK_ISSUER!)!; // Authorization Server's Issuer Identifier
    const clientId = process.env.KEYCLOAK_CLIENT_ID!; // Client identifier at the Authorization Server
    const clientSecret = process.env.CLIENT_SECRET!;

    this.config = await client.discovery(server, clientId, clientSecret);
    this.logger.log(this.config);
  }

  public extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
