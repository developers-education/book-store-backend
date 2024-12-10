import { createZodDto } from '@/lib/zod-dto/dto-helpers';
import { sectionSchema } from '@/api/books/schemas/section.schema';
import { z } from 'zod';
import { bookSchema } from '@/api/books/schemas/book.schema';

const sectionsWithBooksSchema = z.object({
  sections: z.array(
    sectionSchema.extend({
      books: z.array(bookSchema),
    }),
  ),
});

export class SectionsWithBooksResponse extends createZodDto(sectionsWithBooksSchema) {}
