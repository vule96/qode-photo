import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { type Comment } from '@prisma/client';
import type { RequestWithUser } from '@qode-photo/back-common';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('/comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':photoId')
  async getCommentsByPhoto(
    @Param('photoId', new ParseUUIDPipe()) photoId: string
  ): Promise<Comment[]> {
    return this.commentService.getComments({
      where: {
        photoId,
      },
      include: {
        user: true,
      },
    });
  }

  @UseGuards(JwtAccessGuard)
  @Post(':photoId')
  create(
    @Req() req: RequestWithUser,
    @Body() data: CreateCommentDto,
    @Param('photoId', new ParseUUIDPipe()) photoId: string
  ) {
    return this.commentService.create(data, req.user.id, photoId);
  }
}
