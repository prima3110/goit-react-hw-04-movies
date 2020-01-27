import { lazy } from 'react';

const HomePage = lazy(() =>
  import('../pages/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);

const MovieDetailsPage = lazy(() =>
  import(
    '../pages/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movies-details-page" */
  ),
);

const MoviesPage = lazy(() =>
  import(
    '../pages/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */
  ),
);

export default {
  HOME_PAGE: {
    path: '/',
    component: HomePage,
  },
  GET_MOVIE_DETAILS: {
    path: '/movies/:movieId',
    component: MovieDetailsPage,
  },
  SEARCH_MOVIE: {
    path: '/movies',
    component: MoviesPage,
  },
};
