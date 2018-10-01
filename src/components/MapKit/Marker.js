// @flow

import * as React from 'react';

import { MapKitContext } from './index';

class Marker extends React.Component {
  marker;

  getMarkerConstructionProps = props => {
    const { map, latitude, longitude, ...otherProps } = props;

    return otherProps;
  };

  constructor(props) {
    super(props);

    const markerProps = this.getMarkerConstructionProps(props);

    this.marker = new window.mapkit.MarkerAnnotation(
      new window.mapkit.Coordinate(props.latitude, props.longitude),
      markerProps
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
