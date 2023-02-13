import React from 'react';
import type { CurrentUser, TrackListItemType } from '../Interfaces';

export const ValidContext = React.createContext({
  valid: false,
  setValid: (valid: boolean) => {},
});
export const IsAuthContext = React.createContext({
  isAuth: false,
  setIsAuth: (isAuth: boolean) => {},
});
export const IsNewUserContext = React.createContext({
  isNewUser: false,
  setIsNewUser: (isNewUser: boolean) => {},
});
export const LoadingContext = React.createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
});
export const CurrentUserContext = React.createContext({
  currentUser: {} as CurrentUser,
  setCurrentUser: () => {},
});
export const TrackListContext = React.createContext({
  trackList: [] as TrackListItemType[],
  setTrackList: (trackList: TrackListItemType[]) => {},
});
export const IsAudioMutedContext = React.createContext({
  isAudioMuted: false,
  setIsAudioMuted: (isAudioMuted: boolean) => {},
});
export const RepeatContext = React.createContext({
  repeat: false,
  setRepeat: (repeat: boolean) => {},
});

export const playContext = React.createContext({
  playOrPauseTrackByID: (id: string) => {},
});