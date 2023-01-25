import React from 'react';
import { Context } from '../Utils/Context';
import { BsFillPersonPlusFill, BsFillPersonCheckFill } from 'react-icons/bs';
import { followUser } from '../apiService/api-service';


export default function FollowButton() {

  const { selectedUser, currentUser } = React.useContext(Context);

  const [followed, setFollowed] = React.useState(selectedUser.followers.includes(currentUser._id));

  React.useEffect(() => {
    console.log(currentUser._id)
    if (selectedUser.followers.includes(currentUser._id)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, []);

  const handleFollow = () => {
    console.log(selectedUser)
    followUser(selectedUser.id!);
    setFollowed(following => !following);
  }

  return (
    <div>
            <button onClick={handleFollow} className={`${followed ? 'bg-neutral-300' : 'bg-neutral-800'} border-neutral-700 border-2  p-2 px-8 rounded-xl`}>
        {
          followed
            ? <BsFillPersonCheckFill className='text-neutral-800 text-2xl'/>
            : <BsFillPersonPlusFill className='text-neutral-200 text-2xl'/>
        }
      </button>
    </div>
  );
}