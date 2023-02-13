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
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUser = exports.getUserFromSongId = exports.deleteUser = exports.getAnotherUser = exports.updateOne = exports.registerOne = exports.loginOne = exports.getUser = void 0;
const models_1 = require("../models/models");
const userServices = __importStar(require("../services/User.service"));
const general_util_1 = require("../utils/general.util");
const general_util_2 = require("../utils/general.util");
const getUser = async (req, res) => {
    try {
        const decoded = (0, general_util_2.getIdOfUserFromJWT)(req);
        if (decoded) {
            const id = decoded.id;
            // Fetch the user by id
            const user = await models_1.User.findOne({ _id: id });
            let userToSend = {};
            if (user) {
                userToSend = {
                    username: user.username,
                    email: user.email,
                    name: user.name,
                    isPrivate: user.isPrivate,
                    isNewUser: user.isNewUser,
                    profile_pic_path: user.profile_pic_path,
                    bio: user.bio,
                    followers: user.followers.length,
                    isPremium: user.isPremium,
                    tracks: [],
                };
                // seach in Track all the tracks that have the user id as uploaded by
                const tracks = await models_1.Track.find({ uploaded_by: id });
                let arrOfTracks = [];
                tracks.forEach((track) => {
                    arrOfTracks.push({
                        _id: track._id,
                        path: track.path,
                    });
                });
                userToSend.tracks = arrOfTracks;
                return res.status(200).send(userToSend);
            }
            else
                return res.sendStatus(404);
        }
        // return res.send(500);
    }
    catch (error) {
        console.log({ error });
        return res.status(500).send({ error: (0, general_util_1.getErrorMessage)(error) });
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
        let strError = (0, general_util_1.getErrorMessage)(error);
        if (strError === 'credentials are not correct')
            return res.sendStatus(404);
        return res.status(500).send({ error: strError });
    }
};
exports.loginOne = loginOne;
const registerOne = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userToRegister = {
            isPrivate: false,
            isNewUser: true,
            username,
            email,
            password,
            followers: [],
            isPremium: false,
        };
        const user = await userServices.register(userToRegister);
        res.status(200).send(user);
    }
    catch (error) {
        let strError = (0, general_util_1.getErrorMessage)(error);
        if (strError === 'User already exists')
            return res.sendStatus(409);
        return res.status(500).send({ error: strError });
    }
};
exports.registerOne = registerOne;
const updateOne = async (req, res) => {
    try {
        const decoded = (0, general_util_2.getIdOfUserFromJWT)(req);
        if (decoded) {
            const id = decoded.id;
            const { name, bio, profile_pic_path, isPrivate } = req.body;
            // here whatever is not being passed in req body will be undefined.
            const userToUpdate = {
                _id: id,
                isNewUser: false,
                isPrivate,
                name,
                bio,
                profile_pic_path,
            };
            const user = await userServices.updateProfileInfo(userToUpdate);
            if (user)
                res.sendStatus(204);
            else
                res.sendStatus(500);
        }
    }
    catch (error) {
        return res.status(500).send({ error: (0, general_util_1.getErrorMessage)(error) });
    }
};
exports.updateOne = updateOne;
// gets info about another user.
// if the user we want the info bout is private, im gonna check if you sent auth token.
const getAnotherUser = async (req, res) => {
    try {
        const username = req.params.username;
        const userToFind = await models_1.User.findOne({ username: username });
        if (!userToFind)
            throw new Error('User not found');
        const userToSend = {
            name: userToFind.name,
            bio: userToFind.bio,
            username: userToFind.username,
            email: userToFind.email,
            profile_pic_path: userToFind.profile_pic_path,
            followers: userToFind.followers,
            isPremium: userToFind.isPremium,
            isPrivate: userToFind.isPrivate,
            // TODO : tracks ??
        };
        // if user asked is private, go on checking auth token.
        if (userToFind.isPrivate) {
            const decoded = (0, general_util_2.getIdOfUserFromJWT)(req);
            if (decoded) {
                return res.status(200).send(userToSend);
            }
            else
                return res.status(401).send('unauthorized');
        }
        else {
            // here user asked for is not private, so send it straight away.
            return res.status(200).send(userToSend);
        }
    }
    catch (error) {
        return res.status(500).send({ error: (0, general_util_1.getErrorMessage)(error) });
    }
};
exports.getAnotherUser = getAnotherUser;
const deleteUser = async (req, res) => {
    try {
        const decoded = (0, general_util_2.getIdOfUserFromJWT)(req);
        let deleted;
        if (decoded) {
            deleted = await models_1.User.deleteOne({ _id: decoded.id });
        }
        else {
            return res.status(401).send('unauthorized');
        }
        if (deleted) {
            return res.sendStatus(204);
        }
        else
            return res.sendStatus(500);
    }
    catch (error) {
        return res.status(500).send({ error: (0, general_util_1.getErrorMessage)(error) });
    }
};
exports.deleteUser = deleteUser;
const getUserFromSongId = async (req, res) => {
    try {
        const songId = req.params.id;
        console.log(songId);
        const song = await models_1.Track.findOne({ _id: songId });
        const ownerId = song === null || song === void 0 ? void 0 : song.uploaded_by;
        const owner = await models_1.User.findOne({ _id: ownerId === null || ownerId === void 0 ? void 0 : ownerId.toString() });
        if (owner) {
            const userToSend = {
                name: owner.name,
                bio: owner.bio,
                username: owner.username,
                profile_pic_path: owner.profile_pic_path,
                followers: owner.followers.length,
                isPremium: owner.isPremium,
            };
            if (owner.isPrivate) {
                // check if the user who made the request follows the owner of the song.
                const decoded = (0, general_util_2.getIdOfUserFromJWT)(req);
                if (decoded) {
                    const user = await models_1.User.findOne({ _id: decoded.id });
                    if (user) {
                        if (owner.followers.includes(user._id.toString())) {
                            return res.status(200).send(userToSend);
                        }
                    }
                }
                return res.status(401).send({ error: 'Private' });
            }
            return res.status(200).send(userToSend);
        }
        return res.status(404).send({ error: 'User not found' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error: (0, general_util_1.getErrorMessage)(error) });
    }
};
exports.getUserFromSongId = getUserFromSongId;
const followUser = async (req, res) => {
    try {
        const decoded = (0, general_util_2.getIdOfUserFromJWT)(req);
        if (decoded) {
            const { id } = req.body;
            const userToFollow = await models_1.User.findOne({ _id: id });
            if (userToFollow) {
                userToFollow.followers.push(decoded.id);
                await userToFollow.save();
                return res.sendStatus(204);
            }
            else {
                return res.status(404).send({ error: 'User not found' });
            }
        }
        else {
            return res.status(401).send({ error: 'Unauthorized' });
        }
    }
    catch (error) {
        return res.status(500).send({ error: (0, general_util_1.getErrorMessage)(error) });
    }
};
exports.followUser = followUser;
