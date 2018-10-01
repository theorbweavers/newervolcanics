import React from 'react';
import { graphql } from 'gatsby';

import Link from 'gatsby-link';
import * as PropTypes from 'prop-types';

import Article from '../components/article';

const propTypes = {
  data: PropTypes.object.isRequired,
};

class PostTemplate extends React.Component {
  render() {
    console.log('Test', this.props);
    const data = this.props.data.contentfulPost;
    return <Article data={data} />;
  }
}

PostTemplate.propTypes = propTypes;

export default PostTemplate;

export const postQuery = graphql`
  query postQuery($id: String!) {
    contentfulPost(id: { eq: $id }) {
      id
      slug
      title {
        title
      }
    }
  }
`;
