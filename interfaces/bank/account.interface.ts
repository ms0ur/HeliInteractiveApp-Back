import { ObjectId } from "mongoose";

export interface IAccount {
    _id: ObjectId
    balance: number
    type: "DEBT" | "CREDIT",
    rate: number
}