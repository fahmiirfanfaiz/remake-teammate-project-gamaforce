import React, { useState } from "react";

const Button = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="    flex flex-col z-10">
      {/* Button */}
      <button
        className="absolute bg-white font-montserrat font-bold bottom-0 left-1/2 -translate-x-1/2 w-[13vw] h-[4vw] mb-[3vw] text-center border-black border-2 rounded-[2vw] cursor-pointer z-10"
        onClick={() => setShowPopup(!showPopup)} 
      >
        Plan Mission
      </button>

      {/* Dua kotak yang muncul saat tombol ditekan */}
      {showPopup && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 z-10">
          <div className="w-[10vw] h-[10vw] bg-white border-2 border-black"></div>
          <div className="w-[10vw] h-[10vw] bg-white border-2 border-black"></div>
        </div>
      )}
    </div>
  );
};

export default Button;