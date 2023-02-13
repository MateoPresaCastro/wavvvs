# Client

- React
- WaveSurfer.js
- Tailwind CSS
- Headless UI

## More info

The state about the audio tracks is stored in ``App.jsx``

``trackList`` is and array of objects, each one representing a track. Each of this objects holds a reference to the DOM node in which the ``WaveSurfer`` instance is contained, having access to its methods. This reference is stored in the property ``waveformRef`` of the object. Inside ``waveformRef`` you have access to the ``id`` of the track.  The ``id`` is also the path to the track in the backend server.

In each one of this objects of the ``trackList`` array, you also have access to the boolean flags ``isActive`` ``isPlaying`` and ``isFinished`` representing the state of each individual track.

When a new track gets uploaded, the ``Track.component.jsx`` gets rendered. There, a ``WaveSurfer`` instance gets created,
and appended to the DOM using the ``useRef`` hook inside the ``useEffect``:

```js
const  waveformRef  =  useRef(null);
useEffect(() => {
 const  options  = {
  container: waveformRef.current
 };
 const  wavesurfer  =  WaveSurfer.create(options);
...

...

```

```jsx
<div ref={waveformRef} className="w-full..." ></div>
```

Every track starts with all the flags set to ``false``:

```js
setTrackList((tracks) => [
 ...tracks,
 { waveformRef, isPlaying: false, isActive: false, isFinished: false },
]);
```

Each ``WaveSurfer``instance gets added an event listener when initialised, that sets to ``true`` the ``isFinished`` flag when the track finishes playing:

```js
// add on finish event listener
wavesurfer.on('finish', () => {
 setTrackList((tracks) =>
  tracks.map((track) =>
   track.waveformRef.id  ===  path
   ? { ...track, isFinished: true }
   :  track
  )
 );
});
```

When you click on play or pause, the ``playOrPauseTrackByID`` function inside ``App.jsx``gets triggered. This function holds the logic of how the boolean flags should get toggled.

