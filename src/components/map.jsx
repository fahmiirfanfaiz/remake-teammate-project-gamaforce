import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

const DefaultMap = () => {
  const mapRef = useRef(null); // Reference for the map container

  useEffect(() => {
    // Ensure the map is only initialized once
    if (mapRef.current && !mapRef.current._leaflet_id) {
      const map = L.map(mapRef.current).setView([-7.769961708941515, 110.37822795057816], 18);

      // Add Tile Layer (Satellite View)
      L.tileLayer(
        "https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=05qVMP6EtS9y6nQdaj4j",
        {
          attribution:
            '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(map);

      // Initialize FeatureGroup for drawn items
      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      // Add Leaflet Draw Controls
      const drawControl = new L.Control.Draw({
        position: "bottomright",
        draw: {
          polygon: true,
          rectangle: true,
          circle: true,
          circlemarker: true,
          marker: true,
          polyline: true,
        },
        edit: {
          featureGroup: drawnItems, // Enable editing/deleting of drawn items
        },
      });

      map.addControl(drawControl);

      // Handle Creation of New Shapes
      map.on(L.Draw.Event.CREATED, function (e) {
        const layer = e.layer;
        drawnItems.addLayer(layer);
        console.log("Created Shape:", layer.toGeoJSON());
      });

      // Handle Editing of Shapes
      map.on(L.Draw.Event.EDITED, function (e) {
        console.log("Edited Shapes:", e.layers.toGeoJSON());
      });

      // Handle Deletion of Shapes
      map.on(L.Draw.Event.DELETED, function (e) {
        console.log("Deleted Shapes:", e.layers.toGeoJSON());
      });

      // Add Custom Marker
      const customIcon = L.icon({
        iconUrl: "/images/logo-ugm.png",
        iconSize: [50, 50],
        iconAnchor: [25, 50],
      });

      L.marker([-7.770717, 110.37779], { icon: customIcon }).addTo(map);
    }
  }, []); // Run once after the component mounts

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="absolute top-[6.5vw] left-0 w-screen h-[calc(100vh-6.5vw)] z-0"
      ></div>
    </div>
  );
};

export default DefaultMap;
