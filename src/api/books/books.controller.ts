import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SharedResponses } from '@/infra/api-common/decorators/shared-responses.decorator';

@ApiTags('books')
@Controller('/books')
@SharedResponses()
export class UsersController {
  constructor() {}

  @Get()
  public getPaginatedBooks() {}

  @Get('/recommended')
  public getRecommendedBooks() {}

  @Get('/:id')
  public async getBook() {}
}
