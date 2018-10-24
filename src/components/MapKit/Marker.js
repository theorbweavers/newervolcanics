// @flow

import * as React from 'react';

import { MapKitContext } from './index';

const landmarkAnnotationCallout = {
  calloutAnchorOffsetForAnnotation: function(annotation, element) {
    return new DOMPoint(7, 7);
  },
  // calloutAppearanceAnimationForAnnotation: function(annotation) {
  //   return 'scale-and-fadein .4s 0 1 normal cubic-bezier(0.4, 0, 0, 1.5)';
  // },
};

class Marker extends React.Component {
  marker;

  getMarkerConstructionProps = props => {
    const { map, latitude, longitude, ...otherProps } = props;

    return otherProps;
  };

  constructor(props) {
    super(props);
    const { map, latitude, longitude, calloutElement, ...otherProps } = props;
    if (calloutElement) {
      landmarkAnnotationCallout.calloutElementForAnnotation = calloutElement;
    }
    this.marker = new window.mapkit.MarkerAnnotation(
      new window.mapkit.Coordinate(props.latitude, props.longitude),
      { ...otherProps, callout: landmarkAnnotationCallout }
    );
    this.props.map.addAnnotation(this.marker);
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.latitude !== nextProps.latitude ||
      this.props.longitude !== nextProps.longitude
    ) {
      this.marker.coordinate = new window.mapkit.Coordinate(
        nextProps.latitude,
        nextProps.longitude
      );
    }

    const markerProps = this.getMarkerConstructionProps(nextProps);

    Object.keys(markerProps).forEach(key => {
      this.marker[key] = markerProps[key];
    });

    return false;
  }

  render() {
    return null;
  }
}

export default props => (
  <MapKitContext.Consumer>
    {map => <Marker {...props} map={map} />}
  </MapKitContext.Consumer>
);
