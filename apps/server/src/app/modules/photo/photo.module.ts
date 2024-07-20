import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '@qode-photo/db';
import { UserModule } from '../user/user.module';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [PhotoController],
  providers: [PhotoService, PrismaService],
  exports: [],
})
export class PhotoModule {}
