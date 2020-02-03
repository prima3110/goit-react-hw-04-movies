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
    error: null,
  };

  componentDidMount() {
    const { match } = this.props;
    const movieID = match.params.movieId;
    API.getMovieCredits(movieID)
      .then(res => this.setState({ movieCast: res.data }))
      .catch(err => this.setState({ error: err }));
  }

  render() {
    const { movieCast, error } = this.state;
    return (
      <div>
        {error && <>Something went wrong</>}
        {movieCast && (
          <ul className={styles.list}>
            {movieCast.cast.map(profile => (
              <li key={profile.cast_id} className={styles.listItem}>
                {profile.profile_path ? (
                  <img
                    src={`${API.profileActorPhoto}${profile.profile_path}`}
                    alt={profile.character}
                    width={300}
                    height={450}
                  />
                ) : (
                  <img
                    src={API.profileActorPhotoAlternative}
                    alt={profile.character}
                    width={300}
                    height={450}
                  />
                )}

                <p className={styles.listItemName}>{profile.name}</p>
                <p>
                  <span className={styles.listItemCharacter}>Character: </span>
                  {profile.character}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
