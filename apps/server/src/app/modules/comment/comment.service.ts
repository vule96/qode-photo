import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, type Comment } from '@prisma/client';
import { PrismaService } from '@qode-photo/db';
import { UserService } from '../user/user.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  async getComments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput;
    include?: Prisma.CommentIncludeCreateManyAndReturn;
  }): Promise<Comment[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.comment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async create(data: CreateCommentDto, userId: string, photoId: string) {
    const user = await this.userService.findUser({
      id: userId,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const result = await this.prisma.comment.create({
      data: {
        content: data.content,
        userId,
        photoId,
      },
    });

    return result;
  }

  async findComment(
    commentWhereUniqueInput: Prisma.CommentWhereUniqueInput
  ): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: commentWhereUniqueInput,
    });
  }
}
