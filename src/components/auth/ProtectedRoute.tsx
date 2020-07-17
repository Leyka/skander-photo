import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUserStore } from '../../providers/UserProvider';

export const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useUserStore();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        currentUser ? <RouteComponent {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};
