import express from 'express';
import connectEnsureLogin from 'connect-ensure-login';
import passport from 'passport';
import {loginUser, registerUser, getMe} from '../controller/authController.mjs'
import protect from '../middleware/auth.mjs';
const router = express.Router();

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)


export default router
