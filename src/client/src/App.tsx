import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import './index.css';
import CreateUser from './pages/CreateUser';
import MediaController from './components/MediaController.component';
import Logo from './components/Logo.component';
import { checkUser } from './apiService/api-service';
import type { CurrentUser, TrackListItemType } from './Interfaces';
import ProfilePage from './pages/ProfilePage';
import { compressAndStoreFromUrl, parseJWT } from './Utils/functions';
import { Context } from './Utils/Context';

export default function App() {

  const [mobile, setMobile] = React.useState(false);
  const [valid, setValid] = React.useState(false);
  const [isAuth, setIsAuth] = React.useState(false);
  const [isNewUser, setIsNewUser] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [trackList, setTrackList] = React.useState<TrackListItemType[]>([]);
  const [isAudioMuted, setIsAudioMuted] = React.useState(false);
  const [repeat, setRepeat] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<CurrentUser>({
    username: '',
    _v: 0,
    _id: '',
    bio: '',
    email: '',
    name: '',
    profile_pic_path: '',
    tracks: [],
    isNewUser: true,
  });

  React.useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth <= 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    window.addEventListener('resize', checkIfMobile);
    checkIfMobile();
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const activeTrack = trackList.find((track) => track.isLastActive) ?? null;

  const playOrPauseTrackByID = (id: string) => {
    setTrackList((tracks) => {
      // Loop trough the tracks and modify the status of th track you want to play/pause
      const modifiedTrackList = tracks.map((track) => {
        return track.waveformRef.id === id
          ? {
              ...track,
              isLastActive: track.isPlaying || true, // track.isPlaying being false here means you are clicking play.
              isPlaying: !track.isPlaying, // toggle isPlaying flag on or off
              isFinished: track.isPlaying && false,
            }
          : track;
      });

      // make sure only one track is playing, and only one track is active at the same time.
      return modifiedTrackList.map((track) => {
        if (track.isPlaying && track.waveformRef.id !== id) {
          track.isPlaying = !track.isPlaying;
        }
        if (track.isLastActive && track.waveformRef.id !== id) {
          track.isLastActive = !track.isLastActive;
        }
        return track;
      });
    });
  };

  const playNextTrack = () => {
    let lastActiveTrackIndex = trackList.findIndex(
      (track) => track.isLastActive
    );

    lastActiveTrackIndex === trackList.length - 1
      ? (lastActiveTrackIndex = 0)
      : lastActiveTrackIndex++;

    const nextTrack = trackList.at(lastActiveTrackIndex);
    nextTrack && playOrPauseTrackByID(nextTrack.waveformRef.id);
  };

  const playPrevTrack = () => {
    let lastActiveTrackIndex = trackList.findIndex(
      (track) => track.isLastActive
    );

    lastActiveTrackIndex === 0
      ? (lastActiveTrackIndex = trackList.length - 1)
      : lastActiveTrackIndex--;

    const prevTrack = trackList.at(lastActiveTrackIndex);
    prevTrack && playOrPauseTrackByID(prevTrack.waveformRef.id);
  };

  const pauseAllTracks = () => {
    setTrackList((tracks) =>
      tracks.map((track) => ({
        ...track,
        isPlaying: false,
        isFinished: false,
      }))
    );
  };

  React.useEffect(() => {
    checkUser().then((res: CurrentUser) => {
      if (res) {
        setCurrentUser(res);
        if (res.isNewUser === true || !res.hasOwnProperty('isNewUser')) {
          setIsNewUser(true);
        } else {
          compressAndStoreFromUrl(res.profile_pic_path);
          setIsNewUser(false);
        }
        setLoading(false);
      }
    });
  }, [valid]);

  React.useEffect(() => {
    console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
      console.log('no token');
      setIsAuth(false);
      setLoading(false);
      return;
    } else {
      const token = localStorage.getItem('token')!;
      const decodedJwt = parseJWT(token);
      console.log(decodedJwt);

      if (decodedJwt.exp * 1000 < Date.now()) {
        console.log('token expired');
        localStorage.removeItem('token');
        setIsAuth(false);
      } else {
        console.log('token valid');
        setValid(true);
      }
    }
  }, [isAuth]);

  return (
    <Context.Provider
      value={{
        valid,
        setValid,
        isAuth,
        setIsAuth,
        isNewUser,
        setIsNewUser,
        loading,
        setLoading,
        trackList,
        setTrackList,
        currentUser,
        setCurrentUser,
        isAudioMuted,
        setIsAudioMuted,
        repeat,
        setRepeat,
        playOrPauseTrackByID,
      }}
    >
      <div id="app-wrapper">
        <Router>
          {!loading ? (
            <Routes>
              <Route
                path="/"
                element={
                  valid ? (
                    isNewUser ? (
                      <CreateUser />
                    ) : (
                      <Home />
                    )
                  ) : (
                    <LandingPage />
                  )
                }
              />

              <Route
                path="/profile"
                element={
                  valid ? (
                    <ProfilePage />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          ) : (
            <main className="w-screen h-screen flex flex-col justify-center items-center">
              <Logo />
            </main>
          )}
        </Router>
        {valid && !isNewUser && (
          <MediaController
            activeTrack={activeTrack}
            playOrPauseTrackByID={playOrPauseTrackByID}
            playNextTrack={playNextTrack}
            playPrevTrack={playPrevTrack}
            pauseAllTracks={pauseAllTracks}
          />
        )}
      </div>
    </Context.Provider>
  );
}
