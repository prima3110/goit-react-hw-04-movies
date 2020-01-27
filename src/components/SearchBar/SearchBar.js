import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

export default class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    this.props.onSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter your movie"
          onChange={this.handleChange}
          value={value}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    );
  }
}
