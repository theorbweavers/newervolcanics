import React from 'react';
import { graphql } from 'gatsby';

import * as PropTypes from 'prop-types';

import Article from '../components/article';
import Layout from '../components/layout';

const propTypes = {
  data: PropTypes.object.isRequired,
};

const PeopleTemplate = ({ data }) => {
  const pageData = data.contentfulPage;
  const groupData = data.allContentfulGroup.edges;
  console.log({ data });
  return (
    <Layout>
      <Article>
        <h1>{pageData.title.title}</h1>
        {groupData &&
          groupData.map(node => {
            const group = node.node;
            return (
              <section>
                <h2>{group.title}</h2>
                <p>group bio</p>
                {group.people && (
                  <ul>
                    {group.people.map(
                      person =>
                        console.log({ person }) || <li>{person.name}</li>
                    )}
                  </ul>
                )}
              </section>
            );
          })}
      </Article>
    </Layout>
  );
};

PeopleTemplate.propTypes = propTypes;

export default PeopleTemplate;

export const peoplePageQuery = graphql`
  query peoplePageQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      slug
      title {
        title
      }
    }
    allContentfulGroup(sort: { fields: [sort], order: ASC }) {
      edges {
        node {
          id
          slug
          title
          people {
            name
          }
        }
      }
    }
  }
`;
