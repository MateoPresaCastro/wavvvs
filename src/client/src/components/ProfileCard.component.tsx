import React from 'react';
import { BsFillPersonPlusFill, BsFillPersonCheckFill } from 'react-icons/bs';

export default function ProfileCard() {

  const [followed, setFollowed] = React.useState(false);

  return (
    <div className='flex flex-col max-w-[275px] min-w-[175px] w-[70%] h-[70%] bg-neutral-800 shadow-sm shadow-black self-center justify-around items-center py-[2.5%] rounded-xl'>
      <div className='flex flex-col items-center'>
        <img className='w-24 h-24 rounded-full' src='https://i.imgur.com/GI8KgRt.jpg' alt='Profile' />
        <span className='text-neutral-200 text-xl'>@username</span>
        <span className='text-neutral-200 text-xl'>ZibZob</span>
      </div>
      <div className='flex flex-col items-center'>
      <span className='text-neutral-200 text-xl'>1,000,000</span>
        <span className='text-neutral-200 text-xl'>Songs</span>
      </div>
      <div className='flex flex-col items-center'>
        <span className='text-neutral-200 text-xl'>0</span>
        <span className='text-neutral-200 text-xl'>Followers</span>
      </div>
      <button onClick={() => setFollowed(following => !following)} className={`${followed ? 'bg-neutral-300' : 'bg-neutral-800'} border-neutral-700 border-2  p-2 px-8 rounded-xl`}>
        {
          followed
            ? <BsFillPersonCheckFill className='text-neutral-800 text-2xl'/>
            : <BsFillPersonPlusFill className='text-neutral-200 text-2xl'/>
        }
      </button>
    </div>
  );
}