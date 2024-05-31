import mongoose, { Types } from "mongoose";
import { IOperation } from "../interfaces/bank/operation.interface";

export const OperationSchema = new mongoose.Schema<IOperation>({
    type: {
        type: String,
        enum: ["DEPOSIT", "WITHDRAWAL", "TRANSFER", "PAYMENT"]
    },
    account: {
        from: {
            type: Types.ObjectId,
            ref: "Account"
        },
        to: {
            type: Types.ObjectId,
            ref: "Account"
        }
    },
    user: {
        from: {
            type: Types.ObjectId,
            ref: "User"
        },
        to: {
            type: Types.ObjectId,
            ref: "User"
        }
    },
    hotlink: {
        type: String
    },
    completed: {
        type: Boolean
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