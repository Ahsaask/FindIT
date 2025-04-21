"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import EditProfileForm from './EditProfileForm';
import defaultProfile from '../../../assets/default.png';
import Navbar from '../../homepage/components/HomePageNavbar';
import { FaEdit } from 'react-icons/fa';

export default function ProfilePage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [userType, setUserType] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    bio: '',
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/Login');
      return;
    }

    const storedUserId = localStorage.getItem('userId');
    const storedUserType = localStorage.getItem('userRole');
    
    if (!storedUserId) {
      router.push('/Login');
      return;
    }

    setUserId(storedUserId);
    setUserType(storedUserType || 'finderUser');
  }, [router]);

  // Fetch profile data
  useEffect(() => {
    if (!userId) return;
    
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:8800/get_user_profile', {
          Finder_ID_number: userId,
          Owner_ID_number: userId,
        });
        
        if (response.data && response.data.user) {
          const user = response.data.user;
          console.log("Profile data:", user);
          
          // Process the image data if it exists
          const imageData = typeof user.Image === 'string' && user.Image.startsWith('data:image')
          ? user.Image
          : null;

          setProfileImage(imageData);
          
          
          setProfile({
            firstName: user.First_name || '',
            lastName: user.Last_name || '',
            mobileNo: user.Mobile_no || '',
            bio: user.Bio || '',
            image: imageData,
          });
        } else {
          // If user doesn't have a profile yet, enable edit mode by default
          setEditMode(true);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile. Please try again.');
        // If there's an error loading the profile, also enable edit mode
        setEditMode(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleProfileUpdate = (updatedProfile) => {
    // If the updated profile includes an image, process it
    if (updatedProfile.image) {
      setProfileImage(updatedProfile.image);
    } else {
      setProfileImage(null);
    }
    
    setProfile(updatedProfile);
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
        
        {editMode ? (
          <EditProfileForm 
            profile={profile} 
            userId={userId}
            userType={userType}
            onUpdate={handleProfileUpdate}
            onCancel={() => setEditMode(false)}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Profile Header with Image */}
            <div className="relative h-40 bg-gradient-to-r from-blue-500 to-blue-600">
              <div className="absolute -bottom-16 left-8">
                <div className="relative h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white">
                <Image 
                    src={profile.image || defaultProfile} 
                    alt="Profile Picture" 
                    fill
                    className="object-cover"
                    />
                </div>
              </div>
              <button 
                onClick={() => setEditMode(true)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
              >
                <FaEdit className="text-blue-500" />
              </button>
            </div>
            
            {/* Profile Info */}
            <div className="pt-20 px-8 pb-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {profile.firstName && profile.lastName 
                    ? `${profile.firstName} ${profile.lastName}`
                    : "No name provided"}
                </h2>
                <p className="text-gray-600">{userType === 'finderUser' ? 'Finder' : 'Owner'}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Mobile Number</p>
                      <p className="text-gray-800">{profile.mobileNo || "Not provided"}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Bio</h3>
                  <div className="bg-gray-50 p-4 rounded-lg h-full">
                    <p className="text-gray-800">
                      {profile.bio || "No bio provided"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-14 flex justify-center">
                <button 
                  onClick={() => setEditMode(true)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}