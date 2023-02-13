import React from 'react';
import UserForm from '../components/UserForm.component';
import type { CurrentUser } from '../Interfaces';
import Logo from '../components/Logo.component';

export default function LandingPage() {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <Logo />
      <UserForm />
    </main>
  );
}
