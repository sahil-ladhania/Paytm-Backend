import express from 'express';
import { checkBalance, sendMoney } from '../Controllers/transactionControllers.js';
import { transactionInputCheck } from '../Middlewares/transactionInputCheck.js';
const router = express.Router();

router.post('/api/v1/transfer-money' , transactionInputCheck , sendMoney);
router.get('/api/v1/account-balance' , checkBalance);

export default router;