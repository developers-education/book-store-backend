import {
  IBooksRepository,
  TSectionsWithBooks,
} from '@/core/books/types/books-repository.interface';
import {
  IGetSectionsWithBooksCase,
  TSectionWithBook,
} from '@/core/books/types/get-sections-with-books-case.interface';
import { Book } from '@/core/books/entities/book.entity';
import { Section } from '@/core/books/entities/section.entity';
import { Inject, Injectable } from '@nestjs/common';
import { BOOKS_DI_CONSTANTS } from '@/core/books/books.di-constants';
import { COMMON_DI_CONSTANTS } from '@/infra/common/common.di-constants';
import { ILogger } from '@/lib/logger/types/logger.interface';

@Injectable()
export class GetSectionsWithBooksCase implements IGetSectionsWithBooksCase {
  constructor(
    @Inject(COMMON_DI_CONSTANTS.LOGGER)
    private readonly logger: ILogger,
    @Inject(BOOKS_DI_CONSTANTS.BOOKS_REPOSITORY)
    private readonly booksRepository: IBooksRepository,
  ) {
    this.logger.setContext(GetSectionsWithBooksCase.name);
  }

  public async execute(booksLimit: number): Promise<TSectionWithBook[]> {
    this.logger.info('Starting getting sections with books.', { booksLimit });

    const sectionsWithBooks = await this.booksRepository.getSectionsWithBooks(booksLimit);

    const result: TSectionWithBook[] = this.groupSections(sectionsWithBooks);

    this.logger.info('Successfully got sections with books.', { result });

    return result;
  }

  private groupSections(sectionsWithBooks: TSectionsWithBooks): TSectionWithBook[] {
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
