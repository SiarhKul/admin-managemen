import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { UserController } from '../controles/userController';

const router = express.Router();

router.route('/').get(asyncHandler(UserController.getAllUsers));

router.route('/:id/role').patch(asyncHandler(UserController.updateUserRole));

export default router;
