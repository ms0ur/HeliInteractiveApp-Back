import { ObjectId } from "mongoose";

export interface IBank {
    _id: ObjectId
    user: ObjectId
    accounts: ObjectId[]
    restrictions: [{
        active: boolean,
        type: "FULL" | "PARTIAL",
        reason: string
        activeTo: Date | null
    }]
}