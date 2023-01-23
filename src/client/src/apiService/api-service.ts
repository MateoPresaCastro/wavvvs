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

const getTracksFromBackend = () => {
  try {
    return fetch(baseURL + `/alltracks`).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

const deleteTrack = (id: string) => {
  try {
    return fetch(baseURL + `/delete/tracks/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};


const login = async (infoObject: InfoObject) : Promise<any> => {
  const { email, password } = infoObject;
  let user = { email, password };
  try {
    return fetch(baseURL + `/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
      },
      body: JSON.stringify(user),
    }).then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.token){
        localStorage.setItem('token', data.token)
      }
      return data
    })
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const register = async (infoObject: InfoObject)  : Promise<JSON> => {
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

const updateUser = async (secondObject: AdditionalInfoObject) : Promise<number> => {
  const { name, bio, email, profile_pic_path } = secondObject;
  let user = { name, bio, email, profile_pic_path };
  console.log(user)
  try {
    return fetch(baseURL + `/me`, {
      method: 'PUT',
      headers: {
        'Content-type': 'Application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(user),
    }).then((res) => res.status)
    .then((data) => {
      console.log(data)
      return data
    })
  }
    catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const checkUser = async () => {
  console.log('PORCAMADONNA');
  const token = localStorage.getItem('token')
  if (token){
    return fetch(baseURL + `/user`, {
      method: 'GET',
      headers: {
        'Content-type': 'Application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then((res) => {
      console.log(res);
      return res.json()})
    .then((data) => {
      console.log(data)
      return data
    })
  }
}

const postTrack = async (trackURL : string) => {
  try {
    return fetch(baseURL + `/user/tracks`, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({url: trackURL})
    }).then((res) => res.text())
  }
  catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
}

// Retrieve all tracks from the backend
export const getAllTracks = async () => {
  try {
    return fetch(baseURL + `/alltracks`, 
    {
      method: 'GET',
      headers: {
        'Content-type': 'Application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }}
    ).then((res) => res.json());
  } catch (error) {
    console.log({ error });
    return error;
  }
};

export {
  postTrack,
  getUser,
  getTracksFromBackend,
  deleteTrack,
  login,
  register,
  updateUser,
  checkUser
};
