import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { type User } from '@prisma/client';
import { hash, verify } from 'argon2';
import { plainToInstance } from 'class-transformer';
import ms from 'ms';
import { UserService } from '../user/user.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async login(credentials: LoginDto) {
    const user = await this.userService.findUser({
      email: credentials.email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatchPassword = await verify(user.password, credentials.password);

    if (!isMatchPassword) {
      throw new UnauthorizedException();
    }

    const { accessToken, accessTokenExpires } = await this.generateToken({
      id: user.id,
      email: user.email,
    });

    return plainToInstance(LoginResponseDto, {
      user,
      accessToken,
      accessTokenExpires,
    });
  }

  async register(user: RegisterDto): Promise<User> {
    const hashPassword = await hash(user.password);
    return this.userService.createUser({
      ...user,
      password: hashPassword,
    });
  }

  private async generateToken({ id, email }: Pick<User, 'id' | 'email'>) {
    const accessTokenExpiresIn = this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRES_IN'
    );

    const accessToken = await this.jwtService.signAsync(
      {
        id,
        email,
      },
      {
        issuer: 'Qode',
        expiresIn: accessTokenExpiresIn,
      }
    );

    return {
      accessToken,
      accessTokenExpires: parseInt(Date.now() + ms(accessTokenExpiresIn)),
    };
  }
}
