import { UserRepository } from '../repositories/userRepository';
import { NextFunction } from 'express';
import { ResponseError } from '../dtos/errors/ResponseError';

export class UserService {
  static async findAllUsers(next: NextFunction) {
    try {
      return await UserRepository.getAllUsers();
    } catch (err) {
      next(new ResponseError('Error', 500));
    }
  }
}
