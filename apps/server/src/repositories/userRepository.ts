import { readFile } from 'node:fs/promises';

export class UserRepository {
  static async getAllUsers() {
    const users = await readFile('apps/server/src/db/users.json', 'utf-8');

    // throw new Error('Simulated error for testing purposes');

    return JSON.parse(users);
  }
}
