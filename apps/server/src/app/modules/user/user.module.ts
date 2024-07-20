import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '@qode-photo/db';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
