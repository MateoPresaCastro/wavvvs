# <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/TerenceGrover/wavvvs" /> <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/TerenceGrover/wavvvs" />

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

1. Clone this repo and enter!

   ```bash
   git clone https://github.com/MateoPresaCastro/wavvvs.git
   cd wavvvs/src
   ```

2. Install dependencies in the `client` folder and the `server` folder.

   ```bash
   npm install
   ```

3. Add enviroment variables.

    Create a `.env` file in the `src` folder and add the follwing variables, e.g:
    (These keys are fake)
    
    ```bash
    PORT=
    HOST_NAME=
    SECRET_KEY=
    CLOUD_NAME=
    API_KEY= (cloudinary)
    API_SECRET= (cloudinary)
    STRIPE_PUBLISHABLE_KEY=
    STRIPE_SECRET_KEY=
    ```
4. Run `npm start` on the `client` folder and `npx tsx index.ts` on the `server` folder.

5. Open your browser pointing to `http://localhost:3000/`

6. Enjoy!

## Tech Stack

* React
* Node
* Express
* Tailwind CSS
* Mongo with Mongoose
* JWT

## Developers

The project was started by:

* Mateo Presa - [GitHub](https://github.com/MateoPresaCastro) - [LinkedIn](https://www.linkedin.com/in/mateopresa/)

But it was taken to the next level thanks to the amazing contributions by

* Alessio Nannipieri - [GitHub](https://github.com/Al366io) - [LinkedIn](https://www.linkedin.com/in/alessio-nannipieri/)
* Terence Grover- [GitHub](https://github.com/TerenceGrover) - [LinkedIn](https://www.linkedin.com/in/tgrovermc/)


