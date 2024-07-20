import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid token',
        errors: {},
      },
      HttpStatus.UNAUTHORIZED
    );
  }
}
