import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import Button from "./button";

const DefaultMap = () => {
  const mapRef = useRef(null);
  const [waypoints, setWaypoints] = useState([]); // Simpan koordinat

  useEffect(() => {
    const centerUgm = [-7.770204, 110.377873]; // ✅ Pindahkan deklarasi ke luar if
  
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
  
      // ✅ Tambahkan Logo UGM di tengah (pindahkan ke dalam if agar `map` tersedia)
      const ugmIcon = L.icon({
        iconUrl: "/images/logo-ugm.png", // Path gambar UGM (Pastikan ada di public/)
        iconSize: [50, 50], // Ukuran ikon (sesuai kebutuhan)
        iconAnchor: [25, 25], // Posisi anchor agar ikon di tengah titik koordinat
        popupAnchor: [0, -25], // Agar popup muncul di atas ikon
      });
  
      L.marker(centerUgm, { icon: ugmIcon })
        .addTo(map)
        .bindPopup("Universitas Gadjah Mada 🎓");
  
      console.log("✅ Logo UGM ditambahkan di koordinat:", centerUgm);
    }
  }, []); // ✅ Pastikan `useEffect` ditutup dengan benar  

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

  console.log("🛠 Mengirim saveMission ke Button:", saveMission); // Debugging

  return (
    <div className="relative">
      {/* 🌍 Peta */}
      <div ref={mapRef} className="absolute top-[6.5vw] left-0 w-screen h-[calc(100vh-6.5vw)] z-10"></div>

      {/* ✅ Pastikan Button ada di sini */}
      <Button onSaveMission={saveMission} />
    </div>
  );
};

export default DefaultMap;
