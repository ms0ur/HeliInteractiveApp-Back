import mongoose, { ObjectId } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { UserSchema } from "../schemas/user.schema";

const UserModel = mongoose.model<IUser>("User", UserSchema);

/**
 * Creates a new user in the database.
 *
 * @param {IUser} user - The user object containing the user's information.
 * @return {Promise<IUser>} - A promise that resolves to the newly created user object.
 */
export const createUser = async (user: IUser): Promise<IUser> => {
    const newUser = new UserModel(user);
    return await newUser.save();
}

/**
 * Checks if a user with the given nickname exists in the database.
 *
 * @param {string} nickname - The nickname of the user to check.
 * @return {Promise<boolean>} A promise that resolves to true if a user with the given nickname exists, false otherwise.
 */
export const isUserExists = async (nickname: string): Promise<boolean> => {
    return (await UserModel.findOne({ nickname })) != null
}

/**
 * Retrieves a user from the database based on their nickname.
 *
 * @param {string} nickname - The nickname of the user to retrieve.
 * @return {Promise<IUser | null>} A promise that resolves to the user object if found, or null if not found.
 */
export const getUser = async (nickname: string): Promise<IUser | null> => {
    return await UserModel.findOne({ nickname })
}


/**
 * Updates a user in the database based on their nickname.
 *
 * @param {string} nickname - The nickname of the user to update.
 * @param {IUser} user - The updated user object.
 * @return {Promise<IUser | null>} A promise that resolves to the updated user object if found, or null if not found.
 */
export const modifyUser = async (nickname: string, user: IUser): Promise<IUser | null> => {
    return await UserModel.findOneAndUpdate({ nickname }, user)
}

/**
 * Deletes a user from the database based on their nickname.
 *
 * @param {string} nickname - The nickname of the user to delete.
 * @return {Promise<IUser | null>} A promise that resolves to the deleted user object if found, or null if not found.
 */
export const deleteUser = async (nickname: string): Promise<IUser | null> => {
    return await UserModel.findOneAndDelete({ nickname })
}


/**
 * Retrieves a user's id from the database based on their nickname.
 *
 * @param {string} nickname - The nickname of the user to retrieve the id of.
 * @return {Promise<string | null>} A promise that resolves to the user's id if found, or null if not found.
 */
export const getUserId = async (nickname: string): Promise<ObjectId | null> => {
    const user = await UserModel.findOne({ nickname });
    return user ? user._id : null;
}

/**
 * Retrieves a user's nickname from the database based on their id.
 *
 * @param {string} id - The id of the user to retrieve the nickname of.
 * @return {Promise<string | null>} A promise that resolves to the user's nickname if found, or null if not found.
 */
export const getUserNickname = async (id: string): Promise<string | null> => {
    const user = await UserModel.findById(id);
    return user ? user.nickname : null;
}


