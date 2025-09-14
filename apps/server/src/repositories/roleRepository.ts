import { readFile } from 'node:fs/promises';
import { IRole } from '@admin-management/types';

export class RoleRepository {
  static async getRoles(): Promise<IRole[]> {
    const users = await readFile('apps/server/src/db/roles.json', 'utf-8');

    return JSON.parse(users);
  }
}
