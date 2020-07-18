import React from 'react';
import { Gallery } from './components/Gallery/Gallery';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Routes } from './routes';
import { UserProvider } from './providers/UserProvider';
import { Login } from './components/Login/Login';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PicturesManager } from './components/PicturesManager/PicturesManager';
import { PicturesUploader } from './components/PicturesUploader/PicturesUploader';

export const App = () => {
  return (
    <Router>
      <Switch>
        <UserProvider>
          <Route exact path={Routes.Gallery} component={Gallery} />
          <Route exact path={Routes.Login} component={Login} />
          <ProtectedRoute exact path={Routes.AdminHome} component={PicturesManager} />
          <ProtectedRoute exact path={Routes.AdminUpload} component={PicturesUploader} />
        </UserProvider>
        <Redirect from="*" to={Routes.Gallery} />
      </Switch>
    </Router>
  );
};
