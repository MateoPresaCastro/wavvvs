import type { CurrentUser } from '../../src/Interfaces';

export const notNewdummyUser : CurrentUser = {
  name: 'John Doe',
  profile_pic_path: 'https://i.imgur.com/1Q9ZQ9r.jpg',
  _id: '1',
  _v: 1,
  email: 'dummyUser@gmail.com',
  isNewUser : false,
  bio: 'I am a dummy user',
  username : 'dummyUser',
  tracks : [],
};

export const newdummyUser : CurrentUser = {
  name: 'John Doe',
  profile_pic_path: 'https://i.imgur.com/1Q9ZQ9r.jpg',
  _id: '2',
  _v: 2,
  email: 'dummyUser2@gmail.com',
  isNewUser : true,
  bio: 'I am a second dummy user',
  username : 'dummyUser2',
  tracks : [],
};

export const dummy_profile_pic_path : string = 'https://i.imgur.com/1Q9ZQ9r.jpg';