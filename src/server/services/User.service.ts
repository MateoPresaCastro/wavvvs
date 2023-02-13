import { DocumentDefinition } from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../models/models';
import { IUser } from '../entities/allEntities.js';
import bcrypt from 'bcrypt';
const saltRounds = 8;
const { SECRET_KEY } = process.env;

// TODO : sanitize inputs
export async function register(user: DocumentDefinition<IUser>) {
  let exists = null;
  exists = await User.findOne({ email: user.email });
  if(!exists) exists = await User.findOne({ username: user.username });
  if (exists) {
    throw new Error('User already exists');
  }
  if (user.password) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  try {
    const createdUser = await User.create(user);
    if (createdUser) {
      createdUser.toJSON();
      createdUser.password = '';
      return createdUser;
    }
  } catch (error) {
    throw error;
  }
}

// TODO : sanitize inputs
export async function login(user:any) {
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (!foundUser) {
      throw new Error('credentials are not correct');
    }
    const isMatch = bcrypt.compareSync(user.password!, foundUser.password!);
    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser._id?.toString() },
        SECRET_KEY!,
        {
          expiresIn: '1 day',
        }
      );
      let returnUser;
      if (foundUser.isNewUser) {
        returnUser = {
          user: { email: foundUser.email, isNewUser: foundUser.isNewUser },
          token: token,
        };
      } else {
        returnUser = {
          user: {
            email: foundUser.email,
            isNewUser: foundUser.isNewUser,
            bio: foundUser.bio,
            profile_pic_path: foundUser.profile_pic_path,
          },
          token: token,
        };
      }
      return returnUser;
    } else {
      throw new Error('credentials are not correct');
    }
  } catch (error) {
    throw error;
  }
}

export async function updateProfileInfo(user:any) {
  try {
    const foundUser = await User.findOne({ _id: user._id });
    if (!foundUser) {
      throw new Error('JWT doesnt correspond to any user');
    }
    foundUser.name = user.name || foundUser.name;
    foundUser.bio = user.bio || foundUser.bio;
    foundUser.profile_pic_path = user.profile_pic_path || foundUser.profile_pic_path;
    foundUser.isPrivate = user.isPrivate || foundUser.isPrivate;
    // change isNewUser to false since now it has logged in one time and from now on he will be redirected to dashboard
    foundUser.isNewUser = false;
    foundUser.save();
    return foundUser;
  } catch (error) {
    throw error;
  }
}