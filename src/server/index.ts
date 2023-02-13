import * as dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import router from './router';
import connect from './models/index';
import deleteEverythingFromDB from './seedScript';
import deleteExpiredTracks from './cronJob';

const { PORT, HOST_NAME } = process.env;

const app: Express = express();

(async function () {
  try {
    connect();
  } catch (error) {
    console.log(error);
    return;
  }
})();

app.use(express.json());
app.use(cors());
app.use(router);

app.get('*', (req: Request, res: Response) => {
  res.status(404);
  res.send('Not Found');
});

// UNCOMMENT THIS if u want to wipe the DB
// deleteEverythingFromDB();

const ONE_MINUTE = 60000;
setInterval(deleteExpiredTracks, ONE_MINUTE);

app.listen(PORT, () => {
  console.log(`Web server running: ${HOST_NAME}:${PORT}`);
});

export default app;
