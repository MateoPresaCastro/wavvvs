import React from 'react';
import { useState, useEffect } from 'react';
import { TbDotsVertical } from 'react-icons/tb';
import { updateUser } from '../apiService/api-service';

const Bio = (props: { bio: string }) => {
  const inputRef = React.useRef<any>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [editing, setediting] = useState(false);
  const [bio, setBio] = useState(props.bio);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (!editing && bio !== props.bio) {
      updateUser({
        bio: bio,
      });
    }
  }, [editing]);

  return (
    <section
      className="w-96 max-h-96"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <div className="static flex w-full">
        {isHovering && !editing ? (
          <TbDotsVertical
            id="edit"
            className="relative text-neutral-300 p-0 mr-4 cursor-pointer hover:text-neutral-600 active:text-neutral-800 ease-in transition duration-100"
            onClick={() => setediting(true)}
          />
        ) : (
          <div className="w-4 mr-4"></div>
        )}
        <p
          ref={inputRef}
          contentEditable={editing}
          onBlur={(e) => {
            setediting(false);
            const input = e.target as HTMLInputElement;
            console.log(input.innerText);
            setBio(input.innerText);
          }}
          suppressContentEditableWarning={true}
          id="bio"
          className="text-xs text-neutral-400 text-left w-full focus:bg-neutral-800 focus:text-neutral-300 focus:outline-neutral-200"
        >
          {bio}
        </p>
      </div>
    </section>
  );
};

export default Bio;
