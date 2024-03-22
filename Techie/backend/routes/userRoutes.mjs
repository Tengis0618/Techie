import { getProfile, updateProfile } from "../controller/userController.mjs";
import express from 'express';
import protect from '../middleware/auth.mjs';
const router = express.Router();

router.get('/profile', protect, getProfile);
router.post('/update-profile', protect, updateProfile);

export default router