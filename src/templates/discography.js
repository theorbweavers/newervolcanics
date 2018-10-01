import React from 'react';
import { graphql } from 'gatsby';

import Link from 'gatsby-link';
import * as PropTypes from 'prop-types';

import Article from '../components/article';
import Collection from '../components/collection';

const propTypes = {
  data: PropTypes.object.isRequired,
};

class ReleasesPageTemplate extends React.Component {
  render() {
    const dataArticle = this.props.data.contentfulPage;
    const dataReleases = this.props.data.allContentfulRelease.edges;

    return (
      <div>
        <h1>RELEASES</h1>
        <Article data={dataArticle} />
      </div>
    );
  }
}

ReleasesPageTemplate.propTypes = propTypes;

export default ReleasesPageTemplate;

export const releasesPageQuery = graphql`
  query releasesPageQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      slug
      title {
        title
      }
    }
    allContentfulRelease(limit: 1000) {
      edges {
        node {
          id
          slug
          title {
            title
          }
        }
      }
    }
  }
`;
