import React, { FC } from 'react';
import './AdminLayout.scss';
import { Navbar } from './Navbar';
import { firebaseAuth } from '../../../firebase';

export const AdminLayout: FC = ({ children }) => {
  return (
    <div className="admin-container">
      <Navbar onLogOutClick={() => firebaseAuth.signOut()} />
      <main>{children}</main>
    </div>
  );
};
