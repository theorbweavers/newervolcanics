import React from 'react';
import { graphql } from 'gatsby';

import * as PropTypes from 'prop-types';

import Article from '../components/Article';
import Layout from '../components/Layout';

const propTypes = {
  data: PropTypes.object.isRequired,
};

class PageTemplate extends React.Component {
  render() {
    const data = this.props.data.contentfulPage;

    return (
      <Layout>
        <Article>
          <h1>{data.title.title}</h1>
          {data.body && (
            <div
              dangerouslySetInnerHTML={{
                __html: data.body.childMarkdownRemark.html,
              }}
            />
          )}
        </Article>
      </Layout>
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
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
