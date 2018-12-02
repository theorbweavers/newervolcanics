import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { LocationProvider } from '@reach/router';

import styles from './navigation.module.css';

const isActive = (path, test) => {
  return test.test(path) ? styles.active : '';
};
const Navigation = props => (
  <LocationProvider>
    {({ location }) => (
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link
              className={isActive(location.pathname, /\/index.html/)}
              to="/index.html"
            >
              Home
            </Link>
          </li>
          {/* <li>
            <Link
              className={isActive(location.pathname, /\/people.html/)}
              to="/people.html"
            >
              People
            </Link>
          </li>
          <li>
            <Link
              className={isActive(location.pathname, /\/concert.html/)}
              to="/concert.html"
            >
              Concert
            </Link>
          </li> */}
          <li>
            <Link
              className={isActive(location.pathname, /\/release*/)}
              to="/release/songs.html"
            >
              Songs
            </Link>
          </li>
          <li>
            <Link
              className={isActive(location.pathname, /song-maps*/)}
              to="/song-maps.html"
            >
              Song Maps
            </Link>
          </li>
          <li>
            <Link
              className={isActive(location.pathname, /events*/)}
              to="/events.html"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              className={isActive(location.pathname, /program*/)}
              to="/program.html"
            >
              Program
            </Link>
          </li>
        </ul>
      </nav>
    )}
  </LocationProvider>
);

Navigation.propTypes = {
  location: PropTypes.object,
};

export default Navigation;
