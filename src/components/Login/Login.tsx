import React from 'react';
import './Login.scss';
import { firebaseAuth, firebasePersistenceType } from '../../firebase';
import { useForm } from 'react-hook-form';
import { useUserStore } from '../../providers/UserProvider';
import { Redirect } from 'react-router';
import { Routes } from '../../routes';
import { LOGO_URL } from '../../shared/constants';

interface LoginData {
  email: string;
  password: string;
}

export const Login = ({ history }) => {
  const { register, handleSubmit } = useForm();

  const login = async (data: LoginData) => {
    const { email, password } = data;
    try {
      await firebaseAuth.setPersistence(firebasePersistenceType.LOCAL);
      await firebaseAuth.signInWithEmailAndPassword(email, password);
      history.push('/admin');
    } catch (err) {
      console.log(err); // TODO: Better error handling
    }
  };

  // Redirect if already connected
  const { currentUser } = useUserStore();
  if (currentUser) return <Redirect to={Routes.AdminHome} />;

  return (
    <div className="login-container">
      <img src={LOGO_URL} alt="logo" />
      <form className="login-form" onSubmit={handleSubmit(login)}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoFocus
          ref={register}
          className="input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={register}
          className="input"
          required
        />
        <button type="submit" className="button fill">
          Login
        </button>
      </form>
    </div>
  );
};
