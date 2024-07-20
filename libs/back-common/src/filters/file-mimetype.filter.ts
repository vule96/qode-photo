import { HttpException, HttpStatus } from '@nestjs/common';
import type { Request } from 'express';
import { extname } from 'path';

export function fileMimetypeFilter(...mimetypes: string[]) {
  return (
    _req: Request,
    file: any,
    callback: (error: Error | null, acceptFile: boolean) => void
  ) => {
    if (mimetypes.some((m) => file.mimetype.includes(m))) {
      callback(null, true);
    } else {
      callback(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST
        ),
        false
      );
    }
  };
}
