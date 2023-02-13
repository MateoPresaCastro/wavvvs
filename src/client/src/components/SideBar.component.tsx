import React from 'react';
import SideBarButton from './SideBarButton.component';
import { AiFillHome, AiFillClockCircle } from 'react-icons/ai';
import { BsFillPersonFill, BsSuitHeartFill } from 'react-icons/bs';

export default function SideBar() {
  return (
    <div className='self-center flex flex-col w-32 h-[60%] bg-neutral-800 shadow-sm shadow-black justify-between items-center py-[35px] rounded-xl'>
      <SideBarButton icon={<AiFillHome style={{'filter' : 'drop-shadow(1px 1px 2px black)'}} className="text-4xl" />} text={'Home'} />
      <SideBarButton icon={<AiFillClockCircle style={{'filter' : 'drop-shadow(1px 1px 2px black)'}} className="text-4xl" />} text={'Soon'} />
      <SideBarButton icon={<BsFillPersonFill style={{'filter' : 'drop-shadow(1px 1px 2px black)'}} className="text-4xl" />} text={'Top'} />
      <SideBarButton icon={<BsSuitHeartFill style={{'filter' : 'drop-shadow(1px 1px 2px black)'}} className="text-4xl" />} text={'Top'} />
    </div>
  );
}