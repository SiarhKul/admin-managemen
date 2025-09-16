import { ERoles } from './enums';

export interface IUser {
  id: number;
  name: string;
  email: string;
  roles: ERoles[];
}

export interface IRole {
  id: number;
  role: ERoles;
}
