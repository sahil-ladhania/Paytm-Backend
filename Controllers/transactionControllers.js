import { Account } from "../Models/accountModel.js";
import { User } from '../Models/userModel.js';
import { mongoose } from 'mongoose';

export const addMoney = (req , res) => {
    // Getting the Data from the Body Object
    const userId = req.body.userId;
    console.log(userId);
    const amountToAdd = req.body.amountToAdd;
    console.log(amountToAdd);
    // Checking If user has Filled all the Feilds
    if(!userId || !amountToAdd){
        console.log("Pura Bhar Form !!!");
    }
    else{
        // Create a new Account Instance
        const userAccount = new Account({
            userId : userId,
            balanceAmount : amountToAdd
        })
        console.log(userAccount);
        userAccount.save()
            .then((savedUserAccount) => {
                res.status(201).send({
                    Message : "User Account Saved Successfully ...",
                    userAccountData : savedUserAccount
                })
            })
            .catch((error) => {
                res.status(500).send({
                    Error : `Error Saving User Account Data : ${error}`
                })
            })
    }
}

export const sendMoney = (req , res) => {
    // Start the Mongoose Session
    mongoose.startSession()
        .then((session) => {
            console.log(session);
            // Starting the Transaction
            session.startTransaction();
            // Getting the Data from the Params Object
            const payeeId = req.params.payeeId;
            console.log(`payeeId : ${payeeId}`);
            // Getting the Data from the Body Object
            const payerId = req.body.payerId;
            console.log(`payerId : ${payerId}`);
            const amountToSend = req.body.amountToSend; 
            console.log(`Amount To Send : ${amountToSend}`);
            // Checking If user has Filled all the Feilds
            if(!payerId || !amountToSend){
                console.log("Pura Bhar Form !!!");
                session.abortTransaction();
                session.endSession();
            }
            else{
                // Check if the Payer is Valid User or Not
                User.find({_id : payerId})
                    .then((user) => {
                        console.log(user);
                        if(!user){
                            console.log("Payer Valid User Nahi Hai !!!");
                            session.abortTransaction();
                            session.endSession();
                        }
                        else{
                            // Check If the Payer is also a User
                            Account.findOne({userId : payerId})
                                .then((user) => {
                                    if(!user){
                                        console.log("User Not Found !!!");
                                        session.abortTransaction();
                                        session.endSession();
                                    }
                                    else{
                                        const accountBalance = user.balanceAmount;
                                        console.log(accountBalance);
                                        // Check if the Payer has more than Rs.0 in his Account
                                        if(accountBalance < 0){
                                            console.log("Sale Bikhari !!!")
                                            session.abortTransaction();
                                            session.endSession();
                                        }
                                        else{
                                            // Check if the Payer has more than or equal to what he wants to send to Payee
                                            if(accountBalance >= amountToSend){
                                                // Update the Payers Account By Deducting the Amount
                                                const payerFilter = {userId : payerId};
                                                console.log(payerFilter);
                                                const payerUpdate = {$inc: {balanceAmount : -amountToSend}};
                                                console.log(payerUpdate);
                                                Account.updateOne(payerFilter , payerUpdate)
                                                    .then((result) => {
                                                        console.log(result);
                                                        // Update the Payees Account By Adding the Amount
                                                        const payeeFilter = {userId : payeeId};
                                                        console.log(payeeFilter);
                                                        const payeeUpdate = {$inc : {balanceAmount : amountToSend}};
                                                        console.log(payeeUpdate);
                                                        return Account.updateOne(payeeFilter , payeeUpdate)
                                                            .then((result) => {
                                                                console.log(result);
                                                                session.commitTransaction();
                                                                res.status(201).send({
                                                                    Message : "Transaction Successfull ..."
                                                                })
                                                            })
                                                            .catch((error) => {
                                                                res.status(500).send({
                                                                    Error : `Error Adding The Amount To Payee's Account Balance : ${error}`
                                                                });                                
                                                            })
                                                    })
                                                    .catch((error) => {
                                                        session.abortTransaction();
                                                        session.endSession();
                                                        res.status(500).send({
                                                            Error : `Error Deducting The Amount From Payer's Account Balance : ${error}`
                                                        });                                
                                                    })
                                            }
                                            else{
                                                session.abortTransaction();
                                                session.endSession();
                                                res.status(500).send({
                                                    Error : `Unavailable Balance !!!`
                                                })
                                            }
                                    }
                                    }
                                })
                                .catch((error) => {
                                    session.abortTransaction();
                                    session.endSession();
                                    res.status(500).send({
                                        Error : `Error Finding the Payer Account Balance : ${error}`
                                    })
                                })
                        }
                    })
                    .catch((error) => {
                        session.abortTransaction();
                        session.endSession();
                        res.status(500).send({
                            Error : `Error Finding the Payer : ${error}`
                        })
                    })
            }
        })
        .catch((error) => {
            session.abortTransaction();
            session.endSession();
            res.status(500).send({
                Error : `Error Starting the Session : ${error}`
            });                                
        })
}

export const checkBalance = (req , res) => {
    // Getting the Data from the Params Object
    const userdId = req.params.userId;
    console.log(userdId);
    // Check If the User Exist or Not
    User.findOne({_id : userdId})
        .then((user) => {
            console.log(user);
            // Get the Users Account Balance
            Account.findOne({userId : userdId})
                .then((user) => {
                    console.log(user);
                    const userBalance = user.balanceAmount;
                    console.log(userBalance);
                    res.status(200).send({
                        Message : "User's Account Balance Retrieved Successfully ...",
                        User_Account_Balance : userBalance
                    })
                })
                .catch((error) => {
                    res.status(500).send({
                        Error : `No User Found : ${error}`
                    })
                })
        })
        .catch((error) => {
            res.status(500).send({
                Error : `No User Found : ${error}`
            })
        })
}