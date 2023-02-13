import { User, Track } from './models/models';

export default async function () {
  await User.deleteMany({});
  await Track.deleteMany({});
  console.log('DELETED EVERYTHIIIIING');
}