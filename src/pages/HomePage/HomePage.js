import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './HomePage.module.css';
import * as API from '../../services/api';

class HomePage extends Component {
  static propTypes = {
    location: PropTypes.shape({}).isRequired,
  };

  state = {
    movies: [],
  };

  componentDidMount() {
    API.getTrending()
      .then(res => this.setState({ movies: res.data.results }))
      .catch(err => console.log(err));
  }

  render() {
    const { movies } = this.state;
    const { location } = this.props;
    return (
      <div>
        <h2>Trending today</h2>
        <ul className={styles.list}>
          {movies.map(el => (
            <li key={el.id} className={styles.listItem}>
              <Link
                to={{
                  pathname: `movies/${el.id}`,
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
