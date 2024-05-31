import mongoose, { Types } from "mongoose";
import { IAccount } from "../interfaces/bank/account.interface";
import { AccountSchema } from "../schemas/account.schema";

const AccountModel = mongoose.model<IAccount>("Account", AccountSchema);

/**
 * Creates a new account in the database.
 *
 * @param {IAccount} account - The account to be created.
 * @return {Promise<IAccount>} The created account.
 */
export const createAccount = async (account: IAccount) : Promise<IAccount> => {
    const newAccount = new AccountModel(account);
    return await newAccount.save();
}

/**
 * Updates an account in the database.
 *
 * @param {string} id - The ID of the account to be updated.
 * @param {IAccount} account - The updated account data.
 * @return {Promise<IAccount | null>} The updated account, or null if not found.
 */
export const updateAccount = async (id: string, account: IAccount) : Promise<IAccount | null> => {
    const updateAccount = await AccountModel.findByIdAndUpdate(id, account, { new: true });
    return updateAccount || null;
}

/**
 * Retrieves an account from the database based on its ID.
 *
 * @param {string} id - The ID of the account to retrieve.
 * @return {Promise<IAccount | null>} A promise that resolves to the account with the given ID, or null if not found.
 */
export const getAccountByID = async (id: string) : Promise<IAccount | null> => {
    return await AccountModel.findById(id);
}

/**
 * Retrieves all accounts associated with a bank from the database.
 *
 * @param {string} bankID - The ID of the bank.
 * @return {Promise<IAccount[] | null>} A promise that resolves to an array of accounts associated with the bank, or null if not found.
 */
export const getAccountByBank = async (bankID: string) : Promise<IAccount[] | null> => {
    return await AccountModel.find({ bankID });
}
