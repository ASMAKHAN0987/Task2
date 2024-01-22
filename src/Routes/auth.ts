import express from 'express'
import { signup,loginController, logout } from '../Controller/authController';
const router = express.Router();

router.post('/signup',signup);
router.post('/login',loginController)
router.get('/logout',logout)
export default router;