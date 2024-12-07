import { TSectionPlain } from '@/core/books/entities/section.entity';
import { TBookPlain } from '@/core/books/entities/book.entity';

export interface IGetSectionsWithBooksCase {
  execute(booksLimit: number): Promise<TSectionWithBook[]>;
}

export type TSectionWithBook = TSectionPlain & {
  books: TBookPlain[];
};
