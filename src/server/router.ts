import express from 'express';
import multer from 'multer'
import * as Track from './controllers/Track.controller';
import * as User from './controllers/User.controller';
import checkFileSize from './middle-ware/checkFileSize';
import { auth } from './middle-ware/auth';
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (req, _, cb) => {
    const { username } = req.body;
    const path = `./public/tracks/${username}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  filename: (_, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });
const router = express.Router();


/** ---------- NON - PROTECTED ROUTES ---------- **/


// LOGIN & REGISTER
router.post('/login', User.loginOne);

router.post('/register', User.registerOne);

// GET ANOTHER USER INFO (protected only if user has set isPrivate to true so im gonna check it inside.)
router.get('/user/:username', User.getAnotherUser);


/** ------------ PROTECTED ROUTES ------------ **/


/* -- USER RELATED ROUTES --*/

// UPDATE PROFILE INFO
router.put('/me', auth, User.updateOne);

// DELETE USER
router.delete('/user', auth, User.deleteUser);

// GET TRACKS OF USER 
router.get('/user/tracks', auth, Track.getUserTracks);

// GET USER INFO
router.get('/user', auth, User.getUser);

// GET PROFILE INFO FROM SONG ID
router.get('/user/tracks/:id', auth, User.getUserFromSongId);

// FOLLOWS USER PASSED IN BODY 
router.put('/user/follow', auth, User.followUser);

/* -- TRACKS RELATED ROUTES --*/


// POST TRACK 
router.post('/user/tracks', auth, Track.saveTrackUrl);

// DELETE TRACK
router.delete('/track', auth, Track.deleteTrack);

// THIS NEVER GETS CALLED. DELETE ?
router.get('/alltracks', auth, Track.getAllTracks);




export default router;
