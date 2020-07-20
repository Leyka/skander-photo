import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';
import './Navbar.scss';

interface Props {
  onLogOutClick(): void;
}

export const Navbar: FC<Props> = ({ onLogOutClick }) => {
  return (
    <nav className="admin-navbar">
      <section className="admin-navbar__links">
        <Link to={Routes.AdminHome}>Manage Photos</Link>
        <span className="separator">/</span>
        <Link to={Routes.AdminUpload}>Upload</Link>
        <span className="separator">/</span>
        <Link to={Routes.Gallery}>Gallery</Link>
      </section>
      <section>
        <button onClick={onLogOutClick} className="btn logout">
          Log out
        </button>
      </section>
    </nav>
  );
};
