"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTrackUrl = exports.getUserTracks = exports.deleteTrack = exports.getAllTracks = exports.uploadTrack = void 0;
const models_1 = require("../models/models");
const general_util_1 = require("../utils/general.util");
const uploadTrack = async (req, res) => {
    try {
        // get the id from the token
        const decoded = (0, general_util_1.getIdOfUserFromJWT)(req);
        if (decoded) {
            const newTrack = {
                uploaded_by: decoded.id,
                path: req.file.filename,
                title: req.file.originalname,
                size: req.file.size,
                date: Date.now(),
            };
            await models_1.Track.create(newTrack);
            res.status(200).send(newTrack);
        }
        else {
            // getIdOfUserFromJWT returns null if the token is invalid so we send 401
            res.status(401).send('Unauthorized');
        }
    }
    catch (error) {
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.uploadTrack = uploadTrack;
const getAllTracks = async (req, res) => {
    try {
        const tracks = await models_1.Track.find({});
        res.status(200).send(tracks);
    }
    catch (error) {
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.getAllTracks = getAllTracks;
const getUserTracks = async (req, res) => {
    try {
        const { username } = req.body;
        const tracks = await models_1.Track.find({
            uploaded_by: username,
        });
        // if user has tracks, send them. If not, 404
        tracks ? res.status(200).send(tracks) : res.sendStatus(404);
    }
    catch (error) {
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.getUserTracks = getUserTracks;
const deleteTrack = async (req, res) => {
    try {
        // get the id of the track to delete
        const { id } = req.body;
        // take the url of the track to delete from the database
        const track = await models_1.Track.findOne({ _id: id });
        // if the track doesn't exist, send 404
        if (!track) {
            return res.sendStatus(404);
        }
        // store the url of the track to delete
        const { path } = track;
        const del = await (0, general_util_1.deleteTrackFromCloudinaryAndDb)(id, path);
        if (del) {
            res.sendStatus(204);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (error) {
        // TODO : notify user of the error (means send back the error)
        // TODO : notify the developer of the error (maybe email the error)
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.deleteTrack = deleteTrack;
const saveTrackUrl = async (req, res) => {
    try {
        const decoded = (0, general_util_1.getIdOfUserFromJWT)(req);
        if (decoded) {
            const id = decoded.id;
            const { url } = req.body;
            const track = {
                uploaded_by: id,
                path: url,
                date: Date.now(),
                title: 'Untitled',
            };
            await models_1.Track.create(track);
            res.sendStatus(204);
        }
        else {
            // getIdOfUserFromJWT returns null if the token is invalid so we send 401
            res.status(401).send('Unauthorized');
        }
    }
    catch (error) {
        // TODO : notify user of the error (means send back the error)
        // TODO : notify the developer of the error (maybe email the error)
        console.log({ error });
        res.status(500).send({ error });
    }
};
exports.saveTrackUrl = saveTrackUrl;
