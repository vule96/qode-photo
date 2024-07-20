import {
  Controller,
  Get,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import type { Photo } from '@prisma/client';
import { ApiMultipleImageFile, RequestWithUser } from '@qode-photo/back-common';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { PhotoService } from './photo.service';

@Controller('/photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Get()
  async getAll(): Promise<Photo[]> {
    return this.photoService.getPhotos({});
  }

  @Get(':id')
  async getPhotoItem(
    @Param('id', new ParseUUIDPipe()) id: string
  ): Promise<Photo> {
    return this.photoService.findPhoto({
      id,
    });
  }

  @UseGuards(JwtAccessGuard)
  @Post('uploads')
  @ApiMultipleImageFile('images', true)
  upload(
    @Req() req: RequestWithUser,
    @UploadedFiles(ParseFilePipe) files: Array<Express.Multer.File>
  ) {
    return this.photoService.upload(files, req.user.id);
  }
}
