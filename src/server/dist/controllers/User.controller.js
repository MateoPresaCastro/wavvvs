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
exports.updateOne = exports.registerOne = exports.loginOne = exports.getUser = void 0;
const models_js_1 = require("../models/models.js");
const userServices = __importStar(require("../services/User.service"));
const error_util_1 = require("../utils/error.util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET_KEY } = process.env;
const getUser = async (req, res) => {
    try {
        if (req.headers && req.headers.authorization) {
            console.log(req.headers.authorization);
            let authorization = req.headers.authorization.split(' ')[1], decoded;
            try {
                decoded = jsonwebtoken_1.default.verify(authorization, SECRET_KEY);
            }
            catch (e) {
                return res.status(401).send('unauthorized');
            }
            const id = decoded.id;
            // Fetch the user by id 
            models_js_1.User.findOne({ _id: id }).then(function (user) {
                // Do something with the user
                // user!.password = '';
                console.log(user);
                return res.status(200).send(user);
            });
        }
        // return res.send(500);
    }
    catch (error) {
        console.log({ error });
        return res.status(500).send({ error: (0, error_util_1.getErrorMessage)(error) });
    }
};
exports.getUser = getUser;
const loginOne = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userToLog = {
            email,
            password,
        };
        const foundUser = await userServices.login(userToLog);
        res.status(200).send(foundUser);
    }
    catch (error) {
        return res.status(500).send({ error: (0, error_util_1.getErrorMessage)(error) });
    }
};
exports.loginOne = loginOne;
const registerOne = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userToRegister = {
            isNew: true,
            username,
            email,
            password,
        };
        const user = await userServices.register(userToRegister);
        res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send({ error: (0, error_util_1.getErrorMessage)(error) });
    }
};
exports.registerOne = registerOne;
const updateOne = async (req, res) => {
    try {
        const { name, email, bio, profile_pic_path } = req.body;
        const userToUpdate = {
            isNew: false,
            name,
            email,
            bio,
            profile_pic_path,
            password: '',
        };
        const user = await userServices.updateProfileInfo(userToUpdate);
        res.status(204).send(user);
    }
    catch (error) {
        return res.status(500).send({ error: (0, error_util_1.getErrorMessage)(error) });
    }
};
exports.updateOne = updateOne;
