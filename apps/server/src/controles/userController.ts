import { UserService } from '../serverces/userService';
import { Request, Response } from 'express';

export class UserController {
  static getAllUsers = async (req: Request, res: Response) => {
    const users = await UserService.findAllUsers();
    res.json(users);
  };
}
