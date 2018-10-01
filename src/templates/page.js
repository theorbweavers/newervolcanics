import React from 'react';
import { graphql } from 'gatsby';

import Link from 'gatsby-link';
import * as PropTypes from 'prop-types';

import Article from '../components/article';
// import ContentTypes from '../components/content-types'
import Collection from '../components/collection';

const propTypes = {
  data: PropTypes.object.isRequired,
};

class PageTemplate extends React.Component {
  render() {
    const data = this.props.data.contentfulPage;
    // let ContentIndex = ContentTypes[data.index];
    console.log('Props Data', this.props);
    return (
      <div>
        <Article data={data} />
        {/* { ContentIndex &&
          <ContentIndex />
        } */}
      </div>
    );
  }
}

PageTemplate.propTypes = propTypes;

export default PageTemplate;

export const pageQuery = graphql`
  query pageQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      slug
      title {
        title
      }
    }
  }
`;
