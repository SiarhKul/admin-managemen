import { ERoles } from './enums';

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: ERoles;
}

export interface IRole {
  id: number;
  name: ERoles;
}
