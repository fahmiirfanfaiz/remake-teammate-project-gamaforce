import React, { use } from "react";
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const DefaultMap = () => {
    const [center, setCenter] = useState({lat: -7.769961708941515, lng: 110.37822795057816});
    const ZoomLevel = 18;
    const MapRef = useRef();
    return(
        <div className="row z-49">
            <div className="col">
                <MapContainer className="w-screen h-screen" center={center} zoom={ZoomLevel} ref={MapRef}>
                    <TileLayer
                    url="https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=05qVMP6EtS9y6nQdaj4j"
                    attribution={`&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`}
                    />
                </MapContainer>
            </div>
        </div>
    )
}

export default DefaultMap;