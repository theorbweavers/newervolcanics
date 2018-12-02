import React from 'react';
import { graphql } from 'gatsby';

import * as PropTypes from 'prop-types';

import Article from '../components/article';
import Layout from '../components/layout';

const propTypes = {
  data: PropTypes.object.isRequired,
};

class GroupTemplate extends React.Component {
  render() {
    const data = this.props.data.contentfulGroup;
    return (
      <Layout>
        <Article>
          <h1>{data.title}</h1>
          {data.people && (
            <ul>
              {data.people.map(
                person => console.log({ person }) || <li>{person.name}</li>
              )}
            </ul>
          )}
        </Article>
      </Layout>
    );
  }
}

GroupTemplate.propTypes = propTypes;

export default GroupTemplate;

export const groupQuery = graphql`
  query groupQuery($id: String!) {
    contentfulGroup(id: { eq: $id }) {
      id
      slug
      title
      people {
        id
        slug
        name
      }
    }
  }
`;
