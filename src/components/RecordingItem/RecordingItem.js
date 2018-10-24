import React from 'react';
import Link from 'gatsby-link';

import styles from './recording-item.module.css';
import Article from '../article';

const RecordingItem = ({ trackNumber, item, showAudio }) => {
  return (
    <>
      <a name={item.slug} />
      <header className={styles.heading}>
        <div className={styles.trackNumber}>{trackNumber}</div>
      </header>
      <Article>
        <h2 className={styles.title}>
          {showAudio ? (
            <Link to={`/recording/${item.slug}.html`}>{item.title.title}</Link>
          ) : (
            item.title.title
          )}
        </h2>
        {showAudio &&
          item.audio && (
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

export default RecordingItem;
