import { IBooksRepository } from '@/core/books/types/books-repository.interface';
import {
  TBookWithReviews,
  IGetBookWithReviewsCase,
} from '@/core/books/types/get-full-book-case.interface';
import { BookNotFoundError } from '@/core/books/errors';
import { Inject, Injectable } from '@nestjs/common';
import { BOOKS_DI_CONSTANTS } from '@/core/books/books.di-constants';
import { COMMON_DI_CONSTANTS } from '@/infra/common/common.di-constants';
import { ILogger } from '@/lib/logger/types/logger.interface';

@Injectable()
export class GetBookWithReviewsCase implements IGetBookWithReviewsCase {
  constructor(
    @Inject(COMMON_DI_CONSTANTS.LOGGER)
    private readonly logger: ILogger,
    @Inject(BOOKS_DI_CONSTANTS.BOOKS_REPOSITORY)
    private readonly booksRepository: IBooksRepository,
  ) {
    this.logger.setContext(GetBookWithReviewsCase.name);
  }

  public async execute(bookId: string): Promise<TBookWithReviews> {
    this.logger.info('Starting getting book with reviews.', { bookId });

    const bookWithReviews = await this.booksRepository.getBookWithReviews(bookId);

    if (!bookWithReviews) {
      throw new BookNotFoundError();
    }

    const book: TBookWithReviews = {
      ...bookWithReviews.book.toPlain(),
      reviews: bookWithReviews.reviews.map((review) => review.toPlain()),
    };

    this.logger.info('Successfully got book with reviews.', { book });

    return book;
  }
}
