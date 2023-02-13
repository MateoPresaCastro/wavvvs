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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const Track = __importStar(require("./controllers/Track.controller"));
const User = __importStar(require("./controllers/User.controller"));
const auth_1 = require("./middle-ware/auth");
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, _, cb) => {
        const { username } = req.body;
        const path = `./public/tracks/${username}`;
        if (!fs_1.default.existsSync(path)) {
            fs_1.default.mkdirSync(path);
        }
        cb(null, path);
    },
    filename: (_, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});
const upload = (0, multer_1.default)({ storage });
const router = express_1.default.Router();
/** ---------- NON - PROTECTED ROUTES ---------- **/
// LOGIN & REGISTER
router.post('/login', User.loginOne);
router.post('/register', User.registerOne);
// GET ANOTHER USER INFO (protected only if user has set isPrivate to true so im gonna check it inside.)
router.get('/user/:username', User.getAnotherUser);
/** ------------ PROTECTED ROUTES ------------ **/
/* -- USER RELATED ROUTES --*/
// UPDATE PROFILE INFO
router.put('/me', auth_1.auth, User.updateOne);
// DELETE USER
router.delete('/user', auth_1.auth, User.deleteUser);
// GET TRACKS OF USER 
router.get('/user/tracks', auth_1.auth, Track.getUserTracks);
// GET USER INFO
router.get('/user', auth_1.auth, User.getUser);
// GET PROFILE INFO FROM SONG ID
router.get('/user/tracks/:id', auth_1.auth, User.getUserFromSongId);
// FOLLOWS USER PASSED IN BODY 
router.put('/user/follow', auth_1.auth, User.followUser);
/* -- TRACKS RELATED ROUTES --*/
// POST TRACK 
router.post('/user/tracks', auth_1.auth, Track.saveTrackUrl);
// DELETE TRACK
router.delete('/track', auth_1.auth, Track.deleteTrack);
// THIS NEVER GETS CALLED. DELETE ?
router.get('/alltracks', auth_1.auth, Track.getAllTracks);
exports.default = router;
