import { Controller } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('app')
@ApiBadRequestResponse({
  description: 'Bad Request',
  schema: {
    example: {
      code: 'Error code' || null,
      message: 'Error message.',
      path: '/user/some-url-path',
      dateTime: new Date(),
    },
  },
})
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
@ApiForbiddenResponse({
  description: 'Forbidden',
})
@ApiNotFoundResponse({
  description: 'Not found',
})
export class AppController {}
