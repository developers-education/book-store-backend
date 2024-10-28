import { TableBase } from './base';

export type SectionToBookTable = TableBase & {
  sectionId: string;
  bookId: string;
};
