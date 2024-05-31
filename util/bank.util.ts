import mongoose, { Types } from "mongoose";
import { IBank } from "../interfaces/bank/bank.interface";
import { BankSchema } from "../schemas/bank.schema";

const BankModel = mongoose.model<IBank>("Bank", BankSchema);

/**
 * Creates a new bank object with the provided user ID and saves it to the database.
 *
 * @param {string} userId - The ID of the user to associate with the new bank.
 * @return {Promise<IBank>} A promise that resolves to the newly created bank object.
 */
export const newBank = async (userId: string) : Promise<IBank> => {
    const newBank = new BankModel({
        user: userId,
        restrictions: []
    });
    return await newBank.save();
}

/**
 * Retrieves a bank object from the database based on the provided user ID.
 *
 * @param {string} userId - The ID of the user to search for.
 * @return {Promise<IBank | null>} A promise that resolves to the bank object if found, or null if not found.
 */
export const getBankByUser = async (userId: string) : Promise<IBank | null> => {
    return await BankModel.findOne({ user: userId });
}

/**
 * Retrieves a bank object from the database based on the provided ID.
 *
 * @param {string} id - The ID of the bank to search for.
 * @return {Promise<IBank | null>} A promise that resolves to the bank object if found, or null if not found.
 */
export const getBankByID = async (id: string) : Promise<IBank | null> => {
    return await BankModel.findById(id);
}

/**
 * Updates a bank object in the database based on the provided bank object.
 *
 * @param {IBank} bank - The bank object containing the updated information.
 * @return {Promise<IBank | null>} A promise that resolves to the updated bank object if found, or null if not found.
 */
export const updateBank = async (bank: IBank) : Promise<IBank | null> => {
    return await BankModel.findByIdAndUpdate(bank._id, bank, { new: true });
}
