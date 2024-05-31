import { ObjectId } from "mongoose";

export interface IOperation {
    _id: ObjectId,
    type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER" | "PAYMENT",
    account:{
        from: ObjectId,
        to: ObjectId
    },
    user:{
        from: ObjectId,
        to: ObjectId
    },
    hotlink: string,
    completed: boolean,
    amount: number,
    tax: number,
    date: Date
}