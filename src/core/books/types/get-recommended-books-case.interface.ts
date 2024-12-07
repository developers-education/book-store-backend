import { TBookPlain } from '@/core/books/entities/book.entity';

export interface IGetRecommendedBooksCase {
  execute(booksLimit: number): Promise<TBookPlain[]>;
}
