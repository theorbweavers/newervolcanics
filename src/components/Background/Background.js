import React from 'react';
import PropTypes from 'prop-types';

import classNames from '@sindresorhus/class-names';

import styles from './background.module.css';

class Background extends React.Component {
  state = {
    backgroundPosition: 'center',
    fadeIn: false,
  };
  movementStrength = 100;
  componentDidMount() {
    this.height = this.movementStrength / window.innerHeight;
    this.width = this.movementStrength / window.innerWidth;
    setTimeout(() => {
      this.setState({ fadeIn: true });
    });
  }

  handleMouseMove = event => {
    if (!window) this.setState({ backgroundPosition: 'center' });

    const pageX = event.pageX - window.innerWidth / 2;
    const pageY = event.pageY - window.innerHeight / 2;
    const newvalueX = this.width * pageX * -1 - 25;
    const newvalueY = this.height * pageY * -1 - 50;
    const backgroundPosition = `${newvalueX}px ${newvalueY}px`;
    this.setState({ backgroundPosition });
  };

  getStyleObject = () => {
    return { backgroundPosition: this.state.backgroundPosition };
  };
  render() {
    return (
      <div
        className={classNames(
          { [styles.fadeIn]: this.state.fadeIn },
          styles.background
        )}
      />
    );
  }
}

Background.propTypes = {
  timeout: PropTypes.bool,
};

export default Background;
