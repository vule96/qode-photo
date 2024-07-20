import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '@qode-photo/db';
import { UserModule } from '../user/user.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
  exports: [],
})
export class CommentModule {}
