import { UserRepository } from '../repositories/userRepository';

export class UserService {
  static async findAllUsers() {
    return await UserRepository.getAllUsers();
  }
}
