import { createZodDto } from '@/lib/zod-dto/dto-helpers';
import { bookSchema } from '@/api/books/schemas/book.schema';

export class BookResponse extends createZodDto(bookSchema) {}
