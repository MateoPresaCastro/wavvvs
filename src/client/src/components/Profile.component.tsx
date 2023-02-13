import Bio from './Bio.component';
import Track from './Track.component';
import UploadTrack from './UploadTrack.component';
import ProfilePic from './ProfilePic.component';
import { useEffect, useState } from 'react';
import React from 'react';
import Logo from './Logo.component';
import { Context } from '../Utils/Context';

export default function Profile() {

  const { currentUser, trackList} = React.useContext(Context);

  const [tracksto3, setTracksto3] = useState([1, 2, 3]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser.tracks && currentUser.tracks.length > 0) {
      const buff: any[] = [...currentUser.tracks];
      setTracksto3(buff.concat([1, 2, 3]).slice(0, 3));
    } else {
      setTracksto3([1, 2, 3]);
    }
  }, [currentUser]);

  return (
    <div className="h-screen w-screen">
      {!isLoading ? (
        <div className="flex flex-col justify-start mt-14 items-center content-start p-6">
          <div className="">
            <section className="flex flex-col justify-center items-center mt-3">
              <ProfilePic path={currentUser.profile_pic_path} />
              <h1 className="text-white text-2xl mt-7 mb-1">
                {currentUser.name}
              </h1>
              <p
                id="username"
                className="text-neutral-400"
              >{`@${currentUser.username}`}</p>
            </section>
            <hr className="w-96 border-neutral-800 my-6" />
            <Bio bio={currentUser.bio} />
            <hr className="w-96 border-neutral-800 my-6" />
          </div>
          <div className="w-full flex justify-center items-center">
            <section className="w-96">
              {tracksto3.map((track: any) => {
                return typeof track === 'object' ? (
                  <Track
                    trackMetaData={track}
                    track={trackList.find(
                      (trackListItem) =>
                        trackListItem.waveformRef.id === track.path
                    )}
                    key={track.path}
                  />
                ) : (
                  <UploadTrack
                    key={track}
                  />
                );
              })}
            </section>
          </div>
        </div>
      ) : (
        <main className="flex flex-col justify-start mt-14 items-center content-start p-6">
          <Logo />
        </main>
      )}
    </div>
  );
}
