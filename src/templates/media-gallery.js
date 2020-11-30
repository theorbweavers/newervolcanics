import React from 'react';
import { graphql } from 'gatsby';

import Link from 'gatsby-link';
import * as PropTypes from 'prop-types';

import Article from '../components/article';
import Layout from '../components/Layout';
import Gallery from 'react-grid-gallery';
const propTypes = {
  data: PropTypes.object.isRequired,
};

class ReleasesPageTemplate extends React.Component {
  render() {
    const createMediaGallery = images => {
      const gallery = [];
      images.forEach(image => {
        gallery.push({
          src: image.file.url,
          thumbnail: `${image.file.url}?fit=scale&w=300&h=200`,
        });
      });
      return gallery;
    };
    const dataGallery = this.props.data.contentfulMediaGallery;

    const IMAGES = createMediaGallery(dataGallery.media);
    return (
      <Layout>
        <Article>
          <h1>{dataGallery.title}</h1>
          <h2>{dataGallery.subtitle}</h2>
          {dataGallery.coverImage && (
            <img src={dataGallery.coverImage.file.src} alt="Cover Image" />
          )}
          {dataGallery.body && (
            <div
              dangerouslySetInnerHTML={{
                __html: dataGallery.body.childMarkdownRemark.html,
              }}
            />
          )}
          <Gallery images={IMAGES} />
        </Article>
      </Layout>
    );
  }
}

ReleasesPageTemplate.propTypes = propTypes;

export default ReleasesPageTemplate;

export const imageGalleryPageQuery = graphql`
  query imageGalleryPageQuery($id: String!) {
    contentfulMediaGallery(id: { eq: $id }) {
      id
      slug
      title
      body {
        childMarkdownRemark {
          html
        }
      }

      media {
        id
        title
        file {
          url
        }
      }
    }
  }
`;
