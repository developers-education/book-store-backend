import { Provider } from '@nestjs/common';
import { BooksRepository } from '@/core/books/repositories/books.repository';
import { BOOKS_DI_CONSTANTS } from '@/core/books/books.di-constants';
import { IBooksRepository } from '@/core/books/types/books-repository.interface';
import { GetBookWithReviewsCase } from '@/core/books/cases/get-book-with-reviews.case';
import { IGetBookWithReviewsCase } from '@/core/books/types/get-full-book-case.interface';
import { GetPaginatedBooksBySectionCase } from '@/core/books/cases/get-paginated-books-by-section.case';
import { IGetPaginatedBooksBySectionCase } from '@/core/books/types/get-paginated-books-by-section-case.interface';
import { GetRecommendedBooksCase } from '@/core/books/cases/get-recommended-books.case';
import { IGetRecommendedBooksCase } from '@/core/books/types/get-recommended-books-case.interface';
import { GetSectionsWithBooksCase } from '@/core/books/cases/get-sections-with-books.case';
import { IGetSectionsWithBooksCase } from '@/core/books/types/get-sections-with-books-case.interface';
import { CreateReviewCase } from '@/core/books/cases/create-review.case';
import { ICreateReviewCase } from '@/core/books/types/create-review-case.interface';

export const publicProviders: Provider[] = [
  {
    useClass: GetBookWithReviewsCase,
    provide: BOOKS_DI_CONSTANTS.GET_BOOK_WITH_REVIEWS_CASE,
  } satisfies Provider<IGetBookWithReviewsCase>,
  {
    useClass: GetPaginatedBooksBySectionCase,
    provide: BOOKS_DI_CONSTANTS.GET_PAGINATED_BOOKS_BY_SECTION_CASE,
  } satisfies Provider<IGetPaginatedBooksBySectionCase>,
  {
    useClass: GetRecommendedBooksCase,
    provide: BOOKS_DI_CONSTANTS.GET_RECOMMENDED_BOOKS_CASE,
  } satisfies Provider<IGetRecommendedBooksCase>,
  {
    useClass: GetSectionsWithBooksCase,
    provide: BOOKS_DI_CONSTANTS.GET_SECTIONS_WITH_BOOKS_CASE,
  } satisfies Provider<IGetSectionsWithBooksCase>,
  {
    useClass: CreateReviewCase,
    provide: BOOKS_DI_CONSTANTS.CREATE_REVIEW_CASE,
  } satisfies Provider<ICreateReviewCase>,
];

export const providers: Provider[] = [
  ...publicProviders,
  {
    useClass: BooksRepository,
    provide: BOOKS_DI_CONSTANTS.BOOKS_REPOSITORY,
  } satisfies Provider<IBooksRepository>,
];
