import { accessTokenKey, userKey } from '@qode-photo/shared';
import type { Response } from 'express';
import { LoginResponseDto } from '../app/modules/auth/dto/login-response.dto';

export function setCookies(res: Response, data: LoginResponseDto) {
  res.cookie(
    userKey,
    JSON.stringify({
      user: data.user.email,
    }),
    {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(data.accessTokenExpires),
    }
  );
  res.cookie(
    accessTokenKey,
    JSON.stringify({
      token: data.accessToken,
      expires: data.accessTokenExpires,
    }),
    {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(data.accessTokenExpires),
    }
  );
}

export function removeCookies(res: Response) {
  res.clearCookie(userKey);
  res.clearCookie(accessTokenKey);
}
