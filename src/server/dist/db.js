"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
try {
    console.log('qqqqqqq');
    (async function () {
        mongoose_1.default.set('strictQuery', true);
        await mongoose_1.default.connect('mongodb://127.0.0.1:27017/wavvvs');
        console.log('Connected to the DB');
    })();
}
catch (error) {
    console.log('Error connecting to DB');
    console.log({ error });
}
exports.default = mongoose_1.default;
