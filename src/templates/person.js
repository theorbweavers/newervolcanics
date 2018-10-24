import React from 'react';
import { graphql } from 'gatsby';

import * as PropTypes from 'prop-types';

import Article from '../components/article';
import Layout from '../components/layout';

const propTypes = {
  data: PropTypes.object.isRequired,
};

class PersonTemplate extends React.Component {
  render() {
    const data = this.props.data.contentfulPerson;
    return (
      <Layout>
        <Article>
          <h1>{data.name}</h1>
          {data.group && (
            <ul>
              {data.group.map(group => (
                <li>{group.title}</li>
              ))}
            </ul>
          )}
        </Article>
      </Layout>
    );
  }
}

PersonTemplate.propTypes = propTypes;

export default PersonTemplate;

export const personQuery = graphql`
  query personQuery($id: String!) {
    contentfulPerson(id: { eq: $id }) {
      id
      slug
      name
      group {
        id
        slug
        title
      }
    }
  }
`;
