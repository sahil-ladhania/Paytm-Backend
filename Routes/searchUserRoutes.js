import express from 'express';
import { searchUser } from '../Controllers/searchUserController.js';
import { searchInputCheck } from '../Middlewares/searchUserMiddleware.js';
import { isUserAuthorized } from '../Middlewares/authorizeUser.js';
const router = express.Router();

router.get('/api/v1/search-user' , searchInputCheck , isUserAuthorized , searchUser);

export default router;