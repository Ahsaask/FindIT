"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import logo from '../../../assets/FindItLogo.png'
import ImageUpload from './ImageUpload'

const InputField = ({ type, name, value, onChange, placeholder, required }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="border rounded-md px-4 py-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default function CreateProfileForm() {
  const router = useRouter();
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    bio: '',
    profileImage: null, 
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/Login');
      return;
    }

    // Get user ID from localStorage
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      router.push('/Login');
      return;
    }

    setUserId(storedUserId);

    // Determine user type based on localStorage
    const userType = localStorage.getItem('userType') || 'finderUser';
    setUserType(userType);
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (base64Image) => {
    setFormData({
      ...formData,
      profileImage: base64Image,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // First create profile record with image data directly included
      const profileData = {
        Mobile_no: formData.mobileNo,
        Bio: formData.bio,
        Image: formData.profileImage // Send base64 image directly in the request
      };

      // Create profile in the database
      const profileResponse = await axios.post('http://localhost:8800/create_profile', profileData);

      // Then create name record based on user type
      let nameData;
      let endpoint;

      if (userType === 'finderUser') {
        nameData = {
          Finder_ID_number: userId,
          First_name: formData.firstName,
          Last_name: formData.lastName,
          Mobile_no: formData.mobileNo,
        };
        endpoint = 'http://localhost:8800/create_finder_name';
      } else { // ownerUser
        nameData = {
          Owner_ID_number: userId,
          First_name: formData.firstName,
          Last_name: formData.lastName,
          Mobile_no: formData.mobileNo,
        };
        endpoint = 'http://localhost:8800/create_owner_name';
        
        // Also update owner's mobile number
        await axios.put('http://localhost:8800/update_owner_mobile', {
          Owner_ID_number: userId,
          Mobile_no: formData.mobileNo,
        });
      }

      // Create name record
      const nameResponse = await axios.post(endpoint, nameData);

      // Show success message and redirect
      setSuccess(true);
      setTimeout(() => {
        router.push('/homepage');
      }, 1500);
    } catch (err) {
      console.error("Error creating profile:", err);
      setError("Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className='flex items-center flex-col'>
      <Image src={logo} alt='Logo' width={48} height={48}/>
      <p className='font-semibold text-4xl my-2'>FindIT</p>
      <p className='text-gray-600'>Complete your profile information</p>
      
      <div className='box px-8 border bg-white shadow-lg my-10 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 rounded-lg'>
        <form onSubmit={handleSubmit} className="py-8">
          <div className="mb-6">
            <p className='font-semibold text-gray-600'>First Name*</p>
            <InputField
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>
          
          <div className="mb-6">
            <p className='font-semibold text-gray-600'>Last Name*</p>
            <InputField
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>
          
          <div className="mb-6">
            <p className='font-semibold text-gray-600'>Mobile Number*</p>
            <InputField
              type="tel"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              placeholder="e.g., 123-456-7890"
              required
            />
          </div>
          
          <div className="mb-6">
            <p className='font-semibold text-gray-600'>Bio (Optional)</p>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              className="border rounded-md px-4 py-3 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            />
          </div>
          
          <div className="mb-8">
            <p className='font-semibold text-gray-600'>Profile Picture (Optional)</p>
            <ImageUpload onImageChange={handleImageChange} />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              Profile created successfully! Redirecting to homepage...
            </div>
          )}
          
          <button 
            type="submit" 
            className="py-3 bg-blue-500 text-white text-lg rounded-xl border w-full"
            disabled={loading}
          >
            {loading ? "Creating Profile..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}