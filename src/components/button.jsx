import React, { useState } from "react";

const Button = ({ onSaveMission }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [missionName, setMissionName] = useState("");

  console.log("🛠 onSaveMission di Button:", onSaveMission); // Debugging

  const handleSave = () => {
    if (!missionName) {
      alert("⚠️ Masukkan nama misi terlebih dahulu!");
      return;
    }

    console.log("🛠 Memanggil onSaveMission() dengan nama misi:", missionName);

    if (typeof onSaveMission === "function") {
      onSaveMission(missionName); // Pastikan hanya memanggil jika ada
    } else {
      console.error("❌ ERROR: onSaveMission bukan fungsi!", onSaveMission);
    }

    setShowPopup(false);
    setMissionName(""); // Reset input setelah disimpan
  };

  return (
    <div className="relative z-20">
      {/* ✅ Tombol Plan Mission */}
      <button
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-black font-bold px-6 py-3 rounded-full border-2 border-black shadow-md cursor-pointer hover:bg-gray-200 transition duration-300"
        onClick={() => setShowPopup(!showPopup)}
      >
        Plan Mission
      </button>

      {/* Popup untuk input nama misi */}
      {showPopup && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white p-4 border rounded shadow-lg flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nama Misi"
            className="border p-2 focus:outline-none focus:ring focus:border-blue-300"
            value={missionName}
            onChange={(e) => setMissionName(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded transition duration-300"
          >
            Simpan Misi
          </button>
        </div>
      )}
    </div>
  );
};

export default Button;
