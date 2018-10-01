// @flow

import * as React from 'react';
import load from 'little-loader';
import { deltaFromZoomLevel } from './lib';

export const MapKitContext = React.createContext();

export default class MapKit extends React.Component {
  mapRef;
  map;

  static defaultProps = {
    mapType: 'standard',
    padding: 0,
    defaultZoom: 0,
    showsCompass: 'adaptive',
    showsMapTypeControl: true,
    showsZoomControl: true,
    showsUserLocationControl: false,
    showsPointsOfInterest: true,
    showsScale: 'hidden',
    animateViewChange: true,
    isRotationEnabled: true,
    isScrollEnabled: true,
    isZoomEnabled: true,
    showsUserLocation: false,
    tracksUserLocation: false,
    animateRotationChange: true,
  };

  state = { mapKitIsReady: false };

  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
  }

  componentDidMount() {
    load(
      'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js',
      () => this.initMap(this.props),
      this
    );
  }
  initMap = props => {
    const isCallback = props.tokenOrCallback.includes('/');

    // init mapkit
    window.mapkit.init({
      authorizationCallback: done => {
        if (isCallback) {
          fetch(props.tokenOrCallback)
            .then(res => res.text())
            .then(done);
        } else {
          done(props.tokenOrCallback);
        }
      },
    });

    // Create the 🗺️!
    if (this.mapRef.current)
      this.map = new window.mapkit.Map(this.mapRef.current);

    // Setup Default Map Options
    // in theory this should be possible to set via the above via:
    // https://developer.apple.com/documentation/mapkitjs/mapconstructoroptions
    // but it is not working as expected.
    //
    // radar: https://bugreport.apple.com/web/?problemID=41190232

    if (props.defaultRotation) this.map.rotation = props.defaultRotation;

    if (props.defaultMapRect) {
      try {
        this.map.visibleMapRect = this.createMapRect(
          props.defaultMapRect[0],
          props.defaultMapRect[1],
          props.defaultMapRect[2],
          props.defaultMapRect[3]
        );
      } catch (e) {
        console.warn(e.message);
      }
    } else {
      let mapCenter = this.createCoordinate(0, 0);
      let mapSpan;

      if (props.defaultCenter) {
        try {
          mapCenter = this.createCoordinate(
            props.defaultCenter[0],
            props.defaultCenter[1]
          );
          const currentZoomLevel = this.map._impl.zoomLevel;
          const zoomLevel = Math.min(11 - currentZoomLevel, 28);
          const delta = deltaFromZoomLevel(
            this.map,
            mapCenter,
            Math.round(zoomLevel)
          );
          const span = this.createCoordinateSpan(
            delta.latitudeDelta * 111,
            delta.longitudeDelta * 111
          );
          const region = this.createCoordinateRegion(mapCenter, span);
          this.map.setRegionAnimated(region);
        } catch (e) {
          console.warn(e.message);
        }

        if (props.defaultSpan) {
          try {
            mapSpan = this.createCoordinateSpan(
              props.defaultSpan[0],
              props.defaultSpan[1]
            );
          } catch (e) {
            console.warn(e.message);
          }
        }

        if (mapSpan) {
          // if we have a span we'll set a region
          this.map.region = this.createCoordinateRegion(mapCenter, mapSpan);
        } else {
          // otherwise we just set the center
          this.map.center = mapCenter;
        }
      }
    }

    // Set Other Props
    this.updateMapProps(props);

    this.setState({ mapKitIsReady: true });
  };

  updateMapProps = props => {
    this.map.showsMapTypeControl = props.showsMapTypeControl;
    this.map.mapType = props.mapType;
    this.map.padding = this.createPadding(props.padding);
    this.map.showsCompass = props.showsCompass;
    this.map.showsMapTypeControl = props.showsMapTypeControl;
    this.map.showsZoomControl = props.showsZoomControl;
    this.map.showsUserLocationControl = props.showsUserLocationControl;
    this.map.showsPointsOfInterest = props.showsPointsOfInterest;
    this.map.showsScale = props.showsScale;
    this.map.tintColor = props.tintColor;
    this.map.isRotationEnabled = props.isRotationEnabled;
    this.map.isScrollEnabled = props.isScrollEnabled;
    this.map.isZoomEnabled = props.isZoomEnabled;
    this.map.showsUserLocation = props.showsUserLocation;
    this.map.tracksUserLocation = props.tracksUserLocation;
  };

  createPadding = padding => {
    return new window.mapkit.Padding(
      typeof padding === 'number'
        ? { top: padding, right: padding, bottom: padding, left: padding }
        : padding
    );
  };

  createCoordinate = (latitude, longitude) => {
    return new window.mapkit.Coordinate(latitude, longitude);
  };

  createCoordinateSpan = (latitudeDelta, longitudeDelta) => {
    return new window.mapkit.CoordinateSpan(latitudeDelta, longitudeDelta);
  };

  createCoordinateRegion = (center, span) => {
    return new window.mapkit.CoordinateRegion(center, span);
  };

  createMapPoint = (x, y) => {
    return new window.mapkit.MapPoint(x, y);
  };

  createMapRect = (x, y, width, height) => {
    return new window.mapkit.MapRect(x, y, width, height);
  };

  shouldComponentUpdate(nextProps, nextState) {
    // for a lot of prop changes we're just making calls to mapKit so we have no need to re-render
    // let ComponentShouldUpdate = false
    //
    // // might be needed when we start adding markers, but for now not a thing we do
    // if (this.state.mapKitIsReady != nextState.mapKitIsReady) {
    //   ComponentShouldUpdate = true
    // }

    if (this.state.mapKitIsReady) {
      this.updateMapProps(nextProps);
    }

    return true;
  }

  componentWillUnmount() {
    this.map.destroy();
  }

  setRotation = rotation => {
    this.map.setRotationAnimated(rotation, this.props.animateRotationChange);
  };

  setCenter = ([lat, lng]) => {
    this.map.setCenterAnimated(
      this.createCoordinate(lat, lng),
      this.props.animateViewChange
    );
  };

  render() {
    const {
      tokenOrCallback,
      mapType,
      padding,
      showsCompass,
      showsMapTypeControl,
      showsZoomControl,
      showsUserLocationControl,
      showsPointsOfInterest,
      showsScale,
      tintColor,
      defaultCenter,
      defaultSpan,
      defaultMapRect,
      defaultRotation,
      animateViewChange,
      animateRotationChange,
      isRotationEnabled,
      isScrollEnabled,
      isZoomEnabled,
      showsUserLocation,
      tracksUserLocation,
      children,
      ...otherProps
    } = this.props;

    return (
      <div ref={this.mapRef} {...otherProps}>
        <MapKitContext.Provider value={this.map}>
          {this.state.mapKitIsReady &&
            (typeof children === 'function'
              ? children({
                  setRotation: this.setRotation,
                  setCenter: this.setCenter,
                })
              : children)}
        </MapKitContext.Provider>
      </div>
    );
  }
}
