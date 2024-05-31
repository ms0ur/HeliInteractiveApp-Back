import { ObjectId } from "mongoose";

export interface IAccount {
    _id: ObjectId,
    bankID: ObjectId
    /**
     * Balance on account
     */
    balance: number
    /**
     * Type of account
     */
    type: "DEBT" | "CREDIT"
    /**
     * Rate of account
     */
    rate: number
    /**
     * Date of creation
     */
    created: Date
}