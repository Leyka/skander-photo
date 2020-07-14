import React from 'react';
import { Navbar } from './Navbar';

export const PublicLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};
