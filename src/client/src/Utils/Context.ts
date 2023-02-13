// Create a react context for my state management. That includes the state and the dispatch function.
import React from 'react';
import type { CurrentUser, TrackListItemType } from '../Interfaces';

export const Context = React.createContext({
  valid: false,
  setValid: (valid: boolean) => {},
  isAuth: false,
  setIsAuth: (isAuth: boolean) => {},
  isNewUser: false,
  setIsNewUser: (isNewUser: boolean) => {},
  loading: false,
  setLoading: (loading: boolean) => {},
  currentUser: {} as CurrentUser,
  setCurrentUser: (currentUser: any) => {},
  trackList: [] as TrackListItemType[],
  setTrackList: (trackList: any) => {},
  isAudioMuted: false,
  setIsAudioMuted: (isAudioMuted: boolean) => {},
  repeat: false,
  setRepeat: (repeat: boolean) => {},
  playOrPauseTrackByID: (id: string) => {},
});
