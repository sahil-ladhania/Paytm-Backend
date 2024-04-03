import mongoose from "mongoose";
import express from 'express';

const DB_URL = 'mongodb://127.0.0.1:27017/Paytm-Wallet-App';

export const connectDB = (req, res) => {
    mongoose.connect(DB_URL)
        .then(() => {
            // res.status(200).send({
            //     Message: `Connected to Paytm-Wallet-DB Successfully ...`
            // });
            console.log("Connected to Paytm Wallet DB Successfully ...");
        })
        .catch((error) => {
            // res.status(500).send({
            //     Error: `Error in Connecting Paytm-Wallet-App DB : ${error} !!!`
            // });
            console.log("Error Connecting to Paytm Wallet DB !!!");
        });
};