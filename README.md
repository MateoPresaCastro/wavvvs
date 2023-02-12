
# wavvvs

Minimal audio sharing/streaming for producers. Tracks will last 24 hours online.


## Screenshots

<p align="center">
  <img src="https://res.cloudinary.com/dlshfgwja/image/upload/v1676199043/suchkvwlztsl2d2rx3xd.png" style="width:40vw;height:auto;" />
</p>


# Try it

``git clone https://github.com/MateoPresaCastro/wavvvs.git``

``cd wavvvs/src``

Do ``npm install && npm start`` inside the ``client`` directory and  ``npm install && nodemon index.js`` or ``npm install && node index.js`` in the ``server`` directory.

Open the browser and go to ``http://localhost:3000/``.

Currently there only two routes: ``http://localhost:3000/mateopresa`` and
``http://localhost:3000/randomproducer``.

You can upload, delete and control track playback on the ``mateopresa`` route. In the ``randomproducer`` route you can only control playback.

More information inside both directories.
