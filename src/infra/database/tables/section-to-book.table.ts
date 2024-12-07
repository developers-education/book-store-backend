import { TTableBase } from './base';

export type TSectionToBookTable = TTableBase & {
  sectionId: string;
  bookId: string;
};
