import { Controller, Get, HttpCode, HttpStatus, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SharedResponses } from '@/infra/api-common/decorators/shared-responses.decorator';
import { IGetRecommendedBooksCase } from '@/core/books/types/get-recommended-books-case.interface';
import { BOOKS_DI_CONSTANTS } from '@/core/books/books.di-constants';
import { IGetBookWithReviewsCase } from '@/core/books/types/get-full-book-case.interface';
import { ApiResponses } from '@/infra/api-common/decorators/api-responses.decorator';
import { BookNotFoundError } from '@/core/books/errors';
import { BookResponse } from '@/api/books/responses/book.response';
import { IdParamDto } from '@/shared/dto/id-param.dto';
import { BooksResponse } from '@/api/books/responses/books.response';

@ApiTags('books')
@Controller('/books')
@SharedResponses()
export class BooksController {
  constructor(
    @Inject(BOOKS_DI_CONSTANTS.GET_RECOMMENDED_BOOKS_CASE)
    private readonly getRecommendedBooksCase: IGetRecommendedBooksCase,
    @Inject(BOOKS_DI_CONSTANTS.GET_BOOK_WITH_REVIEWS_CASE)
    private readonly getBookWithReviewsCase: IGetBookWithReviewsCase,
  ) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get book by id' })
  @HttpCode(HttpStatus.OK)
  @ApiResponses(HttpStatus.OK, [BookResponse], { description: 'Book' })
  @ApiResponses(HttpStatus.BAD_REQUEST, [BookNotFoundError])
  public async getBook(@Param() { id }: IdParamDto): Promise<BookResponse> {
    const result = await this.getBookWithReviewsCase.execute(id);
    return BookResponse.create(result);
  }

  @Get('/recommended')
  @ApiOperation({ summary: 'Get up to 5 recommended books' })
  @HttpCode(HttpStatus.OK)
  @ApiResponses(HttpStatus.OK, [BooksResponse], { description: 'Books' })
  public async getRecommendedBooks(): Promise<BooksResponse> {
    const books = await this.getRecommendedBooksCase.execute(5);
    return BooksResponse.create({ books });
  }
}
