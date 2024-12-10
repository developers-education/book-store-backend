import { z } from 'zod';
import { paginationSchema } from '@/shared/schemas/pagination.schema';
import { bookSchema } from '@/api/books/schemas/book.schema';
import { createZodDto } from '@/lib/zod-dto/dto-helpers';

const paginatedBooksSchema = z
  .object({
    books: z.array(bookSchema),
  })
  .merge(paginationSchema);

export class PaginatedBooksResponse extends createZodDto(paginatedBooksSchema) {}
