import React from 'react';
import { useState } from 'react';
import { TbDotsVertical } from 'react-icons/tb';
import { uploadProfilePic } from '../Utils/functions';

const ProfilePic = (props: { path: string }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const profilePictureContainer = document.getElementById(
          'profilePictureContainer'
        );
        if (profilePictureContainer) {
          profilePictureContainer.style.backgroundImage = `url(${reader.result})`;
          profilePictureContainer.style.backgroundSize = 'cover';
          profilePictureContainer.style.backgroundPosition = 'center';
        }
      };
      reader.readAsDataURL(file);
      uploadProfilePic(file);
    }
  };

  return (
    <div
      id="profilePictureContainer"
      className="flex w-96 justify-center"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      {
        // make the TbDotsVertical a label for a type file to upload a new profile pic
      }
      {isHovering && !editing ? (
        <div id="profile-pic-wrapper">
          <input
            type="file"
            id="file"
            name="file"
            className="hidden"
            accept=".jpg, .jpeg, .png, .heic"
            onChange={(e) => {
              handleUpload(e);
            }}
          />
          <label id="edit" htmlFor="file" onClick={() => setEditing(true)}>
            <TbDotsVertical className="relative text-neutral-300 right-16 backdrop:top-2 p-0 mr-4 cursor-pointer hover:text-neutral-600 active:text-neutral-800 ease-in transition duration-100" />
          </label>
        </div>
      ) : (
        <div className="w-4 mr-4"></div>
      )}
      <img
        className={`${
          !props.path && 'bg-neutral-400'
        } relative right-5 w-60 h-60 rounded-full object-cover`}
        src={props.path}
        alt=""
      />
    </div>
  );
};
export default ProfilePic;
