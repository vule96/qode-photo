import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { fileMimetypeFilter } from '../filters';

export function ApiFile(
  fieldName = 'file',
  required = false,
  localOptions?: MulterOptions
) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, localOptions))
  );
}

export function ApiMultipleFiles(
  fieldName = 'files',
  required = false,
  maxCount = 10,
  localOptions?: MulterOptions
) {
  return applyDecorators(
    UseInterceptors(FilesInterceptor(fieldName, maxCount, localOptions))
  );
}

export function ApiImageFile(
  fileName = 'image',
  required = false,
  folder = 'image'
) {
  return ApiFile(fileName, required, {
    fileFilter: fileMimetypeFilter('image'),
    storage: diskStorage({
      destination: `uploads/${folder}`,
      filename: (_req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    }),
  });
}

export function ApiMultipleImageFile(
  fieldName = 'files',
  required = false,
  folder = 'image',
  maxCount = 10
) {
  return ApiMultipleFiles(fieldName, required, maxCount, {
    fileFilter: fileMimetypeFilter('image'),
    storage: diskStorage({
      destination: `apps/server/uploads/${folder}`,
      filename: (_req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
    }),
  });
}
