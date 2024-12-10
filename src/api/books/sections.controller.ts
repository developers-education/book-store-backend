import { Controller, Get, HttpCode, HttpStatus, Inject, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SharedResponses } from '@/infra/api-common/decorators/shared-responses.decorator';
import { IGetPaginatedBooksBySectionCase } from '@/core/books/types/get-paginated-books-by-section-case.interface';
import { BOOKS_DI_CONSTANTS } from '@/core/books/books.di-constants';
import { ApiResponses } from '@/infra/api-common/decorators/api-responses.decorator';
import { PaginatedBooksResponse } from '@/api/books/responses/paginated-books.response';
import { PaginationQueryDto } from '@/shared/dto/pagination-query.dto';
import { IdParamDto } from '@/shared/dto/id-param.dto';
import { IGetSectionsWithBooksCase } from '@/core/books/types/get-sections-with-books-case.interface';
import { SectionsWithBooksResponse } from '@/api/books/responses/sections-with-books.response';

@ApiTags('books')
@Controller('/sections')
@SharedResponses()
export class SectionsController {
  constructor(
    @Inject(BOOKS_DI_CONSTANTS.GET_PAGINATED_BOOKS_BY_SECTION_CASE)
    private readonly getPaginatedBooksBySectionCase: IGetPaginatedBooksBySectionCase,
    @Inject(BOOKS_DI_CONSTANTS.GET_SECTIONS_WITH_BOOKS_CASE)
    private readonly getSectionsWithBooksCase: IGetSectionsWithBooksCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get sections with up to 5 books' })
  @HttpCode(HttpStatus.OK)
  @ApiResponses(HttpStatus.OK, [SectionsWithBooksResponse], {
    description: 'Sections with books',
  })
  public async getSectionsWithBooks(): Promise<SectionsWithBooksResponse> {
    const sections = await this.getSectionsWithBooksCase.execute(5);
    return SectionsWithBooksResponse.create({ sections });
  }

  @Get('/:id/books')
  @ApiOperation({ summary: 'Get books pages by section' })
  @HttpCode(HttpStatus.OK)
  @ApiResponses(HttpStatus.OK, [PaginatedBooksResponse], { description: 'Books by pages' })
  public async getBooksBySection(
    @Param() { id }: IdParamDto,
    @Query() queryDto: PaginationQueryDto,
  ): Promise<PaginatedBooksResponse> {
    const result = await this.getPaginatedBooksBySectionCase.execute(
      id,
      queryDto.page,
      queryDto.limit,
    );
    return PaginatedBooksResponse.create(result);
  }
}
