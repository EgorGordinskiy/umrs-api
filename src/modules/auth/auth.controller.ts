import { Controller, Get, Logger, Query, Req } from '@nestjs/common';
import { AuthFlow, OpenIdService } from './openid.service';
import * as client from 'openid-client';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private openIdService: OpenIdService) {}

  @Get('callback')
  public async callback(
    @Query('session_state') session_state: string,
    @Query('state') state: string,
    @Query('iss') iss: string,
    @Query('code') code: string,
    @Req() request: Request,
  ) {
    let flow: AuthFlow;
    try {
      flow = this.openIdService.getAuthFlow(state);
    } catch (e) {
      // а это значит, полученный session_state не соответствует ни одному, что был сгенерирован для авторизации
      this.logger.error('flow not found', e);
      return;
    }

    const callbackUrl = this.openIdService.getCurrentUrl(
      flow.redirect_uri,
      request,
    );

    const tokens: client.TokenEndpointResponse =
      await client.authorizationCodeGrant(
        this.openIdService.config,
        callbackUrl,
        {
          pkceCodeVerifier: flow.code_verifier,
          expectedState: state,
        },
      );

    this.openIdService.cleanupFlow(state);

    return tokens;
  }
}
// login, logout, callback,
// profile - is gonna use identity provider's resource endpoint: /userinfo
// response_types:
// dont use: token, code token, id_token token, code id_token token
// use: code, id_token, code id_token
