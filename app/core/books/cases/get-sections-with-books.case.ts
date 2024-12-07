import { IBooksRepository, SectionsWithBooks } from '@/core/books/types/books-repository.interface';
import {
  IGetSectionsWithBooksCase,
  SectionWithBook,
} from '@/core/books/types/get-sections-with-books-case.interface';
import { Book } from '@/core/books/entities/book.entity';
import { Section } from '@/core/books/entities/section.entity';
import { inject } from 'di-wise';
import { booksModuleTokens } from '@/core/books/books.module';

export class GetSectionsWithBooksCase implements IGetSectionsWithBooksCase {
  constructor(
    private readonly booksRepository: IBooksRepository = inject(booksModuleTokens.booksRepository),
  ) {}

  public async execute(booksLimit: number): Promise<SectionWithBook[]> {
    const sectionsWithBooks = await this.booksRepository.getSectionsWithBooks(booksLimit);

    return this.groupSections(sectionsWithBooks);
  }

  private groupSections(sectionsWithBooks: SectionsWithBooks): SectionWithBook[] {
    const map: Map<string, { section: Section; books: Book[] }> = new Map();
    sectionsWithBooks.forEach((data) => {
      const { section, book } = data;

      if (!map.has(section.id)) {
        map.set(section.id, { section, books: [book] });
      } else {
        map.get(section.id)!.books.push(book);
      }
    });

    return Array.from(map.values()).map((data) => ({
      ...data.section.toPlain(),
      books: data.books.map((book) => book.toPlain()),
    }));
  }
}
