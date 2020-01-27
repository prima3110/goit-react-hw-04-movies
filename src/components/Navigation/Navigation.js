import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import routes from '../../routes/routes';

const Navigation = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.listItem}>
        <NavLink
          exact
          activeStyle={{ color: 'red' }}
          to={routes.HOME_PAGE.path}
        >
          Home
        </NavLink>
      </li>
      <li className={styles.listItem}>
        <NavLink activeStyle={{ color: 'red' }} to={routes.SEARCH_MOVIE.path}>
          Movies
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
