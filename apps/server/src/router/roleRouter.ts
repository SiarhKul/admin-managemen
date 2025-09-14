import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler';
import { RoleController } from '../controles/roleController';

const router = express.Router();

router.get('/', asyncHandler(RoleController.getRoles));

export default router;
