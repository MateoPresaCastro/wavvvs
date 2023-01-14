import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom'

import Profile from './components/Profile.component.jsx';
import Header from './components/Header.component.jsx';
import MediaController from './components/MediaController.component.jsx';
import LandingPage from './components/LandingPage.component.jsx';

function App() {
  const [trackList, setTrackList] = useState([]);
  const [activeTrack, setActiveTrack] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    const newActiveTrack = trackList.find(
      (track) => track.isLastActive === true
    );
    setActiveTrack(newActiveTrack);
  }, [activeTrack, trackList]);

  const playOrPauseTrackByID = (id) => {
    setTrackList((tracks) => {
      const modifiedTrackList = tracks.map((track) => {
        // Loop trough the tracks and find by id the one you want to play/pause.
        if (track.waveformRef.id === id) {
          return {
            ...track,
            isLastActive: track.isPlaying || true, // track.isPlaying being false here means you are clicking play.
            // the last active track is the last track on which you clicked play.
            isPlaying: !track.isPlaying, // toggle isPlaying flag on or off
          };
        }
        return track;
      });

      // make sure only one track is playing, and only one track is active at the same time.
      return modifiedTrackList.map((track) => {
        if (track.isPlaying) {
          if (track.waveformRef.id !== id) {
            track.isPlaying = !track.isPlaying;
          }
        }
        if (track.isLastActive) {
          if (track.waveformRef.id !== id) {
            track.isLastActive = !track.isLastActive;
          }
        }
        return track;
      });
    });
  };

  const playNextTrack = () => {
    let lastActiveTrackIndex = trackList.findIndex(
      (track) => track.isLastActive === true
    );

    lastActiveTrackIndex === trackList.length - 1
      ? (lastActiveTrackIndex = 0)
      : lastActiveTrackIndex++;

    const nextTrack = trackList.at(lastActiveTrackIndex);
    playOrPauseTrackByID(nextTrack.waveformRef.id);
  };

  const playPrevTrack = () => {
    let lastActiveTrackIndex = trackList.findIndex(
      (track) => track.isLastActive === true
    );

    lastActiveTrackIndex === 0
      ? (lastActiveTrackIndex = trackList.length - 1)
      : lastActiveTrackIndex--;

    const prevTrack = trackList.at(lastActiveTrackIndex);
    playOrPauseTrackByID(prevTrack.waveformRef.id);
  };

  return (
    // <Routes>
    //   <Route path="/" element={<LandingPage />} />
    //   <Route path="/test" element={<Profile />} />
    // </Routes>)
    <div className="h-screen w-screen bg-neutral-900 flex flex-col">
      {!isAuthenticated ? (
        <>
          <LandingPage />
        </>
      ) : (
        <>
          <Header />
          <Profile
            trackList={trackList}
            setTrackList={setTrackList}
            playOrPauseTrackByID={playOrPauseTrackByID}
          />
          {activeTrack && (
            <MediaController
              activeTrack={activeTrack}
              playOrPauseTrackByID={playOrPauseTrackByID}
              playNextTrack={playNextTrack}
              playPrevTrack={playPrevTrack}
              setTrackList={setTrackList}
              isAudioMuted={isAudioMuted}
              setIsAudioMuted={setIsAudioMuted}
            />
          )}
        </>
      )}
    </div> );
  // );
}

export default App;