import express from 'express';
import authRoutes from '../BACKEND/Routes/authRoutes.js';
import transactionsRoutes from '../BACKEND/Routes/transactionsRoutes.js';
import searchUserRoutes from '../BACKEND/Routes/searchUserRoutes.js';
import { connectDB } from './Config/dbConnection.js';
const app = express();
const port = 81;

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Paytm Wallet App...')
})
app.use(authRoutes);
app.use(transactionsRoutes);
app.use(searchUserRoutes);

app.listen(port, () => {
    console.log(`Paytm Wallet App listening on port ${port}`)
})