import { TTableBase } from './base';

export type TBookTable = TTableBase & {
  id: string;
  name: string;
  author: string;
  description: string;
  imagePath: string;
  price: number;
  discountPrice: number | null;
};
