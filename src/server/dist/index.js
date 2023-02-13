"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const index_1 = __importDefault(require("./models/index"));
const cronJob_1 = __importDefault(require("./cronJob"));
const { PORT, HOST_NAME } = process.env;
const app = (0, express_1.default)();
(async function () {
    try {
        (0, index_1.default)();
    }
    catch (error) {
        console.log(error);
        return;
    }
})();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(router_1.default);
app.get('*', (req, res) => {
    res.status(404);
    res.send('Not Found');
});
// UNCOMMENT THIS if u want to wipe the DB
// deleteEverythingFromDB();
const ONE_MINUTE = 60000;
setInterval(cronJob_1.default, ONE_MINUTE);
app.listen(PORT, () => {
    console.log(`Web server running: ${HOST_NAME}:${PORT}`);
});
exports.default = app;
