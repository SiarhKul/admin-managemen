import express from 'express';
import { UserService } from '../serverces/userService';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const users = await UserService.findAllUsers();
    res.json(users);
  })
);

export default router;
