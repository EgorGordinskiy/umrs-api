import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { OpenIdService } from './openid.service';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private openIdService: OpenIdService) {}

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | boolean | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // вроде как это access token
    const token = this.openIdService.extractTokenFromHeader(request);

    // если токена нет, то надо его получить, начав flow
    if (!token) {
      throw new UnauthorizedException();
    }

    this.logger.log('Token: ' + token);

    // todo а если он есть, то его ещё надо проверить

    return true;
  }
}
