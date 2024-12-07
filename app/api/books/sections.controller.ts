import { Controller, Handler, Tag } from '@/infrastructure/controllers-state/decorators';
import { inject } from 'di-wise';
import { booksModuleTokens } from '@/core/books/books.module';
import { IGetSectionsWithBooksCase } from '@/core/books/types/get-sections-with-books-case.interface';

@Tag('sections')
@Controller('/sections')
export class SectionsController {
  constructor(
    private readonly getSectionsWithBooksCase: IGetSectionsWithBooksCase = inject(
      booksModuleTokens.getSectionsWithBooksCase,
    ),
  ) {}

  @Handler('GET')
  public getSections() {}
}
