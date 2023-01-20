import React from 'react';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import Logo from './Logo.component';

const { REACT_APP_BACKEND_HOST } = process.env;
const staticPicUrl = `${REACT_APP_BACKEND_HOST}/pics/mateo_pic.jpeg`;

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 max-w-92">
      <header className="flex justify-center h-14 text-white bg-neutral-800">
        <div className="w-96 py-3.5 flex justify-between lg:max-w-xl lg:w-full">
          <div className="flex w-26 h-full justify-between items-center content-center">
            <AiOutlineMenu className="text-neutral-200 h-6 w-6 mr-3 hover:text-neutral-400 ease-in transition duration-100 cursor-pointer" />
            <div className="mb-1">
              <Logo />
            </div>
          </div>
          <div className="flex w-26 justify-between items-center">
            <AiOutlineSearch className="text-neutral-200 h-6 w-6 hover:text-neutral-400 ease-in transition duration-100 cursor-pointer" />
            <img
              className="w-6 h-6 ml-3 rounded-full"
              src={staticPicUrl}
              alt="User profile"
            />
          </div>
        </div>
      </header>
    </div>
  );
}