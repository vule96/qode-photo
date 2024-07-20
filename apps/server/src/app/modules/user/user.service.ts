import { Injectable } from '@nestjs/common';
import { Prisma, type User } from '@prisma/client';
import {
  PrismaErrorEnum,
  UniqueViolationException,
} from '@qode-photo/back-common';
import { PrismaService } from '@qode-photo/db';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorEnum.Unique) {
          throw new UniqueViolationException('Email');
        }
      }
    }
  }
}
