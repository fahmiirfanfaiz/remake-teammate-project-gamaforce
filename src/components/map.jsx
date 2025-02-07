import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const DefaultMap = () => {
  const [center, setCenter] = useState({ lat: -7.769961708941515, lng: 110.37822795057816 });
  const ZoomLevel = 18;
  const mapRef = useRef();
  const [geoJSONData, setGeoJSONData] = useState([]);

  // Handle layer creation (polygon, marker, etc.)
  const _onCreated = (e) => {
    const { layerType, layer } = e;
    const { _leaflet_id } = layer;
    const newGeoJSON = layer.toGeoJSON();
    newGeoJSON.properties.id = _leaflet_id;
    setGeoJSONData((prev) => [...prev, newGeoJSON]);

    console.log("Created Layer:", newGeoJSON);
  };

  // Handle layer edits
  const _onEdited = (e) => {
    console.log("Layer edited:", e.layers.toGeoJSON());
  };

  // Handle layer deletion
  const _onDeleted = (e) => {
    console.log("Layer deleted:", e.layers.toGeoJSON());
  };

  return (
    <div className="relative">
      <MapContainer
        className="absolute top-[6.5vw] left-0 w-screen h-[calc(100vh-6.5vw)] z-0"
        center={center}
        zoom={ZoomLevel}
        ref={mapRef}
        scrollWheelZoom={true}
      >
        {/* FeatureGroup for editable layers */}
        <FeatureGroup>
          <EditControl
            position="bottomright"
            onCreated={_onCreated}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
            draw={{
              rectangle: true,
              circle: true,
              circlemarker: true,
              marker: true,
              polyline: true,
              polygon: true,
            }}
          />
        </FeatureGroup>

        {/* Base Map Tile */}
        <TileLayer
          url="https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=05qVMP6EtS9y6nQdaj4j"
          attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default DefaultMap;
