import React, { createContext, FC, useContext } from 'react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

interface UserStore {
  currentUser: firebase.User | null;
}

export const UserContext = createContext<UserStore>({ currentUser: null });

export const UserProvider: FC = ({ children }) => {
  const { currentUser, initializing } = useFirebaseAuth();

  if (initializing) {
    return null;
  }

  return <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>;
};

export const useUserStore = () => useContext(UserContext);
