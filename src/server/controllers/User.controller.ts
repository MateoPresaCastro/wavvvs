import { User } from '../models/models.js';
import { IUser } from '../entities/allEntities.js';
import { Request, Response } from 'express';
import * as userServices from '../services/User.service';
import { getErrorMessage } from '../utils/error.util';
import jwt from 'jsonwebtoken';
const { SECRET_KEY } = process.env;

const getUser = async (req: Request, res: Response) => {
  try {
    if (req.headers && req.headers.authorization) {
      console.log(req.headers.authorization);
      let authorization = req.headers.authorization.split(' ')[1],
        decoded: any;
      try {
        decoded = jwt.verify(authorization, SECRET_KEY!);
      } catch (e) {
        return res.status(401).send('unauthorized');
      }
      const id = decoded.id;
      // Fetch the user by id
      User.findOne({ _id: id }).then(function (user) {
        return res.status(200).send(user);
      });
    }
    // return res.send(500);
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

const loginOne = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userToLog = {
      email,
      password,
    };
    const foundUser = await userServices.login(userToLog);
    res.status(200).send(foundUser);
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

const registerOne = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const userToRegister: IUser = {
      isPrivate: false,
      isNew: true,
      username,
      email,
      password,
    };
    const user = await userServices.register(userToRegister);
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

const updateOne = async (req: Request, res: Response) => {
  try {
    if (req.headers && req.headers.authorization) {
      console.log(req.headers.authorization);
      let authorization = req.headers.authorization.split(' ')[1],
        decoded: any;
      try {
        decoded = jwt.verify(authorization, SECRET_KEY!);
      } catch (e) {
        return res.status(401).send('unauthorized');
      }
      const id = decoded.id;
      const { name, email, bio, profile_pic_path } = req.body;
      const userToUpdate = {
        _id: id,
        isNew: false,
        name,
        email,
        bio,
        profile_pic_path,
        password: '',
      };
      const user = await userServices.updateProfileInfo(userToUpdate);
      res.status(204).send(user);
    }
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

// gets info about another user.
// if the user we want the info bout is private, im gonna check if you sent auth token.
const getAnotherUser = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const userToFind = await User.findOne({ username: username });
    if (!userToFind) throw new Error('User not found');
    const userToSend = {
      name: userToFind.name,
      bio: userToFind.bio,
      username: userToFind.username,
      email: userToFind.email,
      profile_pic_path: userToFind.profile_pic_path,
      // tracks ??
    };
    // if user asked is private, go on checking auth token.
    if (userToFind.isPrivate) {
      if (req.headers && req.headers.authorization) {
        let authorization = req.headers.authorization.split(' ')[1],
          decoded: any;
        try {
          decoded = jwt.verify(authorization, SECRET_KEY!);
        } catch (e) {
          return res.status(401).send('unauthorized');
        }
        if (decoded) {
          return res.status(200).send(userToSend);
        }
      } else return res.status(401).send('unauthorized');
    } else {
      // here user asked for is not private, so send it straight away.
      return res.status(200).send(userToSend);
    }
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};

export { getUser, loginOne, registerOne, updateOne, getAnotherUser };
