import { useEffect, useRef, useState } from 'react';
import { TrackType, TrackListItemType } from '../Interfaces.js';
import WaveSurfer from 'wavesurfer.js';
import millisecondsToHours from 'date-fns/millisecondsToHours';
import { IoPlay, IoStop } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import DeleteWarningModal from './DeleteWarningModal.component';
import React from 'react';
import { Context } from '../Utils/Context';

export default function Track(props: {
  trackMetaData: TrackType;
  track: TrackListItemType | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const { currentUser, setTrackList, playOrPauseTrackByID } = React.useContext(Context);

  const waveformRef: any = useRef('waveform');

  const { path, title, date, uploaded_by } = props.trackMetaData;
  const hoursSinceUploaded = millisecondsToHours(Number(Date.now() - date));

  useEffect(() => {
    const options = {
      container: waveformRef.current,
      barHeight: 3,
      barWidth: 2,
      height: 18,
      normalize: true,
      waveColor: '#383838',
      progressColor: '#999',
    };

    const wavesurfer = WaveSurfer.create(options);

    //The load method handles the actual fetching of the audio
    wavesurfer.load(props.trackMetaData.path);

    waveformRef.id = path;
    waveformRef.wavesurfer = wavesurfer;

    // add on finish event listener
    wavesurfer.on('finish', () => {
      setTrackList((tracks: TrackListItemType[]) =>
        tracks.map((track) =>
          track.waveformRef.id === path ? { ...track, isFinished: true } : track
        )
      );
    });

    setTrackList((tracks: TrackListItemType[]) => [
      ...tracks,
      { waveformRef, isPlaying: false, isActive: false, isFinished: false },
    ]);

    return () => {
      // clean up function
      setTrackList((tracks: TrackListItemType[]) => {
        return tracks.filter((track) => track.waveformRef.id !== path);
      });
      // remove event listener
      wavesurfer.un('finish', () => {
        setTrackList((tracks: TrackListItemType[]) =>
          tracks.map((track) =>
            track.waveformRef.id === path
              ? { ...track, isFinished: false }
              : track
          )
        );
      });
      // destroy the instance
      wavesurfer.destroy();
    };
  }, [path, setTrackList]);

  if (props.track) {
    if (props.track.isPlaying) {
      props.track.waveformRef?.wavesurfer.play();
    } else {
      props.track.waveformRef?.wavesurfer.stop();
    }
  }

  const handleClick = () => {
    playOrPauseTrackByID(path);
  };

  return (
    <div
      onMouseOver={() => {
        setIsHovering(true);
      }}
      onMouseOut={() => {
        setIsHovering(false);
      }}
      className="h-12 mb-10"
    >
      <DeleteWarningModal setOpen={setOpen} open={open} trackPath={path} />
      <div className="relative flex justify-between w-full">
        {isHovering && uploaded_by === currentUser._id ? (
          <MdClose
            className="text-neutral-300 p-0 m-0 cursor-pointer hover:text-red-500 ease-in transition duration-100"
            onClick={() => {
              setOpen(true);
            }}
          />
        ) : (
          <div className="w-4"></div>
        )}
        <h4 className=" absolute left-4 text-neutral-300 text-xs mb-2 ml-5">
          {title}
        </h4>
        <h4 className="text-neutral-600 text-xs pl-9 mb-2">
          {hoursSinceUploaded ? hoursSinceUploaded + 'h' : 'now'}
        </h4>
      </div>
      <div className="flex align-center items-center overflow-hidden">
        <div className="mr-2">
          {props.track?.isPlaying ? (
            <IoStop
              onClick={handleClick}
              className="cursor-pointer text-white w-5 h-5 hover:text-neutral-400 ease-in transition duration-100"
            />
          ) : (
            <IoPlay
              onClick={handleClick}
              className="cursor-pointer text-white w-5 h-5 hover:text-neutral-400 ease-in transition duration-100"
            />
          )}
        </div>
        <div className="w-full overflow-hidden ml-2" ref={waveformRef}></div>
      </div>
    </div>
  );
}
