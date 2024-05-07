import mongoose from "mongoose";

export interface IBank {
    _id: mongoose.Schema.Types.ObjectId
    /**
     * User of bank
     * */
    user: mongoose.Schema.Types.ObjectId
    /**
     * Bank accounts of user
     */
    accounts: mongoose.Schema.Types.ObjectId[]
    /**
     * Bank operations of user
     */
    operations: mongoose.Schema.Types.ObjectId[]
    /**
     * Bank restrictions of user
     */
    restrictions: [{
        active: boolean,
        type: "FULL" | "PARTIAL",
        reason: string
        activeTo: Date | null
    }]
}