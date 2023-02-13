import { CurrentUser, InfoObject, AdditionalInfoObject } from '../Interfaces';
const baseURL = 'http://localhost:3001';

const getUser = (user: string): any => {
  try {
    return fetch(baseURL + `/users`, {
      method: 'GET',
      body: JSON.stringify({ username: user }),
    }).then((res) => {
      res.json();
    });
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const login = async (infoObject: InfoObject): Promise<any> => {
  const { email, password } = infoObject;
  let user = { email, password };
  try {
    return fetch(baseURL + `/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        return data;
      });
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const register = async (infoObject: InfoObject): Promise<JSON> => {
  const { email, username, password } = infoObject;
  let user = { email, username, password };
  try {
    return fetch(baseURL + `/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const updateUser = async (
  secondObject: AdditionalInfoObject
): Promise<number> => {
  const { name, bio, email, profile_pic_path } = secondObject;
  let user = { name, bio, email, profile_pic_path };
  try {
    return fetch(baseURL + `/me`, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.status)
      .then((data) => {
        console.log(data);
        return data;
      });
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const checkUser = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    return fetch(baseURL + `/user`, {
      method: 'GET',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      });
  }
};

const postTrack = async (trackURL: string) => {
  try {
    return fetch(baseURL + `/user/tracks`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ url: trackURL }),
    }).then((res) => res.text());
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const deleteTrack = async (id: string) => {
  try {
    return fetch(baseURL + `/track`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'Application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ id: id }),
    }).then((res) => res.text());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export {
  postTrack,
  getUser,
  deleteTrack,
  login,
  register,
  updateUser,
  checkUser,
};
