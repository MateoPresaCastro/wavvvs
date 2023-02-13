import React from 'react';

export default function SideBarButton(props: { icon: JSX.Element, text: string }) {
  return (
    <div className='flex flex-col text-neutral-200 items-center'>
        <button>
          {props.icon}
        </button>
        <span>{props.text}</span>
    </div>
  );
}