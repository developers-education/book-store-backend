import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SharedResponses } from '@/infra/api-common/decorators/shared-responses.decorator';
import { IGetRecommendedBooksCase } from '@/core/books/types/get-recommended-books-case.interface';
import { BOOKS_DI_CONSTANTS } from '@/core/books/books.di-constants';
import { IGetBookWithReviewsCase } from '@/core/books/types/get-full-book-case.interface';
import { ApiResponses } from '@/infra/api-common/decorators/api-responses.decorator';
import { BookNotFoundError, UserBookReviewExistsError } from '@/core/books/errors';
import { BookWithReviewsResponse } from '@/api/books/responses/book-with-reviews.response';
import { IdParamDto } from '@/shared/dto/id-param.dto';
import { BooksResponse } from '@/api/books/responses/books.response';
import { ICreateReviewCase } from '@/core/books/types/create-review-case.interface';
import { Auth } from '@/infra/api-common/decorators/auth.decorator';
import { TokenPayload } from '@/infra/api-common/decorators/token-payload.decorator';
import { TAccessTokenPayload } from '@/core/users/types/shared';
import { CreateReviewDto } from '@/api/books/dto/create-review.dto';

@ApiTags('books')
@Controller('/books')
@SharedResponses()
export class BooksController {
  constructor(
    @Inject(BOOKS_DI_CONSTANTS.GET_RECOMMENDED_BOOKS_CASE)
    private readonly getRecommendedBooksCase: IGetRecommendedBooksCase,
    @Inject(BOOKS_DI_CONSTANTS.GET_BOOK_WITH_REVIEWS_CASE)
    private readonly getBookWithReviewsCase: IGetBookWithReviewsCase,
    @Inject(BOOKS_DI_CONSTANTS.CREATE_REVIEW_CASE)
    private readonly createReviewCase: ICreateReviewCase,
  ) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get book by id' })
  @HttpCode(HttpStatus.OK)
  @ApiResponses(HttpStatus.OK, [BookWithReviewsResponse], { description: 'Book' })
  @ApiResponses(HttpStatus.BAD_REQUEST, [BookNotFoundError])
  public async getBook(@Param() idDto: IdParamDto): Promise<BookWithReviewsResponse> {
    const result = await this.getBookWithReviewsCase.execute(idDto.id);
    return BookWithReviewsResponse.create(result);
  }

  @Get('/recommended')
  @ApiOperation({ summary: 'Get up to 5 recommended books' })
  @HttpCode(HttpStatus.OK)
  @ApiResponses(HttpStatus.OK, [BooksResponse], { description: 'Books' })
  public async getRecommendedBooks(): Promise<BooksResponse> {
    const books = await this.getRecommendedBooksCase.execute(5);
    return BooksResponse.create({ books });
  }

  @Post('/:id/review')
  @Auth()
  @ApiOperation({ summary: 'Create review for book' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponses(HttpStatus.NO_CONTENT, { description: 'Review created' })
  @ApiResponses(HttpStatus.BAD_REQUEST, [UserBookReviewExistsError])
  public async createReview(
    @TokenPayload() payload: TAccessTokenPayload,
    @Param() idDto: IdParamDto,
    @Body() dto: CreateReviewDto,
  ): Promise<void> {
    await this.createReviewCase.execute(idDto.id, payload.userId, dto);
  }
}
