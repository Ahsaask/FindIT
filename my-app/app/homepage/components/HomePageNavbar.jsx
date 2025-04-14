import React from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import './components.css';
import logo from '../../../assets/FindItLogo.png';


import defaultprofile from '../../../assets/default.png'

import { FaRegBell } from "react-icons/fa";

export default function Navbar() {

  const router = useRouter()

  const [userid, setUserID] = useState("");
  const [openProfilePic, setOpenProfilePic] = useState(false)

  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    image: null,
    bio: "",
    mobile: "",
  });

  useEffect(() => {
      const storedID = localStorage.getItem('userId');
      setUserID(storedID);
    }, []);

    const handlePostRequest = async () => {
      try {
        const res = await axios.post("http://localhost:8800/get_user_profile", {
          Finder_ID_number: userid,
          Owner_ID_number: userid,  
          // Match backend expected key
        });

        const user = res.data.user;
        console.log(user)
    
        setProfile({
          firstname: user.First_name,
          lastname: user.Last_name,
          image: user.Image ? res.data.user.Image : null,
          bio: user.Bio,
          mobile: user.Mobile_no,
        });
  
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      if (userid) {
        handlePostRequest();
      }
    }, [userid]); // run this effect *only when* userid is updated

  return (
    <nav className="px-10 py-2 shadow-sm">
        <button onClick={() => router.push('/homepage')} className='inline-flex gap-2'>
            <Image src={logo} alt="Logo" className='logo' width={30} height={30}/>
            <p className="font-semibold text-xl">FindIT</p>
        </button>
        <div className='inline-flex items-center gap-3'>
            <FaRegBell className='cursor-pointer'/>
            {/* Template Profile Pick */}
            <Image src={profile.image || defaultprofile} alt='Profile Picture' className=" w-10 h-10 rounded-full object-cover cursor-pointer" onClick={() => setOpenProfilePic(!openProfilePic)}/>
            {openProfilePic && (
              <div className="absolute top-14 right-8 bg-white shadow-lg rounded-lg p-3 w-40 z-50 text-lg">
                <p className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded" onClick={() => router.push('/profile')}>My Profile</p>
                <p className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded" onClick={() => router.push('/messages')}>Messages</p>
                <p className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded" onClick={() => {
                  localStorage.removeItem('userId');
                  localStorage.setItem('isLoggedIn', 'false');
                  router.push('/Login');
                }}>Log Out</p>
              </div>
            )}
        </div>
    </nav>

  );
}

