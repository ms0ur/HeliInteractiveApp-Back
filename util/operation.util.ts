import mongoose, { Types } from "mongoose";
import { IOperation } from "../interfaces/bank/operation.interface";
import { OperationSchema } from "../schemas/operation.schema";

const OperationModel = mongoose.model<IOperation>("Operation", OperationSchema);

/**
 * Creates a new operation in the database.
 *
 * @param {IOperation} operation - The operation object to be created.
 * @return {Promise<IOperation>} A promise that resolves to the created operation.
 */
export const createOperation = async (operation: IOperation): Promise<IOperation> => {
    const newOperation = new OperationModel(operation);
    return await newOperation.save();
}

/**
 * Retrieves an operation from the database based on its ID.
 *
 * @param {string} id - The ID of the operation to retrieve.
 * @return {Promise<IOperation | null>} A promise that resolves to the operation with the given ID, or null if not found.
 */
export const getOperationByID = async (id: string): Promise<IOperation | null> => {
    return await OperationModel.findById(id);
}

/**
 * Retrieves an operation from the database based on its hotlink.
 *
 * @param {string} hotlink - The hotlink of the operation to retrieve.
 * @return {Promise<IOperation | null>} A promise that resolves to the operation object if found, or null if not found.
 */
export const getOperationByHotlink = async (hotlink: string): Promise<IOperation | null> => {
    return await OperationModel.findOne({ hotlink });
}

/**
 * Retrieves the last operation performed by a user.
 *
 * @param {string} userId - The user for whom to retrieve the last operation.
 * @return {Promise<IOperation | null>} A promise that resolves to the last operation performed by the user, or null if no operation is found.
 */
export const getLastOperationByUser = async (userId: string): Promise<IOperation | null> => {
    return await OperationModel.findOne({ $or: [{ "user.from": userId }, { "user.to": userId }] }).sort({ date: -1 });
}

/**
 * Updates the specified operation in the database by setting its "completed" field to true and its "hotlink" field to null.
 *
 * @param {IOperation} operation - The operation object to be updated.
 * @return {Promise<IOperation | null>} A promise that resolves to the updated operation, or null if the operation is not found.
 */
export const proceedOperation = async (operation: IOperation): Promise<IOperation | null> => {
    return await OperationModel.findOneAndUpdate({ _id: operation._id }, { completed: true, hotlink:null })
}

/**
 * Retrieves a list of operations performed by a user within a specified date range and paginates the results.
 *
 * @param {string} userId - The ID of the user for whom to retrieve operations.
 * @param {Date} fromDate - The start date of the date range.
 * @param {Date} toDate - The end date of the date range.
 * @param {number | 0} fromNumber - The starting index of the paginated results.
 * @param {number | 10} toNumber - The number of operations to retrieve per page.
 * @return {Promise<IOperation[]>} A promise that resolves to an array of operations performed by the user within the specified date range and paginated results.
 */
export const getOperationsByUser = async (userId: string, fromDate: Date, toDate: Date, fromNumber: number | 0, toNumber: number | 10): Promise<IOperation[]> => {
    return await OperationModel.find({ $or: [{ "user.from": userId }, { "user.to": userId }], date: { $gte: fromDate, $lte: toDate } }).skip(fromNumber).limit(toNumber);
}