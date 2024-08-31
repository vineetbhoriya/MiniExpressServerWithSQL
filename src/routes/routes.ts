import express from 'express';
import { logoutController, signInController } from '../auth/authController';
import { UserRoutes } from './user.routes';


const router = express.Router();


router.use('/user', UserRoutes);

router.post('/login',signInController);

router.get('/logout',logoutController);

export { router };
