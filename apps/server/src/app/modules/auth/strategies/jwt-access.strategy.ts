import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { User } from '@prisma/client';
import {
  InvalidException,
  StrategyEnum,
  type JWTPayloadType,
} from '@qode-photo/back-common';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  StrategyEnum.JWT_ACCESS
) {
  constructor(
    protected readonly configService: ConfigService,
    private userService: UserService
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtAccessStrategy.extractJwtFromCookies,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: JWTPayloadType): Promise<User> {
    const user = await this.userService.findUser({
      id: payload.id,
    });

    if (!user) {
      throw new InvalidException();
    }

    return user;
  }

  private static extractJwtFromCookies(req: Request): string | null {
    let token = null;

    if (req.cookies && 'access-token' in req.cookies) {
      token = JSON.parse(req.cookies['access-token']).token;
    }

    if (token && token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '');
    }

    return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  }
}
