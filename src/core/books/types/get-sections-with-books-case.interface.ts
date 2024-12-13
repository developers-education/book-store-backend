import { TSectionPlain } from '@/core/books/entities/section.entity';
import { TBookPlain } from '@/core/books/entities/book.entity';

export interface IGetSectionsWithBooksCase {
  execute(booksLimit: number): Promise<TSectionWithBooks[]>;
}

export type TSectionWithBooks = {
  section: TSectionPlain;
  books: TBookPlain[];
};
