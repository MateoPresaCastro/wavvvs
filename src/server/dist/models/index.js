"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function connect() {
    try {
        const options = {
            serverSelectionTimeoutMS: 4000, // Keep trying to send operations for 4 seconds
        };
        mongoose_1.default.set('strictQuery', true);
        await mongoose_1.default.connect('mongodb://127.0.0.1:27017/wavvvs', options);
        console.log('Connected to the DB');
    }
    catch (error) {
        console.log('Error connecting to DB');
        let msg = '';
        if (error instanceof Error)
            msg = error.message;
        throw new Error(msg);
        // console.log({ error });
    }
}
exports.default = connect;
