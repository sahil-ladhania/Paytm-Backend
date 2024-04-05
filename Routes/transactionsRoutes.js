import express from 'express';
import { addMoney, checkBalance, sendMoney } from '../Controllers/transactionControllers.js';
import { transactionInputCheck } from '../Middlewares/transactionInputCheck.js';
import { isUserAuthorized } from '../Middlewares/authorizeUser.js';
const router = express.Router();

// router.post('/api/v1/add-money' , isUserAuthorized , addMoney);
// router.post('/api/v1/transfer-money' , transactionInputCheck , isUserAuthorized , sendMoney);
// router.get('/api/v1/account-balance' , isUserAuthorized , checkBalance);
router.post('/api/v1/add-money' , addMoney);
router.post('/api/v1/:payeeId/transfer-money' , transactionInputCheck , sendMoney);
router.get('/api/v1/:userId/account-balance' , checkBalance);

export default router;