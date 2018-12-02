import React from 'react';

import posed, { PoseGroup } from 'react-pose';

import styles from './background.module.css';

const RouteContainer = posed.div({
  enter: {
    opacity: 1,
    transition: { duration: 1000 },
    delay: 1000,
  },
  exit: { opacity: 0, transition: { duration: 1000 } },
});
const Background = ({ location }) => {
  return (
    <PoseGroup>
      <RouteContainer key={(location && location.key) || 'test'}>
        <div className={styles.background} />]
      </RouteContainer>
    </PoseGroup>
  );
};

export default Background;
