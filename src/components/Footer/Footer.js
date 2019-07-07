import React from 'react';
import PropTypes from 'prop-types';
import Article from '../Article';
import logo from '../../images/the-orbweavers-logo.png';
import substationLogo from '../../images/supporter-logos/the-substation.png';
import mistletoneLogo from '../../images/supporter-logos/mistletone.png';
import slvLogo from '../../images/supporter-logos/state-library-victoria.png';
import cvLogo from '../../images/supporter-logos/creative-victoria.png';
import acaLogo from '../../images/supporter-logos/aca.png';
import styles from './footer.module.css';

const Footer = props => (
  <>
    <div className={styles.supporters}>
      <header className={styles.header}>
        <h2 className={styles.title}>Supported by</h2>
      </header>
      <Article>
        <nav>
          <ul className={styles.supporterLogos}>
            <li>
              <a
                className={styles.supporterLogo}
                href="https://thesubstation.org.au"
                title="The Substation"
              >
                <img src={substationLogo} alt="" />
              </a>
            </li>
            <li>
              <a
                className={styles.supporterLogo}
                href="https://www.mistletone.net"
                title="Mistletone"
              >
                <img src={mistletoneLogo} alt="" />
              </a>
            </li>
            <li>
              <a
                className={styles.supporterLogo}
                title="State Library of Victoria"
                href="https://slv.vic.gov.au"
              >
                <img src={slvLogo} alt="" />
              </a>
            </li>
            <li>
              <a
                className={styles.supporterLogo}
                href="https://creative.vic.gov.au/"
                title="Creative Victoria"
              >
                <img src={cvLogo} alt="" />
              </a>
            </li>
            <li>
              <a
                className={styles.supporterLogo}
                href="http://www.australiacouncil.gov.au"
                title="Australia Council"
              >
                <img src={acaLogo} alt="" />
              </a>
            </li>
          </ul>
        </nav>
      </Article>
    </div>
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img src={logo} alt="The Orbweavers - Logo" />
      </div>
      <p className={styles.copyright}>&copy; The Orbweavers</p>
    </footer>
  </>
);

Footer.propTypes = {
  timeout: PropTypes.bool,
};

export default Footer;
