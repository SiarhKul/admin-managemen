import { UserService } from '../serverces/userService';
import { Request, Response } from 'express';
import { ERoles } from '@admin-management/types';
import { ErrorResponse } from '../errors/ErrorResponse';

export class UserController {
  static getAllUsers = async (req: Request, res: Response) => {
    const users = await UserService.findAllUsers();
    res.json(users);
  };

  static updateUserRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { roles } = req.body as { roles: ERoles[] };

    if (!Array.isArray(roles) || roles.length === 0) {
      return res
        .status(400)
        .json(new ErrorResponse(400, 'roles must be a non-empty array'));
    }

    const allRoles = Object.values(ERoles);
    const invalid = roles.some((r) => !allRoles.includes(r));
    if (invalid) {
      return res
        .status(400)
        .json(
          new ErrorResponse(
            400,
            'Invalid roles. Must be subset of: Admin, Editor, Viewer'
          )
        );
    }

    const userId = parseInt(id);
    if (isNaN(userId)) {
      return res
        .status(400)
        .json(new ErrorResponse(400, 'Invalid user ID. Must be a number'));
    }

    const updatedUser = await UserService.updateUserRoles(userId, roles);
    res.json(updatedUser);
  };
}
