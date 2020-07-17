import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';
import './Navbar.scss';

export const Navbar: FC = () => {
  const logoUrl =
    'https://firebasestorage.googleapis.com/v0/b/skander-photo.appspot.com/o/logo.png?alt=media';

  return (
    <nav className="public__navbar">
      <Link to={Routes.Gallery}>
        <img className="logo" src={logoUrl} alt="logo" />
      </Link>
      <section className="menu">
        <Link to={Routes.Gallery}>Gallery</Link>
        <Link to={Routes.About}>About</Link>
        <Link to={Routes.Contact}>Contact</Link>
      </section>
    </nav>
  );
};
