import { Account } from "../Models/accountModel.js";

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
    }
    else{
        // Check if the Payer is Valid User or Not
        // Check if the Payer has more than Rs.0 in his Account
    }
}

export const checkBalance = (req , res) => {
    // Getting the Data from the Params Object
    const userdId = req.params.userId;
    console.log(userdId);
    // Check If the User Exist or Not
}