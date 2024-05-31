import { IAccount } from "../interfaces/bank/account.interface";
import mongoose, { Types } from "mongoose";

export const AccountSchema = new mongoose.Schema<IAccount>({
    bankID: {
        type: Types.ObjectId,
        ref: "Bank"
    },
    balance: {
        type: Number
    },
    type: {
        type: String,
        enum: ["DEBT", "CREDIT"]
    },
    rate: {
        type: Number
    },
    created: {
        type: Date
    }
})