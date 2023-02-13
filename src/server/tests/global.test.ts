import request from 'supertest';
import * as http from 'http';
import app from '../index';
import cloudinary from 'cloudinary';
import * as mypath from 'path';
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

let server: http.Server;

function startServer(): Promise<http.Server> {
  return new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(3000, () => {
      resolve(server);
    });
  });
}

function stopServer(): Promise<void> {
  return new Promise((resolve) => {
    server.close(() => {
      resolve();
    });
  });
}

describe('login & register functionalities', () => {
  let token: string;
  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    await stopServer();
  });

  it('should respond 200 if try to register an user', async () => {
    const res = await request(app).post('/register').send({
      email: 'ale@gmail.com',
      password: '12345689',
      username: 'ale',
    });
    expect(res.status).toBe(200);
  });

  it('should respond 404 if try to login an user not registered', async () => {
    const res = await request(app).post('/login').send({
      email: 'notAle@gmail.com',
      password: '12345689111',
    });
    expect(res.status).toBe(404);
  });

  it('should respond 200 if try to login an user registered and give a token back', async () => {
    const res = await request(app).post('/login').send({
      email: 'ale@gmail.com',
      password: '12345689',
    });
    token = res.body.token;
    expect(token).toBeTruthy();
    expect(res.status).toBe(200);
  });

  it('should respond 409 if try to register an user already registered', async () => {
    const res = await request(app).post('/register').send({
      email: 'ale@gmail.com',
      password: '12345689',
      username: 'ale',
    });
    expect(res.status).toBe(409);
  });

  it('should delete an user', async () => {
    const res = await request(app)
      .delete('/user')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});

describe('interact with user functionalities', () => {
  let token: string;
  beforeAll(async () => {
    await startServer();

    await request(app).post('/register').send({
      email: 'ale@gmail.com',
      password: '12345689',
      username: 'ale',
    });
    const res = await request(app).post('/login').send({
      email: 'ale@gmail.com',
      password: '12345689',
    });
    token = res.body.token;
  });

  afterAll(async () => {
    // delete user created in beforeEach
    await request(app).delete('/user').set('Authorization', `Bearer ${token}`);
    await stopServer();
  });

  it('should update an user profile', async () => {
    const res = await request(app)
      .put('/me')
      .send({
        name: 'ale',
        bio: 'bio',
        profile_pic_path: 'path',
        isPrivate: false,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });

  it('should post a track for the user', async () => {
    const filePath = mypath.join(
      __dirname,
      '..',
      'tests',
      'mocks',
      'rickroll.m4a'
    );
    cloudinary.v2.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });
    const upload = await cloudinary.v2.uploader.upload(filePath, {
      resource_type: 'video',
    });
    const path = upload.secure_url;
    console.log(path);
    const res = await request(app)
      .post('/user/tracks')
      .send({
        url: path,
      })
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });

  let arrOfTracks: any[];
  it('should get the user profile', async () => {
    const res = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('ale');

    arrOfTracks = res.body.tracks;
  });

  it('should delete a track for the user', async () => {
    const res = await request(app)
      .delete('/track')
      .send({
        id: arrOfTracks[0]._id
      })
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });

  it('should automatically delete a track if its user is deleted', async () => {
    // TODO : implement this test
  });
});
