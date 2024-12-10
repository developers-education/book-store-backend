import { z } from 'zod';
import { bookSchema } from '@/api/books/schemas/book.schema';
import { createZodDto } from '@/lib/zod-dto/dto-helpers';

const booksSchema = z.object({
  books: z.array(bookSchema),
});

export class BooksResponse extends createZodDto(booksSchema) {}
