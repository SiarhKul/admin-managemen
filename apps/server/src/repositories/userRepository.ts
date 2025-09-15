import { readFile, writeFile } from 'node:fs/promises';
import { IUser, ERoles } from '@admin-management/types';

const PATH_TO_USERS = 'libs/shared/db/users.json';

export class UserRepository {
  static async getAllUsers(): Promise<IUser[]> {
    const users = await readFile(PATH_TO_USERS, 'utf-8');

    return JSON.parse(users);
  }

  static async updateUserRole(userId: number, newRole: ERoles): Promise<IUser> {
    const users = await this.getAllUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new Error(`User with id ${userId} not found`);
    }

    users[userIndex].role = newRole;

    await writeFile(PATH_TO_USERS, JSON.stringify(users, null, 2), 'utf-8');

    return users[userIndex];
  }
}
