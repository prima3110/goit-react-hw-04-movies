import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './HomePage.module.css';
import routes from '../../routes/routes';
import * as API from '../../services/api';

class HomePage extends Component {
  static propTypes = {
    location: PropTypes.shape({}).isRequired,
  };

  state = {
    movies: [],
    error: null,
  };

  componentDidMount() {
    API.getTrending()
      .then(res => this.setState({ movies: res.data.results }))
      .catch(err => this.setState({ error: err }));
  }

  render() {
    const { movies, error } = this.state;
    const { location } = this.props;
    return (
      <div>
        {error && <>Something went wrong</>}
        <h2>Trending today</h2>
        <ul className={styles.list}>
          {movies.map(el => (
            <li key={el.id} className={styles.listItem}>
              <Link
                to={{
                  pathname: `${routes.SEARCH_MOVIE.path}/${el.id}`,
                  state: { from: { ...location } },
                }}
              >
                {el.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomePage;
