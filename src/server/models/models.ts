import { Schema, model } from 'mongoose';
import { ITrack, IUser } from '../entities/allEntities.js';

const userSchema = new Schema<IUser>({
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

const trackSchema = new Schema<ITrack>({
  uploaded_by: String,
  path: String,
  title: String,
  size: Number,
  date: Number,
});

const User = model<IUser>('User', userSchema);
const Track = model<ITrack>('Track', trackSchema);

export { User, Track };
