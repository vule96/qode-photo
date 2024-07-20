import type { User } from '@prisma/client';

export class LoginResponseDto {
  user: User;
  accessToken: string;
  accessTokenExpires: number;
}
