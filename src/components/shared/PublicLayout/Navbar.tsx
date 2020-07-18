import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';
import './Navbar.scss';
import { LOGO_URL } from '../../../shared/constants';

export const Navbar: FC = () => {
  return (
    <nav className="public__navbar">
      <Link to={Routes.Gallery}>
        <img className="logo" src={LOGO_URL} alt="logo" />
      </Link>
      <section className="menu">
        <Link to={Routes.Gallery}>Gallery</Link>
        <Link to={Routes.About}>About</Link>
        <Link to={Routes.Contact}>Contact</Link>
      </section>
    </nav>
  );
};
