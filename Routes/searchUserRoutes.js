import express from 'express';
import { searchUser } from '../Controllers/searchUserController.js';
import { searchInputCheck } from '../Middlewares/searchUserMiddleware.js';
const router = express.Router();

router.get('/api/v1/search-user' , searchInputCheck , searchUser);

export default router;