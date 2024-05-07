import { ObjectId } from "mongoose";

export interface IOperation {
    _id: ObjectId,
    type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | "PAYMENT",
    accountFrom: ObjectId,
    accountTo: ObjectId,
    amount: number,
    tax: number,
    date: Date
}