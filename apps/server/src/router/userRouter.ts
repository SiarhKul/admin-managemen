import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { UserController } from '../controles/userController';

const router = express.Router();

router.get('/', asyncHandler(UserController.getAllUsers));

export default router;
