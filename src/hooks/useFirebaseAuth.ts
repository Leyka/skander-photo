import { firebaseAuth } from './../firebase';
import { useState, useEffect } from 'react';

export const useFirebaseAuth = () => {
  const [currentUser, setUser] = useState(firebaseAuth.currentUser);
  const [initializing, setInitializing] = useState(!currentUser);

  const onUserChange = (currentUser) => {
    setUser(currentUser);
    setInitializing(false);
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(onUserChange);
  }, []);

  return { currentUser, initializing };
};
