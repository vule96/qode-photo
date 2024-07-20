import { Controller, Get } from '@nestjs/common';
import { type User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getUsers({});
  }
}
