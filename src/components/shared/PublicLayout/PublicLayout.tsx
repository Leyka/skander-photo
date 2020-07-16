import React from 'react';
import { Navbar } from './Navbar';
import './PublicLayout.scss';

export const PublicLayout = ({ children }) => {
  return (
    <div className="public">
      <Navbar />
      <main>{children}</main>
      <footer>Copyright © {new Date().getFullYear()} Skander Kchouk</footer>
    </div>
  );
};
