import { z } from 'zod';

export const bookSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({ description: 'Айди книги', example: '68207933-2e77-4012-a096-5f5f5951c81c' }),
  name: z.string().openapi({
    description: 'Название книги',
    example: 'Чистая архитектура. Искусство разработки программного обеспечения',
  }),
  author: z.string().openapi({ description: 'Автор книги', example: 'Роберт Мартин' }),
  description: z
    .string()
    .openapi({ description: 'Описание книги', example: 'Книга топ, Роберт красавчик' }),
  imageUrl: z.string().url().openapi({
    description: 'Ссылка на картинку',
    example: 'https://imo10.labirint.ru/books/634082/cover.jpg/242-0',
  }),
  price: z.number().openapi({ description: 'Стоимость книги (в рублях)', example: 100 }),
  discountPrice: z
    .number()
    .nullable()
    .openapi({ description: 'Стоимость книги со скидкой (в рублях)', example: 80 }),
});
