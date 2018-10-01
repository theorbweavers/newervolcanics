import React from 'react';

import styles from './article.module.css';

const Article = ({ children }) => (
  <article className={styles.article}>
    <div className={styles.content}>{children}</div>
  </article>
);

export default Article;
