import { UserService } from '../serverces/userService';
import { Request, Response } from 'express';
import { ERoles } from '@admin-management/types';

export class UserController {
  static getAllUsers = async (req: Request, res: Response) => {
    const users = await UserService.findAllUsers();
    res.json(users);
  };

  static updateUserRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !Object.values(ERoles).includes(role)) {
      return res.status(400).json({
        error: 'Invalid role. Must be one of: Admin, Editor, Viewer',
        statusCode: 400,
        timestamp: new Date().toISOString(),
      });
    }

    const userId = parseInt(id);
    if (isNaN(userId)) {
      return res.status(400).json({
        error: 'Invalid user ID. Must be a number',
        statusCode: 400,
        timestamp: new Date().toISOString(),
      });
    }

    const updatedUser = await UserService.updateUserRole(userId, role);
    res.json(updatedUser);
  };
}
