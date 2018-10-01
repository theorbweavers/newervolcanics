import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import styles from './navigation.module.css';

const Navigation = props => (
  <nav className={styles.navigation}>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/people.html">People</Link>
      </li>
      <li>
        <Link to="/concert.html">Concert</Link>
      </li>
      <li>
        <Link to="/release/newer-volcanics-set-list.html">Songs</Link>
      </li>
    </ul>
  </nav>
);

Navigation.propTypes = {
  location: PropTypes.object,
};

export default Navigation;
