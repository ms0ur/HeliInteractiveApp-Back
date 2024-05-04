import { ObjectId } from "mongoose";

export interface IOperation {
    _id: ObjectId,
    accountFrom: ObjectId,
    accountTo: ObjectId,
    amount: number,
    tax: number,
    date: Date
}