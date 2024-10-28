import { SectionPlain } from '@/core/books/entities/section.entity';
import { BookPlain } from '@/core/books/entities/book.entity';

export interface IGetSectionsWithBooksCase {
  execute(booksLimit: number): Promise<SectionWithBook[]>;
}

export type SectionWithBook = SectionPlain & {
  books: BookPlain[];
};
