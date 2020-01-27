import React, { Component, lazy, Suspense } from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';
import styles from './MovieDetailsPage.module.css';
import * as API from '../../services/api';

const Cast = lazy(() =>
  import('../Cast/Cast' /* webpackChunkName: "cast-page" */),
);

const Reviews = lazy(() =>
  import('../Reviews/Reviews' /* webpackChunkName: "reviews-page" */),
);

class MovieDetailsPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        movieId: PropTypes.string.isRequired,
      }).isRequired,
      url: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        from: PropTypes.shape({}).isRequired,
      }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    movie: null,
  };

  componentDidMount() {
    const { match } = this.props;
    API.getMovieDetails(match.params.movieId)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err));
  }

  goBack = () => {
    const { location, history } = this.props;
    if (location.state && location.state.from) {
      history.push({ ...location.state.from });
      return;
    }

    history.push('/');
  };

  render() {
    const { movie } = this.state;
    const { match, location } = this.props;
    return (
      <>
        {movie && (
          <>
            <button
              type="button"
              onClick={this.goBack}
              className={styles.button}
            >
              <span> &larr; </span> Go back
            </button>
            <div className={styles.container}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <div className={styles.info}>
                <h1>
                  {movie.title} ({movie.release_date.slice(0, 4)})
                </h1>
                <p>User score: {movie.vote_average * 10}%</p>
                <h2>Overview</h2>
                <p>{movie.overview}</p>
                <h2>Genres</h2>
                <p>{movie.genres.map(el => ` ${el.name} `)}</p>
              </div>
            </div>

            <p>Additional information</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                {location.state && location.state.from ? (
                  <Link
                    to={{
                      pathname: `${match.url}/cast`,
                      state: { from: { ...location.state.from } },
                    }}
                  >
                    <p>Cast</p>
                  </Link>
                ) : (
                  <Link
                    to={{
                      pathname: `${match.url}/cast`,
                      state: { from: { ...location } },
                    }}
                  >
                    <p>Cast</p>
                  </Link>
                )}
              </li>
              <li className={styles.listItem}>
                {location.state && location.state.from ? (
                  <Link
                    to={{
                      pathname: `${match.url}/reviews`,
                      state: { from: { ...location.state.from } },
                    }}
                  >
                    <p>Reviews</p>
                  </Link>
                ) : (
                  <Link
                    to={{
                      pathname: `${match.url}/reviews`,
                      state: { from: { ...location } },
                    }}
                  >
                    <p>Reviews</p>
                  </Link>
                )}
              </li>
            </ul>
            <Suspense fallback={<Loader />}>
              <Route path={`${match.path}/cast`} component={Cast} />
              <Route path={`${match.path}/reviews`} component={Reviews} />
            </Suspense>
          </>
        )}
      </>
    );
  }
}

export default MovieDetailsPage;
