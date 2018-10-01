import React from 'react';
import { MapKit, Marker } from '../components/MapKit';
import * as PropTypes from 'prop-types';
import Article from '../components/article';
import Layout from '../components/layout';
import RecordingItem from '../components/RecordingItem';

const propTypes = {
  data: PropTypes.object.isRequired,
};

class ReleaseTemplate extends React.Component {
  render() {
    const data = this.props.data.contentfulRelease;
    const recordings = data.recordings;

    return (
      <Layout>
        <Article>
          <h1>{data.title.title}</h1>
          <MapKit
            style={{ width: '100%', height: '400px', marginBottom: '2rem' }}
            tokenOrCallback="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZYVDc3QjJLVUMifQ.eyJpc3MiOiJBNVJMUDgyRDdDIiwiaWF0IjoxNTM4MTQzNzgzLjkzNiwiZXhwIjoxNTUzOTIyNTgzLjkzNn0.9hT8_bTzvzAVQbfNH4Yn31asFO1kpSKFs9i9RTHKTHjZWDkPfXzCZnyjUA6o-JqB14K1X9ML_4H4amDT0DY4tg"
            defaultCenter={[-37.803044286771524, 144.92947483383796]}
          >
            {recordings &&
              recordings.map(
                (item, index) =>
                  item.location && (
                    <Marker
                      key={index}
                      latitude={item.location.lat}
                      longitude={item.location.lon}
                      title={item.title.title}
                    />
                  )
              )}
          </MapKit>
        </Article>
        {recordings &&
          recordings.map((item, index) => (
            <RecordingItem
              key={`recording_${index}`}
              item={item}
              trackNumber={index + 1}
            />
          ))}
      </Layout>
    );
  }
}

ReleaseTemplate.propTypes = propTypes;

export default ReleaseTemplate;

export const releaseQuery = graphql`
  query releaseQuery($id: String!) {
    contentfulRelease(id: { eq: $id }) {
      id
      slug
      title {
        title
      }
      linerNotes {
        childMarkdownRemark {
          html
        }
      }
      recordings {
        id
        slug
        title {
          title
        }
        lyrics {
          lyrics
        }
        audio {
          id
          file {
            url
          }
        }
        location {
          lat
          lon
        }
      }
    }
  }
`;
