import { useEffect } from 'react';
import { IoPlay, IoStop } from 'react-icons/io5';
import {
  TbPlayerSkipBack,
  TbPlayerSkipForward,
  TbRepeat,
  TbRepeatOnce,
} from 'react-icons/tb';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import React from 'react';

export default function MediaController(props : {
  activeTrack : any;
  playOrPauseTrackByID : any;
  playNextTrack : any;
  playPrevTrack : any;
  isAudioMuted : Boolean;
  setIsAudioMuted : any;
  pauseAllTracks : any;
  repeat : any;
  setRepeat : any;
}) {

  useEffect(() => {
    if (props.activeTrack !== null && props.activeTrack.waveformRef) {
      props.activeTrack.waveformRef.wavesurfer.setMute(props.isAudioMuted);
      if (props.activeTrack.isFinished && props.activeTrack.isPlaying && props.repeat === false) {
        props.pauseAllTracks();
      }
    }
  }, [props.isAudioMuted, props.activeTrack, props.repeat, props.activeTrack, props.pauseAllTracks]);

  const handlePlayClick = () => {
    props.playOrPauseTrackByID(props.activeTrack.waveformRef.id);
  };

  const handleNextClick = () => {
    props.playNextTrack();
  };

  const handleMuteClick = () => {
    props.setIsAudioMuted(!props.isAudioMuted);
  };

  const handlePrevClick = () => {
    props.playPrevTrack();
  };

  const handleRepeatClick = () => {
    props.setRepeat(!props.repeat);
  };

  return (
    <div className="static">
      <footer className="h-14 fixed bottom-0 left-0 right-0 text-white bg-neutral-800 z-10">
        <div className="h-full flex justify-center items-center align-center">
          <div className=" flex w-96 h-full justify-between items-center lg:max-w-xl lg:w-full">
            <div className="flex w-32 justify-between items-center">
              <TbPlayerSkipBack
                onClick={handlePrevClick}
                className="cursor-pointer text-neutral-200 h-5 w-5 mr-3 hover:text-neutral-400 active:text-neutral-700 ease-in transition duration-100"
              />
              {!props.activeTrack?.isPlaying ? (
                <IoPlay
                  onClick={handlePlayClick}
                  className="cursor-pointer text-neutral-200 h-5 w-5 mr-3 hover:text-neutral-400 active:text-neutral-700 ease-in transition duration-100"
                />
              ) : (
                <IoStop
                  onClick={handlePlayClick}
                  className="cursor-pointer text-neutral-200 h-5 w-5 mr-3 hover:text-neutral-400 active:text-neutral-700 ease-in transition duration-100"
                />
              )}
              <TbPlayerSkipForward
                onClick={handleNextClick}
                className="cursor-pointer text-neutral-200 h-5 w-5 mr-3 hover:text-neutral-400  active:text-neutral-700 ease-in transition duration-100"
              />
              {props.repeat === false ? (
                <TbRepeat
                  onClick={handleRepeatClick}
                  className="cursor-pointer text-neutral-200 h-5 w-5 mr-3 hover:text-neutral-400  active:text-green-700 ease-in transition duration-100"
                />
              ) : (
                <TbRepeatOnce
                  onClick={handleRepeatClick}
                  className="cursor-pointer text-green-400 h-5 w-5 mr-3 hover:text-green-600 active:text-green-700 ease-in transition duration-100"
                />
              )}
            </div>
            <div className="flex w-14 justify-end items-center ">
              {props.isAudioMuted ? (
                <FiVolumeX
                  onClick={handleMuteClick}
                  className="cursor-pointer text-neutral-200 h-5 w-7 hover:text-neutral-400 active:text-neutral-700 ease-in transition duration-100"
                />
              ) : (
                <FiVolume2
                  onClick={handleMuteClick}
                  className="cursor-pointer text-neutral-200 h-5 w-7 hover:text-neutral-400 active:text-neutral-700 ease-in transition duration-100"
                />
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
