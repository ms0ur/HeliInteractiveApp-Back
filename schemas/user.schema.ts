import { IUser } from "../interfaces/user.interface";
import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema<IUser>({
    nickname: {
        type: String,
        required: true
    },
    isLawMaker: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    pasport: [{
        number: {
            type: String
        },
        cityOfIssue: {
            type: String
        },
        dateOfIssue: {
            type: Date
        }
    }]
})