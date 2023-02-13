import { Track } from './models/models';
import { deleteTrackFromCloudinaryAndDb } from './utils/general.util';
const DAY_IN_MS = 86400000;

const deleteExpiredTracks = async () => {
  console.log('Deleting expired tracks...');
  // first, find everythig that is in the Track model 
  const tracks = await Track.find({})
  if (!tracks.length) return console.log('No tracks in the db')
  // then, for each track, check if it is expired (24h)
  for (const track of tracks) {
    // if it is expired, delete it from the cloudinary and from the db
    if (track.date < Date.now() - DAY_IN_MS) {
      deleteTrackFromCloudinaryAndDb(track._id, track.path)
      console.log(`Expired track removed from db and cloudinary: ${track.title}`);
    }
  }
}

export default deleteExpiredTracks;
