import React, { useState } from "react";

const Button = ({ onSaveMission }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [missionName, setMissionName] = useState("");
  const [isSaving, setIsSaving] = useState(false); // Animasi tombol saat menyimpan
  const [message, setMessage] = useState(""); // Pesan sukses

  // Saat tombol "Simpan" ditekan
  const handleSave = async () => {
    if (!missionName) {
      alert("⚠️ Masukkan nama misi terlebih dahulu!");
      return;
    }

    setIsSaving(true); // Ubah tombol menjadi "Menyimpan..."
    await onSaveMission(missionName); // Simpan misi ke backend
    setIsSaving(false);
    setMessage("✅ Misi berhasil dibuat!"); // Tampilkan pesan sukses

    // Reset input setelah disimpan
    setTimeout(() => {
      setMessage("");
      setMissionName("");
      setShowPopup(false);
    }, 2000); // Pesan sukses akan hilang setelah 2 detik
  };

  return (
    <div className="flex flex-col z-10">
      {/* Tombol "Plan Mission" */}
      <button
        className="absolute bg-white font-montserrat font-bold bottom-0 left-1/2 -translate-x-1/2 
                   w-[13vw] h-[4vw] mb-[3vw] text-center border-black border-2 rounded-[2vw] 
                   cursor-pointer hover:bg-gray-200 transition duration-200"
        onClick={() => setShowPopup(!showPopup)}
      >
        Plan Mission
      </button>

      {/* Popup Input Nama Misi */}
      {showPopup && (
        <div className="absolute bottom-[8vw] left-1/2 -translate-x-1/2 bg-white p-4 border rounded shadow flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nama Misi"
            className="border p-2 focus:outline-none focus:ring focus:border-blue-300"
            value={missionName}
            onChange={(e) => setMissionName(e.target.value)}
          />

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 rounded text-white transition duration-300 
                        ${
                          isSaving
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 cursor-pointer active:bg-blue-700"
                        }`}
          >
            {isSaving ? "Menyimpan..." : "Simpan Misi"}
          </button>

          {/* Pesan Sukses */}
          {message && <p className="text-green-600 font-bold mt-2">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Button;
