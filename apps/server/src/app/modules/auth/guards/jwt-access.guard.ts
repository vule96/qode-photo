import {
  Injectable,
  UnauthorizedException,
  type ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { StrategyEnum } from '@qode-photo/back-common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAccessGuard extends AuthGuard(StrategyEnum.JWT_ACCESS) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, _info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('AccessTokenError');
    }

    return user;
  }
}
