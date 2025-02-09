import React from "react";

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-1 bg-white shadow-md border-b-[0.15vw] border-b-black">
            <div className="w-screen flex justify-between h-[6.5vw] items-center px-[4vw]">
                {/* Logo */}
                <div className="h-full font-poppins font-bold text-[#005F73] flex items-center">
                    <img className="w-[25vw]" src="/images/logo-gamaforce.png" alt="logo-gamaforce" />
                </div>
                
                {/* Menu Items */}
                <ul className="font-montserrat font-medium flex items-center cursor-pointer gap-x-[3vw]">
                    <li>
                        <a href="https://gamaforce.wg.ugm.ac.id/">Home</a>
                    </li>
                    <li>
                        <a href="https://gamaforce.wg.ugm.ac.id/about-us/">Profile</a></li>
                    <li>
                        <a href="https://gamaforce.wg.ugm.ac.id/subteam/">Subteam</a>
                    </li>
                    <li>
                       <a href="https://gamaforce.wg.ugm.ac.id/achievements/">
                       Achievements
                       </a> 
                    </li>
                    <li>
                       <a href="https://gamaforce.wg.ugm.ac.id/contact-us-2023/">
                       Contact Us
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
