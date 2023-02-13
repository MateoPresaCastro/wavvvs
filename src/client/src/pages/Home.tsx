import type { CurrentUser } from '../Interfaces';
import { useState } from 'react';
import { checkUser } from '../apiService/api-service';
import Header from '../components/Header.component';
import Logo from '../components/Logo.component';
import React from 'react';
import CentralHome from '../components/CentralHome.component';
import SideBar from '../components/SideBar.component';
import ProfileCard from '../components/ProfileCard.component';
import { Context } from '../Utils/Context';

function Home() {
  const { currentUser, setCurrentUser } = React.useContext(Context);

  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    if (currentUser.name) return setIsLoading(false);
    setTimeout(() => {
      checkUser().then((res: CurrentUser) => {
        if (res) {
          setCurrentUser(res);
          setIsLoading(false);
        }
      });
    }, 1000);
  }, [currentUser.name, setCurrentUser]);

  return (
    <div id="home-wrapper">
      <Header />
      {isLoading ? (
        <main className="w-screen h-screen flex flex-col justify-center items-center">
          <Logo />
        </main>
      ) : (
        <div className="grid grid-cols-3 w-screen h-screen justify-items-center">
          <SideBar />
          <CentralHome />
          <ProfileCard />
        </div>
      )}
    </div>
  );
}

export default Home;
