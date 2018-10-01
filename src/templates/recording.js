import React from 'react';
import { graphql } from 'gatsby';
import { MapKit, Marker } from '../components/MapKit';
import Link from 'gatsby-link';
import * as PropTypes from 'prop-types';

import Article from '../components/article';
import Layout from '../components/layout';

const propTypes = {
  data: PropTypes.object.isRequired,
};

class RecordingTemplate extends React.Component {
  render() {
    const data = this.props.data.contentfulRecording;
    return (
      <Layout>
        <Article>
          <h1>{data.title.title}</h1>
          {data.release && (
            <section>
              <h3>Releases</h3>
              <ul>
                {data.release.map(releaseItem => (
                  <li>
                    <Link to={`/release/${releaseItem.slug}.html`}>
                      {releaseItem.title.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {data.audio && (
            <div>
              <audio
                id={data.audio.id}
                style={{ width: '100%', height: '3rem' }}
                src={data.audio.file.url}
                controls
              />
            </div>
          )}
          {data.lyrics && (
            <div>
              <pre>{data.lyrics.lyrics}</pre>
            </div>
          )}
          {data.location && (
            <div>
              <MapKit
                style={{ width: '100%', height: '400px' }}
                tokenOrCallback="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZYVDc3QjJLVUMifQ.eyJpc3MiOiJBNVJMUDgyRDdDIiwiaWF0IjoxNTM4MTQzNzgzLjkzNiwiZXhwIjoxNTUzOTIyNTgzLjkzNn0.9hT8_bTzvzAVQbfNH4Yn31asFO1kpSKFs9i9RTHKTHjZWDkPfXzCZnyjUA6o-JqB14K1X9ML_4H4amDT0DY4tg"
                defaultCenter={[data.location.lat, data.location.lon]}
              >
                <Marker
                  latitude={data.location.lat}
                  longitude={data.location.lon}
                  title={data.title.title}
                />
              </MapKit>
            </div>
          )}
        </Article>
      </Layout>
    );
  }
}

RecordingTemplate.propTypes = propTypes;

export default RecordingTemplate;

export const recordingQuery = graphql`
  query recordingQuery($id: String!) {
    contentfulRecording(id: { eq: $id }) {
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
      release {
        id
        slug
        title {
          title
        }
      }
    }
  }
`;
