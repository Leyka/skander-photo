import React from 'react';
import { Gallery } from './components/Gallery/Gallery';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Routes } from './routes';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={Routes.Gallery} component={Gallery} />
        <Redirect from="*" to={Routes.Gallery} />
      </Switch>
    </Router>
  );
};
