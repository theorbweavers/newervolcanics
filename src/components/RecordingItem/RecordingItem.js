import React from 'react';
import Link from 'gatsby-link';

import styles from './recording-item.module.css';
import Article from '../article';

const ReleaseItem = ({ trackNumber, item }) => {
  return (
    <>
      <heading className={styles.heading}>
        <div className={styles.trackNumber}>{trackNumber}</div>
      </heading>
      <Article>
        <h2 class={styles.title}>
          <Link to={`/recording/${item.slug}.html`}>{item.title.title}</Link>
        </h2>
        {item.audio && (
          <div>
            <audio
              id={item.audio.id}
              style={{ width: '100%', height: '3rem' }}
              src={item.audio.file.url}
              controls
            />
          </div>
        )}
        {item.lyrics && (
          <div>
            <pre>{item.lyrics.lyrics}</pre>
          </div>
        )}
      </Article>
    </>
  );
};

export default ReleaseItem;
