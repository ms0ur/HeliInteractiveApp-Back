import { ObjectId } from "mongoose";

export interface IUser {
    _id: ObjectId;
    nickname: string;
    isLawMaker: boolean;
    isAdmin: boolean;
    pasport: [{
        number: string;
        cityOfIssue: string;
        dateOfIssue: Date;
    }]
}