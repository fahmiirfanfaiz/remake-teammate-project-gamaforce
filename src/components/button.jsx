import React, { useState, useEffect } from "react";
import { FaPlane, FaTrash, FaEdit } from "react-icons/fa"; // Import ikon pesawat, hapus, edit

const Button = ({ onSaveMission }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [missionName, setMissionName] = useState("");
  const [showMissions, setShowMissions] = useState(false); // Tampilkan daftar misi
  const [missions, setMissions] = useState([]); // Simpan daftar misi

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

  // Ambil daftar misi dari backend saat showMissions = true
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch("http://localhost:5001/missions");
        if (!response.ok) throw new Error("Gagal mengambil data misi");

        const data = await response.json();
        setMissions(data);
      } catch (error) {
        console.error("❌ Error mengambil misi:", error);
      }
    };

    if (showMissions) {
      fetchMissions();
    }
  }, [showMissions]);

  return (
    <div className="relative z-20">
      {/* ✅ Tombol Plan Mission di Bawah */}
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

      {/* ✅ Tombol Pesawat (Top-Left) */}
      <div className="absolute top-30 left-4 z-[1000]">
        <button
          onClick={() => setShowMissions(!showMissions)}
          className="bg-white p-3 rounded-full shadow-lg flex items-center justify-center"
        >
          <FaPlane className="text-blue-500 text-3xl" />
        </button>

        {/* Popup Daftar Misi */}
        {showMissions && (
          <div className="absolute top-14 left-0 w-64 bg-white p-4 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-center">Saved Mission</h3>

            {missions.length === 0 ? (
              <p className="text-center text-gray-500 mt-2">No missions saved</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {missions.map((mission) => (
                  <li
                    key={mission.id}
                    className="flex items-center justify-between bg-gray-200 p-2 rounded-lg"
                  >
                    <span className="font-semibold">{mission.name}</span>
                    <div className="flex gap-2">
                      <button className="text-gray-600 hover:text-blue-500">
                        <FaEdit />
                      </button>
                      <button className="text-gray-600 hover:text-red-500">
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Button;
