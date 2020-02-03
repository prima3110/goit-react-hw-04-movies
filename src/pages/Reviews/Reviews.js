import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Reviews.module.css';
import * as API from '../../services/api';

export default class Reviews extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        movieId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    movieReviews: null,
    error: null,
  };

  componentDidMount() {
    const { match } = this.props;
    API.getMovieReviews(match.params.movieId)
      .then(res => this.setState({ movieReviews: res.data }))
      .catch(err => this.setState({ error: err }));
  }

  render() {
    const { movieReviews, error } = this.state;
    return (
      <div>
        {error && <>Something went wrong</>}
        {movieReviews && movieReviews.results.length > 0 ? (
          <ul className={styles.list}>
            {movieReviews.results.map(el => (
              <li key={el.id}>
                <p className={styles.text}> Author: {el.author} </p>
                <p>{el.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We don&apos;t have any reviews for this movie</p>
        )}
      </div>
    );
  }
}
