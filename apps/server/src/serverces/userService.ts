import { UserRepository } from '../repositories/userRepository';
import { readFile } from 'node:fs/promises';
import { DatabaseError } from '../dtos/errors/index';

export class UserService {
  static async findAllUsers() {
    try {
      return await UserRepository.getAllUsers();
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
