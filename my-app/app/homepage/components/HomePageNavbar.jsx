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
  const [openBell, setOpenBell] = useState(false);

  const [notificationsList, setNotificationsList] = useState([]);

  const hasUnread = notificationsList.some(n => n.Seen_Status === 'Unread');

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
        // console.log(user)
    
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

  const fetchNotifications = async () => {
    try {
        const response = await axios.post("http://localhost:8800/get_notifications", {
            Finder_ID_number: userid,
            Owner_ID_number: userid,
        });

        console.log("Notifications fetched: ", response.data);

        setNotificationsList(response.data || []);
    } catch (err) {
        console.log(err);
        setError(true);
    }
  };

  useEffect(() => {
      if (userid) {
          fetchNotifications();
      }
  }, [userid]);

  return (
    <nav className="px-10 py-2 shadow-sm">
        <button onClick={() => router.push('/homepage')} className='inline-flex gap-2'>
            <Image src={logo} alt="Logo" className='logo' width={30} height={30}/>
            <p className="font-semibold text-xl">FindIT</p>
        </button>
        <div className='inline-flex items-center gap-3'>
          <div className="relative">
            <FaRegBell
              className={`cursor-pointer hover:text-blue-500 ${hasUnread ? 'text-blue-500' : ''}`}
              onClick={() => setOpenBell(!openBell)}
            />
            {hasUnread && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </div>
            {openBell && (
              <div className="absolute top-14 right-20 bg-white shadow-lg rounded-lg p-3 w-72 z-50 text-sm border">
                <p className='font-bold text-blue-500 text-lg text-center p-2'>Notifications</p>
                {notificationsList.filter(n => n.Seen_Status === 'Unread').length === 0 ? (
                  <p className="text-gray-500 text-sm text-center font-semibold">No new notifications.</p>
                ) : (
                  notificationsList.filter(n => n.Seen_Status === 'Unread').map((notif, index) => (
                    <div key={notif.Notification_ID || `${notif.Date}-${index}`} className='cursor-pointer hover:bg-gray-100 rounded-md'>
                      <p
                        key={index}
                        className="px-2 py-1 rounded"
                        onClick={() => router.push('/messages')}
                      >
                        {notif.Text || "You have a new notification"}
                      </p>
                      <p className='font-thin text-gray-500 text-xs py-1 px-2 inline-block'>
                          {new Date(notif.Date).toLocaleString('en-CA', {
                              hour: '2-digit', minute: '2-digit', hour12: true,
                              day: 'numeric', month: 'short', year: 'numeric'
                          })}
                      </p>
                    </div>
                  ))
                )}
                <p
                  className="cursor-pointer hover:bg-blue-100 text-blue-600 font-medium mt-2 px-2 py-1 rounded-sm text-center"
                  onClick={() => router.push('/notifications')}
                >
                  View All
                </p>
              </div>
            )}

            {/* Template Profile Pick */}
            <Image src={profile.image || defaultprofile} width={24} height={24} alt='Profile Picture' className=" w-10 h-10 rounded-full object-cover cursor-pointer" onClick={() => setOpenProfilePic(!openProfilePic)}/>
            {openProfilePic && (
              <div className="absolute top-14 right-8 bg-white shadow-lg rounded-lg p-3 w-40 z-50 text-lg border">
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

