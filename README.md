
# wavvvs

<p align="center">
  <img src="https://media.licdn.com/dms/image/C4E0BAQHg73rflkOEEw/company-logo_200_200/0/1676186988722?e=1684368000&v=beta&t=_X4Sq3GL-TOgew8twRgrNbFZ4JXHLm9PpK5mynO-Y0k" />
</p>


wavvvs is a minimal audio sharing/streaming for producers. Tracks will last 24 hours online.


## Screenshots

<p align="center">
  <img src="https://res.cloudinary.com/dlshfgwja/image/upload/v1676199242/lwvxhodsgiqoq9ycy0wa.png"
 style="width:40vw;height:auto;" />
</p>


## Getting started

You'll to create a Cloudinary account:

* [Cloudinary](https://cloudinary.com/) - a cloud media storage.

   Create an account and get your `CLOUD NAME` `API_KEY` and `API_SECRET`.



## Installation 
``git clone https://github.com/MateoPresaCastro/wavvvs.git``

``cd wavvvs/src``

Do ``npm install && npm start`` inside the ``client`` directory and  ``npm install && nodemon index.js`` or ``npm install && node index.js`` in the ``server`` directory.

Open the browser and go to ``http://localhost:3000/``.

Currently there only two routes: ``http://localhost:3000/mateopresa`` and
``http://localhost:3000/randomproducer``.

You can upload, delete and control track playback on the ``mateopresa`` route. In the ``randomproducer`` route you can only control playback.

More information inside both directories.
