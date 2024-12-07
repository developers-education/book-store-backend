import { IBooksRepository } from '@/core/books/types/books-repository.interface';
import {
  BookWithReviews,
  IGetBookWithReviewsCase,
} from '@/core/books/types/get-full-book-case.interface';
import { BookNotFoundError } from '@/core/books/errors';
import { inject } from 'di-wise';
import { booksModuleTokens } from '@/core/books/books.module';

export class GetBookWithReviewsCase implements IGetBookWithReviewsCase {
  constructor(
    private readonly booksRepository: IBooksRepository = inject(booksModuleTokens.booksRepository),
  ) {}

  public async execute(bookId: string): Promise<BookWithReviews> {
    const bookWithReviews = await this.booksRepository.getBookWithReviews(bookId);

    if (!bookWithReviews) {
      throw new BookNotFoundError({ id: bookId });
    }

    return {
      ...bookWithReviews.book.toPlain(),
      reviews: bookWithReviews.reviews.map((review) => review.toPlain()),
    };
  }
}
