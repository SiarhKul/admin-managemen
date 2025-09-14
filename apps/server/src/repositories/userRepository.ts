import { readFile } from 'node:fs/promises';
import { IUser } from '@admin-management/types';

export class UserRepository {
  static async getAllUsers(): Promise<IUser[]> {
    const users = await readFile('apps/server/src/db/users.json', 'utf-8');

    return JSON.parse(users);
  }
}
