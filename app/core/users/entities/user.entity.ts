import { uuidv7 } from 'uuidv7';

export class User {
  public id: string;
  public login: string;
  public passwordHash: string;
  public salt: string;

  constructor(data: UserParams) {
    this.id = data.id ?? uuidv7();
    this.login = data.login;
    this.passwordHash = data.passwordHash;
    this.salt = data.salt;
  }

  public isCorrectPasswordHash(hash: string): boolean {
    return hash === this.passwordHash;
  }

  public toPlain(): UserPlain {
    return {
      id: this.id,
      login: this.login,
      passwordHash: this.passwordHash,
      salt: this.salt,
    };
  }
}

export type UserParams = {
  id?: string;
  login: string;
  passwordHash: string;
  salt: string;
};

export type UserPlain = {
  id: string;
  login: string;
  passwordHash: string;
  salt: string;
};
