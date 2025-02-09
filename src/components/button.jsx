import React, { useState } from "react";

const Button = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center">
      {/* Button */}
      <button
        className="absolute bg-white font-montserrat font-bold bottom-0 left-1/2 -translate-x-1/2 w-[13vw] h-[4vw] mb-[4vw] text-center border-black border-2 rounded-[2vw] cursor-pointer"
        onClick={() => setShowPopup(!showPopup)} // Toggle state
      >
        Plan Mission
      </button>

      {/* Dua kotak yang muncul saat tombol ditekan */}
      {showPopup && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <div className="w-[10vw] h-[10vw] bg-blue-500 border-2 border-black"></div>
          <div className="w-[10vw] h-[10vw] bg-red-500 border-2 border-black"></div>
        </div>
      )}
    </div>
  );
};

export default Button;
