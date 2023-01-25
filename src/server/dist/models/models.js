"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Premium = exports.Track = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    isPrivate: Boolean,
    isNewUser: Boolean,
    name: String,
    username: String,
    email: String,
    password: String,
    bio: String,
    profile_pic_path: String,
    followers: [String],
    isPremium: Boolean,
});
const trackSchema = new mongoose_1.Schema({
    uploaded_by: String,
    path: String,
    title: String,
    size: Number,
    date: Number,
    liked_by: [String],
});
const premiumSchema = new mongoose_1.Schema({
    email: String,
    start_date: Number,
    end_date: Number,
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
const Track = (0, mongoose_1.model)('Track', trackSchema);
exports.Track = Track;
const Premium = (0, mongoose_1.model)('Premium', premiumSchema);
exports.Premium = Premium;
