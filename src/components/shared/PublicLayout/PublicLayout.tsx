import React from 'react';
import { Navbar } from './Navbar';
import './PublicLayout.scss';
import { firebaseStorage } from '../../../firebase';

export const PublicLayout = ({ children }) => {
  return (
    <div className="public">
      <Navbar />
      <main>{children}</main>
      <footer>Copyright © {new Date().getFullYear()} Skander Kchouk</footer>
    </div>
  );
};
