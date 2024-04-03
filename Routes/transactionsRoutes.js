import express from 'express';
import { checkBalance, sendMoney } from '../Controllers/transactionControllers.js';
import { transactionInputCheck } from '../Middlewares/transactionInputCheck.js';
import { isUserAuthorized } from '../Middlewares/authorizeUser.js';
const router = express.Router();

router.post('/api/v1/transfer-money' , transactionInputCheck , isUserAuthorized , sendMoney);
router.get('/api/v1/account-balance' , isUserAuthorized , checkBalance);

export default router;