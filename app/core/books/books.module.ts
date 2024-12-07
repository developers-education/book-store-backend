import { Module } from '@/lib/module';
import { Type } from 'di-wise';
import { IBooksRepository } from '@/core/books/types/books-repository.interface';
import { IGetBookWithReviewsCase } from '@/core/books/types/get-full-book-case.interface';
import { IGetPaginatedBooksBySectionCase } from '@/core/books/types/get-paginated-books-by-section-case.interface';
import { IGetRecommendedBooksCase } from '@/core/books/types/get-recommended-books-case.interface';
import { IGetSectionsWithBooksCase } from '@/core/books/types/get-sections-with-books-case.interface';
import { BooksRepository } from '@/core/books/repositories/books.repository';
import { GetBookWithReviewsCase } from '@/core/books/cases/get-book-with-reviews.case';
import { GetPaginatedBooksBySectionCase } from '@/core/books/cases/get-paginated-books-by-section.case';
import { GetRecommendedBooksCase } from '@/core/books/cases/get-recommended-books.case';
import { GetSectionsWithBooksCase } from '@/core/books/cases/get-sections-with-books.case';

export const booksModule = new Module('books');
export const booksModuleTokens = {
  booksRepository: Type<IBooksRepository>('booksRepository'),
  getBookWithReviewsCase: Type<IGetBookWithReviewsCase>('getBookWithReviewsCase'),
  getPaginatedBooksBySectionCase: Type<IGetPaginatedBooksBySectionCase>(
    'getPaginatedBooksBySectionCase',
  ),
  getRecommendedBooksCase: Type<IGetRecommendedBooksCase>('getRecommendedBooksCase'),
  getSectionsWithBooksCase: Type<IGetSectionsWithBooksCase>('getSectionsWithBooksCase'),
};

booksModule.register(booksModuleTokens.booksRepository, { useClass: BooksRepository });
booksModule.register(booksModuleTokens.getBookWithReviewsCase, {
  useClass: GetBookWithReviewsCase,
});
booksModule.register(booksModuleTokens.getPaginatedBooksBySectionCase, {
  useClass: GetPaginatedBooksBySectionCase,
});
booksModule.register(booksModuleTokens.getRecommendedBooksCase, {
  useClass: GetRecommendedBooksCase,
});
booksModule.register(booksModuleTokens.getSectionsWithBooksCase, {
  useClass: GetSectionsWithBooksCase,
});
