export interface ITrack {
  uploaded_by: string;
  path: string;
  title: string;
  size: number;
  date: number;
}

export interface IUser {
  isPrivate: boolean;
  isNew: boolean;
  name?: string;
  username?: string;
  email: string;
  password: string;
  bio?: string;
  profile_pic_path?: string;
}