import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../routes/routes';
import Navigation from './Navigation/Navigation';
import Loader from './Loader/Loader';

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route
            path={routes.HOME_PAGE.path}
            exact
            component={routes.HOME_PAGE.component}
          />
          <Route
            path={routes.GET_MOVIE_DETAILS.path}
            component={routes.GET_MOVIE_DETAILS.component}
          />
          <Route
            path={routes.SEARCH_MOVIE.path}
            component={routes.SEARCH_MOVIE.component}
          />
          <Redirect to={routes.HOME_PAGE.path} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
