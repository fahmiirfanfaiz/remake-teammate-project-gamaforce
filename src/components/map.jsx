import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import Button from "./button"; // Pastikan button di-import

const DefaultMap = () => {
  const mapRef = useRef(null);
  const [waypoints, setWaypoints] = useState([]); 

  useEffect(() => {
    if (mapRef.current && !mapRef.current._leaflet_id) {
      const map = L.map(mapRef.current, { zoomControl: false }).setView(
        [-7.769961708941515, 110.37822795057816],
        18
      );

      L.control.zoom({ position: "topright" }).addTo(map);

      setTimeout(() => {
        const zoomControl = document.querySelector(".leaflet-control-zoom");
        if (zoomControl) {
          zoomControl.classList.add("absolute", "top-[230px]", "right-0.8"); // Move it down
        }
      }, 100); // Delay to ensure Leaflet has rendered

      // Add Tile Layer (Satellite View)
      L.tileLayer(
        "https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=05qVMP6EtS9y6nQdaj4j",
        {
          attribution:
            '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(map);

      const markerIcon = new L.icon({
        iconUrl: "/images/logo-ugm.png",
        iconSize: [45, 45],
      });

      L.marker([-7.770067301994683, 110.37804717111858], { icon: markerIcon })
        .addTo(map);

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
          allowIntersection: false,
        },
        edit: {
          featureGroup: drawnItems,   
        },
      });

      map.addControl(drawControl);

      // Event ketika user menggambar rute baru
      map.on(L.Draw.Event.CREATED, function (e) {
        const layer = e.layer;
        drawnItems.addLayer(layer);

        // Ambil koordinat dari layer yang dibuat
        const geoJsonData = layer.toGeoJSON();
        const coordinates = geoJsonData.geometry.coordinates;

        console.log("📍 Koordinat rute:", coordinates);
        setWaypoints(coordinates); // Simpan koordinat ke state
      });
    }
  }, []);

  // Fungsi untuk menyimpan misi ke backend
  const saveMission = async (missionName) => {
    if (!missionName || waypoints.length === 0) {
      alert("⚠️ Masukkan nama misi dan buat rute di peta terlebih dahulu!");
      return;
    }

    const missionData = {
      name: missionName,
      waypoints: waypoints,
    };

    try {
      const response = await fetch("http://localhost:5001/missions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(missionData),
      });

      if (!response.ok) throw new Error("❌ Gagal menyimpan misi!");

      const data = await response.json();
      console.log("✅ Mission saved:", data);
      alert("🎯 Misi berhasil disimpan!");

      setWaypoints([]); // Reset waypoints setelah disimpan
    } catch (error) {
      console.error("❌ Error saving mission:", error);
      alert("⚠️ Terjadi kesalahan saat menyimpan misi");
    }
  };

  return (
    <div className="relative">
      <div ref={mapRef} className="absolute top-[6.5vw] left-0 w-screen h-[calc(100vh-6.5vw)] z-10"></div>

      {/* Kirim fungsi saveMission sebagai props ke Button */}
      <Button onSaveMission={saveMission} />
    </div>
  );
};

export default DefaultMap;