import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF} from "@react-google-maps/api";

const containerStyle = {
  height: "21vh",
  width: "100%",
  margin: "0 0 0 0",
};

const center = {
  lat: 41.0751038,
  lng: 29.0180003,
};

const apiKey = "AIzaSyBFqazvW4WBh_XnDcBET9SSjvwjL7EFJks";

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(17);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="col-lg-12">
      <div className="map_area">
        <GoogleMap mapContainerStyle={containerStyle} center={center} onLoad={onLoad} onUnmount={onUnmount}>
          <MarkerF position={center} icon={{ url: require("../../assets/img/inveshopmarker.png") }} label="InveShop"></MarkerF>
          <></>
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Map;
