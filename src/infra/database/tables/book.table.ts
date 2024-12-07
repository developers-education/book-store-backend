import { TTableBase } from './base';

export type TBookTable = TTableBase & {
  id: string;
  name: string;
  author: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPrice: number | null;
};
