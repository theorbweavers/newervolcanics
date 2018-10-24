import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';

import styles from './header.module.css';

const Header = props => (
  <header className={styles.header}>
    <div className={styles.siteName}>Newer Volcanics</div>
    <Navigation />
  </header>
);

Header.propTypes = {};

export default Header;
