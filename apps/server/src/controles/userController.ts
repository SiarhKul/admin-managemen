import express from 'express';
const router = express.Router();
import { UserService } from '../serverces/userService';

router.get('/', async (req, res, next) => {
  const users = await UserService.findAllUsers(next);

  res.json(users);
});

export default router;
