import React from 'react';
// import styles from "./style"

const ArticleHeader = ({ data }) => (
  <div>
    <time className="time" />
    <h1 className="post-name title-minimal">{data.title.title}</h1>
  </div>
);

export default ArticleHeader;
