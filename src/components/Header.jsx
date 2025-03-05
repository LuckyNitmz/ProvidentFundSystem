import React, { useState } from 'react';
import EPFO from '../assets/images/login.png'; // Add the correct path to your logo
import G2bharat from '../assets/images/G2bharat1.png'; // Add the correct path to your logo

export const Header = () => {
    const [fontSize, setFontSize] = useState(16);
  
    const increaseFontSize = () => setFontSize(fontSize + 2);
    const decreaseFontSize = () => setFontSize(fontSize - 2);
    const resetFontSize = () => setFontSize(16);
  
    return (
      <div className="bg-[#e3eaf1] flex py-10 px-5">
        {/* Font Resizer */}
        <div className="fixed top-0 right-0 flex items-center w-full bg-gray-400 p-2">
          <div className="text-[#2d7474] font-semibold w-[20vw]">Screen Reader Access</div>
          <div className="flex ml-auto space-x-2">
            <button
              className="bg-white border border-[#004d99] py-1 px-2 cursor-pointer"
              onClick={decreaseFontSize}
            >
              A-
            </button>
            <button
              className="bg-white border border-[#004d99] py-1 px-2 cursor-pointer"
              onClick={resetFontSize}
            >
              A
            </button>
            <button
              className="bg-white border border-[#004d99] py-1 px-2 cursor-pointer"
              onClick={increaseFontSize}
            >
              A+
            </button>
          </div>
        </div>
  
        {/* Left Header */}
        <div className="flex items-center w-[60%]">
          <div className="mr-10">
            <img src={EPFO} alt="EPFO Logo" className="w-20 h-auto" />
          </div>
          <div className="text-left">
            <h4 className="text-[#108888] text-lg font-bold">EMPLOYEES' PROVIDENT FUND ORGANISATION, INDIA</h4>
            <h6 className="text-[#c05d27]">MINISTRY OF LABOUR & EMPLOYMENT, GOVERNMENT OF INDIA</h6>
          </div>
        </div>
  
        {/* Right Header */}
        <div className="flex items-center w-[40%] justify-end">
          <div className="text-right mr-10">
            <h4 className="text-[#108888] text-lg font-bold">Universal Account<br />Number (UAN)</h4>
            <h5 className="text-[#c05d27]">MEMBER e-SEWA</h5>
          </div>
          <div>
            <img src={G2bharat} alt="G2bharat Logo" className="w-20 h-auto" />
          </div>
        </div>
      </div>
    );
}
