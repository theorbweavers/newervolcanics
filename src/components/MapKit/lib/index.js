const mercadorRadius = 85445659.44705395;
const mercadorOffset = 268435456;

function longitudeToPixelSpaceX(longitude) {
  return Math.round(
    mercadorOffset + (mercadorRadius * longitude * Math.PI) / 180.0
  );
}

function latitudeToPixelSpaceY(latitude) {
  return Math.round(
    mercadorOffset -
      (mercadorRadius *
        Math.log(
          (1 + Math.sin((latitude * Math.PI) / 180.0)) /
            (1 - Math.sin((latitude * Math.PI) / 180.0))
        )) /
        2.0
  );
}

function pixelSpaceXToLongitude(pixelX) {
  return (
    (((Math.round(pixelX) - mercadorOffset) / mercadorRadius) * 180.0) / Math.PI
  );
}

function pixelSpaceYToLatitude(pixelY) {
  return (
    ((Math.PI / 2.0 -
      2.0 *
        Math.atan(
          Math.exp((Math.round(pixelY) - mercadorOffset) / mercadorRadius)
        )) *
      180.0) /
    Math.PI
  );
}

/**
 *
 * @param {object} map
 * @param {object} centerCoordinates
 * @param {number} zoomLevel
 */
export const deltaFromZoomLevel = (map, centerCoordinates, zoomLevel) => {
  // convert center coordiate to pixel space
  let centerPixelX = longitudeToPixelSpaceX(centerCoordinates.longitude);
  let centerPixelY = latitudeToPixelSpaceY(centerCoordinates.latitude);
  // determine the scale value from the zoom level
  let zoomExponent = 20 - zoomLevel;
  let zoomScale = Math.pow(2, zoomExponent);
  // scale the map’s size in pixel space
  let mapSizeInPixels = map.visibleMapRect.size;
  let scaledMapWidth = mapSizeInPixels.width * zoomScale;
  let scaledMapHeight = mapSizeInPixels.height * zoomScale;
  // figure out the position of the top-left pixel
  let topLeftPixelX = centerPixelX - scaledMapWidth / 2;
  let topLeftPixelY = centerPixelY - scaledMapHeight / 2;
  // find delta between left and right longitudes
  let minLng = pixelSpaceXToLongitude(topLeftPixelX);
  let maxLng = pixelSpaceXToLongitude(topLeftPixelX + scaledMapWidth);
  let longitudeDelta = maxLng - minLng;
  // find delta between top and bottom latitudes
  let minLat = pixelSpaceYToLatitude(topLeftPixelY);
  let maxLat = pixelSpaceYToLatitude(topLeftPixelY + scaledMapHeight);
  let latitudeDelta = -1 * (maxLat - minLat);
  // create and return the lat/lng span
  return {
    latitudeDelta,
    longitudeDelta,
  };
};
