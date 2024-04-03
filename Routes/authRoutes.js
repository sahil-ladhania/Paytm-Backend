import express from 'express';
const router = express.Router();
import { getAllUsers, userLogin, userLogout, userSignup } from '../Controllers/authControllers.js';
import { signupInputCheck } from '../Middlewares/signupInputCheck.js';
import { loginInputCheck } from '../Middlewares/loginInputCheck.js';

router.post('/api/v1/signup' , signupInputCheck , userSignup);
router.post('/api/v1/login' , loginInputCheck , userLogin);
router.post('/api/v1/logout' , userLogout);
router.get('/api/v1/users' , getAllUsers);

export default router;