import { Request, Response } from 'express';
import { RoleService } from '../serverces/roleService';

export class RoleController {
  static getRoles = async (req: Request, res: Response) => {
    const roles = await RoleService.getRoles();
    res.json(roles);
  };
}
