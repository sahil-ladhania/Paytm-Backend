import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balanceAmount : {
        type : Number,
        default : 0,
        required : true
    }
} , { timestamps: true });

export const Account = mongoose.model('Account' , accountSchema);