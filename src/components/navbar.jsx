import React from "react";
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
    return(
        <div className="w-screen flex justify-between h-[6.5vw] bg-[#ffffff] border-b-black border-b-[0.15vw]">
            <div className="h-full font-poppins font-bold text-[#005F73] flex justify-start items-center">
                <img className="w-[25vw]" src="/images/logo-gamaforce.png" alt="logo-gamaforce" />
            </div>
            <ul className="h-full font-montserrat font-medium flex justify-end items-center cursor-pointer gap-x-[3vw] mr-[4vw]">
                <li>Home</li>
                <li>Profile</li>
                <li>Subteam</li>
                <li>Achievements</li>
                <li>Contact Us</li>
            </ul>
        </div>
    )
}

export default Navbar;