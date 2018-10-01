import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../images/the-orbweavers-logo.png';
import styles from './footer.module.css';

const Footer = props => (
  <footer className={styles.footer}>
    <div className={styles.logo}>
      <img src={logo} />
    </div>
    <p className={styles.copyright}>
      &copy; <a href="https://www.theorbweavers.com">The Orbweavers</a>
    </p>
  </footer>
);

Footer.propTypes = {
  timeout: PropTypes.bool,
};

export default Footer;
