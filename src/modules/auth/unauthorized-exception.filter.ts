import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import * as client from 'openid-client';
import { OpenIdService } from './openid.service';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(UnauthorizedExceptionFilter.name);

  constructor(private openIdService: OpenIdService) {}

  async catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const scope = 'openid profile email';
    const redirect_uri = 'http://umrs-api:3000/api/auth/callback';
    /**
     * PKCE: The following MUST be generated for every redirect to the
     * authorization_endpoint. You must store the code_verifier and state in the
     * end-user session such that it can be recovered as the user gets redirected
     * from the authorization server back to your application.
     */
    const code_verifier: string = client.randomPKCECodeVerifier();
    const code_challenge: string =
      await client.calculatePKCECodeChallenge(code_verifier);

    let state!: string;

    const parameters: Record<string, string> = {
      redirect_uri,
      scope,
      code_challenge,
      code_challenge_method: 'S256',
    };

    if (!this.openIdService.config.serverMetadata().supportsPKCE()) {
      /**
       * We cannot be sure the server supports PKCE so we're going to use state too.
       * Use of PKCE is backwards compatible even if the AS doesn't support it which
       * is why we're using it regardless. Like PKCE, random state must be generated
       * for every redirect to the authorization_endpoint.
       */
      state = client.randomState();
      parameters.state = state;
    }

    const redirectTo: URL = client.buildAuthorizationUrl(
      this.openIdService.config,
      parameters,
    );

    console.log('redirecting to', redirectTo.href);

    response.redirect(redirectTo.href);
  }
}
