import { readFile } from 'node:fs/promises';
import { DatabaseError } from '../dtos/errors';

export class UserRepository {
  static async getAllUsers() {
    try {
      const users = await readFile('1apps/server/src/db/users.json', 'utf-8');

      return JSON.parse(users);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('ENOENT')) {
          throw new DatabaseError('Users database file not found', 500);
        }
        throw new DatabaseError(`Failed to read users: ${err.message}`, 500);
      }
      throw new DatabaseError(
        'Unknown error occurred while reading users',
        500
      );
    }
  }
}
