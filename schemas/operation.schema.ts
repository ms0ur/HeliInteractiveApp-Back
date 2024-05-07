import mongoose, { Types } from "mongoose";
import { IOperation } from "../interfaces/bank/operation.interface";

export const OperationSchema = new mongoose.Schema<IOperation>({
    type: {
        type: String,
        enum: ["DEPOSIT", "WITHDRAWAL", "TRANSFER", "PAYMENT"]
    },
    accountFrom: {
        type: Types.ObjectId,
        ref: "Account"
    },
    accountTo: {
        type: Types.ObjectId,
        ref: "Account"
    },
    amount: {
        type: Number
    },
    tax: {
        type: Number
    },
    date: {
        type: Date
    }
})