import { readFile } from 'node:fs/promises';

export class UserRepository {
  static async getAllUsers() {
    const users = await readFile('1apps/server/src/db/users.json', 'utf-8');

    return JSON.parse(users);
  }
}
