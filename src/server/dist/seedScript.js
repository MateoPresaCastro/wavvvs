"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models/models");
async function default_1() {
    await models_1.User.deleteMany({});
    await models_1.Track.deleteMany({});
    console.log('DELETED EVERYTHIIIIING');
}
exports.default = default_1;
