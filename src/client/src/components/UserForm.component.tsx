import React from 'react';
import { login, register } from '../apiService/api-service';
import { Context } from '../Utils/Context';

const UserForm = () => {

  const {setCurrentUser, setIsAuth, setIsNewUser} = React.useContext(Context);

  const [clicked, setClicked] = React.useState('');
  const [info, setInfo] = React.useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = () => {
    if ((clicked === 'register' && !info.username) || !info.password || !info.email) {
      alert('Please fill in all fields');
      return;
    }
    if (clicked === 'register'){
      if (info.username.length < 3 || !info.username.match(/^[a-zA-Z0-9]+$/)) {
        alert('Username must be at least 3 characters long and contain only letters and numbers');
        return;
    }
    }
    if (!info.email.includes('@') || !info.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      alert('Email must contain @ and contain only letters and numbers');
      return;
  }
    if (info.password.length < 8 || !info.password.match(/^[a-zA-Z0-9]+$/)) {
        alert('Password must be at least 8 characters long and contain only letters and numbers');
        return;
    }

    if (clicked === 'login') {
        login(info).then((res) => {
          console.log(res)
          if (res.token) {
            setCurrentUser(res);
            if (res.user.isNewUser === true) {
              setIsNewUser(true);
            } else {
              setIsNewUser(false);
            }
            setIsAuth(true);
          }
          else {
            alert('Invalid username or password');
          }
        })
    }
    
    if (clicked === 'register') {
      register(info).then((res) => {
        if (res) {
          console.log(res);
          setClicked('login');
        } else {
          alert('User already exists');
        }
      })
    }
    setInfo({ username: '', email: '', password: '' });
};

  return (
    // On click of the button, make the button disappear and two input fields appear
    <div className='mt-2 flex flex-col'>
      <form
        className={`${clicked === '' && 'hidden'} 
    flex items-center gap-2 flex-col transition ease-in duration-400 w-20 rounded py-2 px-1 text-xs text-white
    [&>input]:bg-neutral-600 [&>input]:p-1 [&>input]:rounded [&>*:hover]:bg-neutral-500`}
      >
        <input
          id='username'
          placeholder='username'
          className={`${clicked === 'register' ? 'show' : 'hidden'} w-40`}
          type='text'
          autoComplete='username'
          onChange={(e) => {
            setInfo({ ...info, username: e.target.value });
          }}
          value={info.username}
        ></input>
        <input
          id="email"
          placeholder="email"
          className='w-40'
          type="email"
          autoComplete="email"
          onChange={(e) => {
            setInfo({ ...info, email: e.target.value });
          }}
          value={info.email}
        ></input>
        <input
          id="password"
          placeholder="password"
          className="w-40"
          type="password"
          autoComplete="current-password"
          onChange={(e) => {
            setInfo({ ...info, password: e.target.value });
          }}
          value={info.password}
        ></input>
      </form>
      <button
        id="login"
        className={`${
          clicked === 'register' && 'hidden'
        } transition ease-in duration-200 w-20 rounded bg-neutral-800 py-2 px-1 mt-2 text-xs text-white hover:bg-neutral-700`}
        onClick={() => {
          {
            clicked === 'login' 
            ? 
            handleSubmit() 
            : 
            setClicked('login');
          }
        }}
      >
        Login
      </button>
      <button
        id="register"
        className={`${
          clicked === 'login' && 'hidden'
        } transition ease-in duration-200 w-20 rounded bg-neutral-800 py-2 px-1 mt-2 text-xs text-white hover:bg-neutral-700`}
        onClick={() => {
          {
            clicked === 'register' 
            ? 
            handleSubmit() 
            : 
            setClicked('register');
          }
        }}
      >
        Register
      </button>
      <button
        className={`${
          clicked === '' && 'hidden'
        } mt-6 underline underline-offset-2 text-sm text-neutral-200`}
        onClick={() => {setClicked('');}}
      >
        Go back
      </button>
    </div>
  );
};

export default UserForm;
