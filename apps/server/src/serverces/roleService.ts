import { DatabaseError } from '../dtos/errors/index';
import { RoleRepository } from '../repositories/roleRepository';

export class RoleService {
  static async getRoles() {
    try {
      return await RoleRepository.getRoles();
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
