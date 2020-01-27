import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as API from '../../services/api';
import styles from './Cast.module.css';

export default class Cast extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        movieId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    movieCast: null,
  };

  componentDidMount() {
    const { match } = this.props;
    const movieID = match.params.movieId;
    API.getMovieCredits(movieID)
      .then(res => this.setState({ movieCast: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    const { movieCast } = this.state;
    return (
      <div>
        {movieCast && (
          <ul className={styles.list}>
            {movieCast.cast.map(el => (
              <li key={el.cast_id} className={styles.listItem}>
                {el.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${el.profile_path}`}
                    alt={el.character}
                    width={300}
                    height={450}
                  />
                ) : (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Anti-ACTA-Demonstration_in_Frankfurt_am_Main_2012-02-11_%2812%29.jpg"
                    alt={el.character}
                    width={300}
                    height={450}
                  />
                )}

                <p className={styles.listItemName}>{el.name}</p>
                <p>
                  <span className={styles.listItemCharacter}>Character: </span>
                  {el.character}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
