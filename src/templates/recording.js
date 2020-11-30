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
      <Layout headless>
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
          {data.image && (
            <div>
              <img
                id={data.image.id}
                style={{ width: '100%' }}
                src={data.image.file.url}
              />
            </div>
          )}
          {data.scores &&
            data.scores.map((item, index) => (
              <div key={`${item.id}-${index}`}>
                <a id={item.id} href={item.file.url} target="_blank">
                  🎼 Download {item.title} [PDF]
                </a>
              </div>
            ))}
          {data.lyrics && (
            <div>
              <pre>{data.lyrics.lyrics}</pre>
            </div>
          )}
          {data.location && (
            <div>
              <MapKit
                style={{ width: '100%', height: '400px' }}
                tokenOrCallback="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkJZNU5VNzRMRzkifQ.eyJpc3MiOiJBNVJMUDgyRDdDIiwiaWF0IjoxNTU2NjE1ODM3LjA4MywiZXhwIjoxNTcyMzk0NjM3LjA4M30.TzMjpwPV_LSbND6uajKoNe1V8oC3S_bt3CC5zvbXXXjKwIO6Bshferq61Fyio6tVkNlAyImt_DN5PvK5Z3U7Lg"
                mapType="satellite"
                showsUserLocationControl
                defaultCenter={[data.location.lat, data.location.lon]}
              >
                <Marker
                  latitude={data.location.lat}
                  longitude={data.location.lon}
                  title={data.title.title}
                  color={'#232B76'}
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
      image {
        id
        title
        file {
          url
        }
      }
      scores {
        id
        title
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
