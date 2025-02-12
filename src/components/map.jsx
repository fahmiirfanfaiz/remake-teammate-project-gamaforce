import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import Button from "./button";

const DefaultMap = () => {
  const mapRef = useRef(null);
  const [waypoints, setWaypoints] = useState([]); // Simpan koordinat
  const drawnLayerRef = useRef(null); // Ref untuk layer yang menggambar misi

  useEffect(() => {
    const centerUgm = [-7.770204, 110.377873];
  
    if (mapRef.current && !mapRef.current._leaflet_id) {
      const map = L.map(mapRef.current, { zoomControl: false }).setView(centerUgm, 18);
  
      L.control.zoom({ position: "topright" }).addTo(map);
  
      L.tileLayer(
        "https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=05qVMP6EtS9y6nQdaj4j",
        {
          attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(map);
  
      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);
  
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
  
      map.on(L.Draw.Event.CREATED, function (e) {
        const layer = e.layer;
        drawnItems.addLayer(layer);
  
        const geoJsonData = layer.toGeoJSON();
        const coordinates = geoJsonData.geometry.coordinates;
  
        console.log("📍 Koordinat rute:", coordinates);
        setWaypoints(coordinates); // Simpan koordinat ke state
      });
  
      
      const ugmIcon = L.icon({
        iconUrl: "/images/logo-ugm.png", 
        iconSize: [50, 50], 
        iconAnchor: [25, 25], // Posisi anchor agar ikon di tengah titik koordinat
        popupAnchor: [0, -25], // Agar popup muncul di atas ikon
      });
  
      L.marker(centerUgm, { icon: ugmIcon })
        .addTo(map)
        .bindPopup("Universitas Gadjah Mada 🎓");
  
      console.log("✅ Logo UGM ditambahkan di koordinat:", centerUgm);
    }
  }, []); 

  // ✅ Definisikan fungsi saveMission
  const saveMission = async (missionName) => {
    if (!missionName || waypoints.length === 0) {
      alert("⚠️ Masukkan nama misi dan buat rute di peta terlebih dahulu!");
      return;
    }

    const missionData = {
      name: missionName,
      waypoints: waypoints,
    };

    console.log("🚀 Mengirim data ke backend:", missionData);

    try {
      const response = await fetch("http://localhost:5001/missions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(missionData),
      });

      if (!response.ok) throw new Error("❌ Gagal menyimpan misi");

      const data = await response.json();
      console.log("✅ Mission saved:", data);
      alert("🎯 Misi berhasil disimpan!");

      setWaypoints([]); // Reset setelah disimpan
    } catch (error) {
      console.error("❌ Error saving mission:", error);
      alert("⚠️ Terjadi kesalahan saat menyimpan misi");
    }
  };

  // ✅ Fungsi untuk memuat misi ke peta
  const loadMission = (waypoints) => {
    if (!mapRef.current) return;

    // 🔥 Konversi koordinat agar cocok dengan Leaflet (lat, lng → lng, lat)
    const convertedWaypoints = waypoints.map(([lat, lng]) => [lng, lat]);

    // Hapus layer sebelumnya jika ada
    if (drawnLayerRef.current) {
      mapRef.current.removeLayer(drawnLayerRef.current);
    }

    // Buat polyline baru dengan koordinat misi yang diklik
    const polyline = L.polyline(convertedWaypoints, { color: "red", weight: 4 }).addTo(mapRef.current);
    drawnLayerRef.current = polyline;

    // Zoom ke rute misi
    mapRef.current.fitBounds(polyline.getBounds());

    console.log("✅ Misi dimuat di peta:", convertedWaypoints);
  };

  console.log("🛠 Mengirim saveMission ke Button:", saveMission); // Debugging

  return (
    <div className="relative">
      {/* 🌍 Peta */}
      <div ref={mapRef} className="absolute top-[6.5vw] left-0 w-screen h-[calc(100vh-6.5vw)] z-10"></div>

      {/* ✅ Pastikan Button ada di sini */}
      <Button />
    </div>
  );
};

export default DefaultMap;
