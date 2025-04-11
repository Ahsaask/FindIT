import React from 'react'
import Image from "next/image";
import './components.css';
import logo from '../../../assets/FindItLogo.png';
import profile from '../../../assets/tracySmith.jpeg'

import { FaRegBell } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="px-10 py-2 shadow-sm">
        <div className='inline-flex gap-2'>
            <Image src={logo} alt="Logo" className='logo' width={30} height={30}/>
            <p className="font-semibold text-xl">FindIT</p>
        </div>
        <div className='inline-flex items-center gap-3'>
            <FaRegBell/>
            {/* Template Profile Pick */}
            <Image src={profile} alt='Profile Picture' className=" w-10 h-10 rounded-full object-cover" />
        </div>
    </nav>

  );
}

