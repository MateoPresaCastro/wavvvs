// Create react component called centralHome
//
import React from 'react';
import TrackCollection from './TrackCollection';

export default function CentralHome() {
  return (
    <div className="flex flex-col justify-center items-center">
      <TrackCollection />
    </div>
  );
}
