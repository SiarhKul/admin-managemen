import { ERoles } from './enums';

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: ERoles;
}
