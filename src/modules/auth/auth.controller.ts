import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  public callback() {
    // todo
    console.log('its the callback controller');
  }
}
// login, logout, callback,
// profile - is gonna use identity provider's resource endpoint: /userinfo
// response_types:
// dont use: token, code token, id_token token, code id_token token
// use: code, id_token, code id_token
