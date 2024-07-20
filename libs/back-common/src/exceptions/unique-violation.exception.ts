import { HttpException, HttpStatus } from '@nestjs/common';

export class UniqueViolationException extends HttpException {
  constructor(field: string) {
    super(
      {
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Unique violation',
        errors: {
          [field]: `${field} already exists`,
        },
      },
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  }
}
