import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as client from 'openid-client';
import { Request as ExpressRequest } from 'express';

export interface AuthFlow {
  code_verifier: string;
  redirect_uri: string;
  cameFrom: string;
  created_at: Date;
}

export interface AuthState {
  id: string;
  cameFrom: string;
}

@Injectable()
export class OpenIdService implements OnModuleInit {
  private readonly flowStorage = new Map<string, AuthFlow>();
  public config: client.Configuration;
  private readonly logger = new Logger(OpenIdService.name);

  async onModuleInit() {
    const server = URL.parse(process.env.KEYCLOAK_ISSUER!)!; // Authorization Server's Issuer Identifier
    const clientId = process.env.KEYCLOAK_CLIENT_ID!; // Client identifier at the Authorization Server
    const clientSecret = process.env.CLIENT_SECRET!;

    this.config = await client.discovery(server, clientId, clientSecret);
  }

  createAuthFlow(
    flowId: string,
    code_verifier: string,
    redirect_uri: string,
    cameFrom: string,
  ) {
    const flow: AuthFlow = {
      code_verifier,
      redirect_uri,
      cameFrom,
      created_at: new Date(),
    };

    this.flowStorage.set(flowId, flow);

    // Cleanup old flows periodically
    this.cleanupOldFlows();

    return flowId;
  }

  getAuthFlow(flowId: string): AuthFlow {
    const flow = this.flowStorage.get(flowId);
    if (!flow) throw new Error('Auth flow not found');
    return flow;
  }

  private cleanupOldFlows() {
    const expiryTime = 5 * 60 * 1000; // 5 minutes
    const now = new Date();

    for (const [id, flow] of this.flowStorage.entries()) {
      if (now.getTime() - flow.created_at.getTime() > expiryTime) {
        this.flowStorage.delete(id);
      }
    }
  }

  // Clean up method to remove stored values after they're no longer needed
  public cleanupFlow(flowId: string): void {
    this.flowStorage.delete(flowId);
  }

  public extractTokenFromHeader(request: ExpressRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  public getCurrentUrl(baseUrl: string, request: Request): URL {
    // Construct the full callback URL including query parameters
    const callbackUrl = new URL(baseUrl);

    // Add all query parameters from the request
    const queryParams = new URLSearchParams(request.url.split('?')[1]);
    for (const [key, value] of queryParams.entries()) {
      callbackUrl.searchParams.append(key, value);
    }
    return callbackUrl;
  }
}
