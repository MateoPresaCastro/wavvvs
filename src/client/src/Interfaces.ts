export interface ErrorType {
  cause : string;
  message : string;
}

export interface CurrentUser {
  username: string;
  _v: number;
  _id : string;
  bio: string;
  email: string;
  name: string;
  profile_pic_path: string;
  tracks: Array<any>;
  isNewUser: boolean;
}

export interface TrackType {
  uploaded_by: string;
  path: string;
  title: string;
  size: number;
  date: number;
}

export interface TrackListItemType {
  [x: string]: any;
  waveformRef:  any;
  isPlaying: boolean;
  isLastActive?: boolean;
  isActive?: boolean;
  isFinished: boolean;
}

export interface InfoObject {
  username?: string;
  password: string;
  email?: string;
}

export interface AdditionalInfoObject {
  name?: string;
  bio?: string;
  email?: string;
  profile_pic_path?: string;
  tracks?: Array<any>;
}