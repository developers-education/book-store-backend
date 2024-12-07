import {
  Controller,
  Handler,
  Params,
  Response,
  Tag,
} from '@/infrastructure/controllers-state/decorators';
import { inject } from 'di-wise';
import { IGetBookWithReviewsCase } from '@/core/books/types/get-full-book-case.interface';
import { booksModuleTokens } from '@/core/books/books.module';
import { IGetPaginatedBooksBySectionCase } from '@/core/books/types/get-paginated-books-by-section-case.interface';
import { IGetRecommendedBooksCase } from '@/core/books/types/get-recommended-books-case.interface';
import { getBookParamsSchema } from '@/api/books/schemas/get-book-params.schema';
import { getValidatedRouterParams, H3Event, setResponseStatus } from 'h3';
import { BookNotFoundError } from '@/core/books/errors';
import { getBookResponseSchema } from '@/api/books/schemas/get-book-response.schema';
import { getRecommendedBooksResponseSchema } from '@/api/books/schemas/get-recommended-books-response.schema';

@Tag('books')
@Controller('/books')
export class BooksController {
  constructor(
    private readonly getBookWithReviewsCase: IGetBookWithReviewsCase = inject(
      booksModuleTokens.getBookWithReviewsCase,
    ),
    private readonly getPaginatedBooksBySectionCase: IGetPaginatedBooksBySectionCase = inject(
      booksModuleTokens.getPaginatedBooksBySectionCase,
    ),
    private readonly getRecommendedBooksCase: IGetRecommendedBooksCase = inject(
      booksModuleTokens.getRecommendedBooksCase,
    ),
  ) {}

  @Handler('GET')
  public async getPaginatedBooks() {}

  @Handler('GET', '/recommended')
  @Response(200, getRecommendedBooksResponseSchema)
  public async getRecommendedBooks() {
    const books = await this.getRecommendedBooksCase.execute(10);
    return getRecommendedBooksResponseSchema.parse({ books });
  }

  @Handler('GET', '/:id')
  @Params(getBookParamsSchema)
  @Response(200, getBookResponseSchema)
  @Response(404, BookNotFoundError.schema)
  public async getBook(event: H3Event) {
    const params = await getValidatedRouterParams(event, getBookParamsSchema.parse);

    let book;
    try {
      book = await this.getBookWithReviewsCase.execute(params.id);
    } catch (e) {
      if (e instanceof BookNotFoundError) {
        setResponseStatus(event, 404);
      }
      throw e;
    }

    return getBookResponseSchema.parse(book);
  }
}
