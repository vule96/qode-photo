import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import type { User } from '@prisma/client';
import { removeCookies, setCookies } from 'apps/server/src/utils/cookie';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() data: LoginDto
  ): Promise<LoginResponseDto> {
    const result = await this.authService.login(data);

    setCookies(res, result);
    return result;
  }

  @Post('register')
  async register(@Body() data: RegisterDto): Promise<User> {
    return this.authService.register(data);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    removeCookies(res);
    return { message: 'Logout successful', statusCode: HttpStatus.OK };
  }
}
