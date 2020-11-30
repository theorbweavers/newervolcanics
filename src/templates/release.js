import React from 'react';
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
import { MapKit, Marker } from '../components/MapKit';
import * as PropTypes from 'prop-types';
import Article from '../components/article';
import Layout from '../components/layout';
import RecordingItem from '../components/RecordingItem';
import ReactDOMServer from 'react-dom/server';
import styles from './mapkit.module.css';

const propTypes = {
  data: PropTypes.object.isRequired,
};

const ReleaseTemplate = ({ data }) => {
  const release = data.contentfulRelease;
  const recordings = release.recordings;

  return (
    <Layout>
      <Article>
        <h1>{release.title.title}</h1>
        {release.body && (
          <div
            dangerouslySetInnerHTML={{
              __html: release.body.childMarkdownRemark.html,
            }}
          />
        )}
        <p>&nbsp;</p>
        <h2>Newer Volcanics: Song Lyrics</h2>
        <MapKit
          style={{ width: '100%', height: '400px', marginBottom: '2rem' }}
          tokenOrCallback="eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkJZNU5VNzRMRzkifQ.eyJpc3MiOiJBNVJMUDgyRDdDIiwiaWF0IjoxNTU2NjE1ODM3LjA4MywiZXhwIjoxNTcyMzk0NjM3LjA4M30.TzMjpwPV_LSbND6uajKoNe1V8oC3S_bt3CC5zvbXXXjKwIO6Bshferq61Fyio6tVkNlAyImt_DN5PvK5Z3U7Lg"
          mapType="satellite"
          showsUserLocationControl
          defaultCenter={[-37.816121, 144.917324]}
        >
          {recordings &&
            recordings.map((item, index) => {
              item.trackNumber = index + 1;

              if (item.location)
                return (
                  <Marker
                    key={index}
                    latitude={item.location.lat}
                    longitude={item.location.lon}
                    title={`${item.trackNumber}. ${item.title.title}`}
                    color={'#232B76'}
                    data={item}
                    calloutElement={
                      release.showAudio ? calloutElement : calloutElementAnchor
                    }
                  />
                );
            })}
        </MapKit>
      </Article>
      {recordings &&
        recordings.map((item, index) => (
          <RecordingItem
            key={`recording_${index}`}
            item={item}
            trackNumber={index + 1}
            showAudio={release.showAudio}
          />
        ))}
    </Layout>
  );
};

const calloutElement = annotation => {
  const data = annotation.data;
  const markup = ReactDOMServer.renderToStaticMarkup(
    <div className={styles.callout}>
      <h4>
        <Link to={`/recording/${data.slug}.html`}>
          {data.trackNumber}. {data.title.title}
        </Link>
      </h4>
    </div>
  );

  // TODO: Has to be memory intensive
  const parser = new DOMParser();
  const parsed = parser.parseFromString(markup, 'text/html');
  return parsed.body.firstChild;
};
const calloutElementAnchor = annotation => {
  const data = annotation.data;
  const markup = ReactDOMServer.renderToStaticMarkup(
    <div className={styles.callout}>
      <h4>
        <a href={`#${data.slug}`}>
          {data.trackNumber}. {data.title.title}
        </a>
      </h4>
    </div>
  );
  // TODO: Has to be memory intensive
  const parser = new DOMParser();
  const parsed = parser.parseFromString(markup, 'text/html');
  return parsed.body.firstChild;
};
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
      body {
        childMarkdownRemark {
          html
        }
      }
      showAudio
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
      }
    }
  }
`;
