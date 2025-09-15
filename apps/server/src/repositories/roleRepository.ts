import { readFile } from 'node:fs/promises';
import { IRole } from '@admin-management/types';

const PATH_TO_ROLES = 'apps/server/src/assets/db/roles.json';

export class RoleRepository {
  static async getRoles(): Promise<IRole[]> {
    const users = await readFile(PATH_TO_ROLES, 'utf-8');

    return JSON.parse(users);
  }
}
