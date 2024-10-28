import { TableBase } from './base';

export type BookTable = TableBase & {
  id: string;
  name: string;
  author: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPrice: number | null;
};
