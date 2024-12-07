import { uuidv7 } from 'uuidv7';

export class Section {
  public id: string;
  public name: string;

  constructor(data: SectionParams) {
    this.id = data.id ?? uuidv7();
    this.name = data.name;
  }

  public toPlain(): TSectionPlain {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export type SectionParams = {
  id?: string;
  name: string;
};

export type TSectionPlain = {
  id: string;
  name: string;
};
