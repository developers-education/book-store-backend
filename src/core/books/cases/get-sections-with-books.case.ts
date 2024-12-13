import { IBooksRepository } from '@/core/books/types/books-repository.interface';
import {
  IGetSectionsWithBooksCase,
  TSectionWithBooks,
} from '@/core/books/types/get-sections-with-books-case.interface';
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

  public async execute(booksLimit: number): Promise<TSectionWithBooks[]> {
    this.logger.info('Starting getting sections with books.', { booksLimit });

    const sectionsWithBooks = await this.booksRepository.getSectionsWithBooks(booksLimit);

    const result: TSectionWithBooks[] = sectionsWithBooks.map((sectionWithBooks) => ({
      section: sectionWithBooks.section.toPlain(),
      books: sectionWithBooks.books.map((book) => book.toPlain()),
    }));

    this.logger.info('Successfully got sections with books.', { result });

    return result;
  }
}
