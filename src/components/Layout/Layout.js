import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { LocationProvider } from '@reach/router';
import Background from '../Background';
import Header from '../Header';
import Footer from '../Footer';

import './layout.css';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => {
      return (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              {
                name: 'description',
                content:
                  'Newer Volcanics is a creative project with accompanying performance by The Orbweavers responding to the volcanic plains and waterways of western Melbourne. The performance will be premiered at The Substation arts centre in Newport on 29 and 30 November 2018, and is presented in collaboration with The Letter String Quartet and filmmaker Brian Cohen.',
              },
              {
                name: 'keywords',
                content:
                  'the orbweavers, newer volcanics, marita dyson, stuart flanagan',
              },
            ]}
          >
            <html lang="en" />
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:500|Cinzel|Montserrat"
              rel="stylesheet"
            />
          </Helmet>
          <LocationProvider>
            {({ location }) => <Background location={location} />}
          </LocationProvider>
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </>
      );
    }}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
