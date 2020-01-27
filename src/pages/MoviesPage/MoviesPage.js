import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import PropTypes from 'prop-types';
import styles from './MoviesPage.module.css';
import * as API from '../../services/api';
import SearchBar from '../../components/SearchBar/SearchBar';

export default class MoviesPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    movies: null,
  };

  componentDidMount() {
    const { location } = this.props;
    if (location.search) {
      const searchParams = qs.parse(location.search).query;
      this.search(searchParams);
    }
  }

  search = query => {
    if (query === '') {
      this.setState({ movies: null });
      return;
    }
    API.searchMovie(query)
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err));
    const { history } = this.props;
    history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  render() {
    const { movies } = this.state;
    const { match, location } = this.props;
    return (
      <div>
        <SearchBar onSubmit={this.search} />
        {movies && (
          <ul>
            {movies.results.map(el => (
              <li key={el.id} className={styles.listItem}>
                <Link
                  to={{
                    pathname: `${match.url}/${el.id}`,
                    state: { from: { ...location } },
                  }}
                >
                  {el.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
