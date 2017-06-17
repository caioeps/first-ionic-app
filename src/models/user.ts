import { UserInterface } from '../interfaces/user.interface'

export class User implements UserInterface {
  username: string;

  constructor(username: string) {
    this.username = username;
  }
}
