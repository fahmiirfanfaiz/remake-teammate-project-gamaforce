import React from "react";
import { useState, useEffect } from "react";

const Button = () => {
  return (
    <div className="relative w-screen h-screen">
        <button className="absolute bg-white font-montserrat font-bold bottom-0 left-1/2 -translate-x-1/2 w-[13vw] h-[4vw] mb-[4vw] text-center border-black border-2 rounded-[2vw] cursor-pointer">
        Plan Mission
        </button>
    </div>
  );
};

export default Button;
