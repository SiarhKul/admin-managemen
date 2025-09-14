import { UserRepository } from '../repositories/userRepository';
import { DatabaseError } from '../dtos/errors/index';
import { ERoles } from '@admin-management/types';

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

  static async updateUserRole(userId: number, newRole: ERoles) {
    try {
      return await UserRepository.updateUserRole(userId, newRole);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('not found')) {
          throw new DatabaseError(err.message, 404);
        }
        if (err.message.includes('ENOENT')) {
          throw new DatabaseError('Users database file not found', 500);
        }
        throw new DatabaseError(
          `Failed to update user role: ${err.message}`,
          500
        );
      }

      throw new DatabaseError(
        'Unknown error occurred while updating user role',
        500
      );
    }
  }
}
