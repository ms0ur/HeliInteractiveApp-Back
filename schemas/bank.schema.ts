import { IBank } from "../interfaces/bank/bank.interface";
import mongoose, { Types } from "mongoose";

export const BankSchema = new mongoose.Schema<IBank>({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    accounts: [
        {
            type: Types.ObjectId,
            ref: "Account"
        }
    ],
    operations: [
        {
            type: Types.ObjectId,
            ref: "Operation"
        }
    ],
    restrictions: [
        {
            active: {
                type: Boolean,
            },
            type: {
                type: String,
                enum: ["FULL", "PARTIAL"]
            },
            reason: {
                type: String
            },
            activeTo: {
                type: Date
            }
        }
    ]
});