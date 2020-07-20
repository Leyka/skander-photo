import React, { FC, ReactElement } from 'react';
import './AdminLayout.scss';
import { Navbar } from './Navbar';
import { firebaseAuth } from '../../../firebase';

interface Props {
  title: string;
  RightHeaderElement?: ReactElement;
}

export const AdminLayout: FC<Props> = (props) => {
  const { children, title, RightHeaderElement } = props;
  return (
    <div className="admin-container">
      <Navbar onLogOutClick={() => firebaseAuth.signOut()} />
      <main>
        <header>
          <h2>{title}</h2>
          {RightHeaderElement}
        </header>
        <div>{children}</div>
      </main>
    </div>
  );
};
