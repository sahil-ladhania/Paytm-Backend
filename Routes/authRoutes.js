import express from 'express';
const router = express.Router();
import { getAllUsers, userLogin, userSignup } from '../Controllers/authControllers.js';
import { signupInputCheck } from '../Middlewares/signupInputCheck.js';
import { loginInputCheck } from '../Middlewares/loginInputCheck.js';
import { isUserAuthorized } from '../Middlewares/authorizeUser.js';

router.post('/api/v1/signup' , signupInputCheck , userSignup);
router.post('/api/v1/login' , loginInputCheck , userLogin);
router.get('/api/v1/users' , isUserAuthorized , getAllUsers);

export default router;