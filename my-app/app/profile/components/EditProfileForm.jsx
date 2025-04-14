"use client"

import React, { useState, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { IoMdCloudUpload } from 'react-icons/io';
import { IoIosCloseCircle } from 'react-icons/io';
import defaultProfile from '../../../assets/default.png';

// Input field component
const InputField = ({ label, type, name, value, onChange, placeholder, required }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="border rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default function EditProfileForm({ profile, userId, userType, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    mobileNo: profile.mobileNo || '',
    bio: profile.bio || '',
    image: profile.image || null,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [imagePreview, setImagePreview] = useState(profile.image || null);
  
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select a valid image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }

    // Create preview and convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setImagePreview(base64String);
      setFormData({
        ...formData,
        image: base64String,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFormData({
      ...formData,
      image: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // First create/update profile record
      const profileData = {
        Mobile_no: formData.mobileNo,
        Bio: formData.bio,
        Image: formData.image, // Base64 encoded image
      };

      // Check if profile exists using the get_user_profile endpoint
      const checkProfile = await axios.post('http://localhost:8800/get_user_profile', {
        Finder_ID_number: userId,
        Owner_ID_number: userId,
      });

      let profileResponse;
      
      // If profile exists, update it, otherwise create it
      if (checkProfile.data && checkProfile.data.user) {
        // Profile exists, update it
        profileResponse = await axios.put('http://localhost:8800/update_profile', {
          Mobile_no: formData.mobileNo,
          Bio: formData.bio,
          Image: formData.image,
        });
      } else {
        // Profile doesn't exist, create it
        profileResponse = await axios.post('http://localhost:8800/create_profile', profileData);
      }

      // Then update name record based on user type
      if (userType === 'finderUser') {
        const nameData = {
          Finder_ID_number: userId,
          First_name: formData.firstName,
          Last_name: formData.lastName,
          Mobile_no: formData.mobileNo,
        };

        // Check if finder_name exists
        try {
          // Try to update finder_name
          await axios.put('http://localhost:8800/update_finder_name', nameData);
        } catch (err) {
          // If update fails, try to create
          await axios.post('http://localhost:8800/create_finder_name', nameData);
        }
      } else { // ownerUser
        const nameData = {
          Owner_ID_number: userId,
          First_name: formData.firstName,
          Last_name: formData.lastName,
        };

        // Try to update owner_name
        try {
          await axios.put('http://localhost:8800/update_owner_name', nameData);
        } catch (err) {
          // If update fails, try to create
          await axios.post('http://localhost:8800/create_owner_name', nameData);
        }

        // Also update owner table with mobile number
        await axios.put('http://localhost:8800/update_owner_mobile', {
          Owner_ID_number: userId,
          Mobile_no: formData.mobileNo,
        });
      }

      // Show success message
      setSuccess(true);
      
      // Call the onUpdate callback with the updated profile
      onUpdate({
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNo: formData.mobileNo,
        bio: formData.bio,
        image: formData.image,
      });
      
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Profile Picture</label>
          <div className="flex items-center space-x-6">
            <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image 
                  src={defaultProfile} 
                  alt="Default Profile" 
                  fill
                  className="object-cover"
                />
              )}
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="profile-image-upload"
                  ref={fileInputRef}
                />
                <label
                  htmlFor="profile-image-upload"
                  className="flex items-center space-x-2 cursor-pointer text-blue-500 hover:text-blue-600"
                >
                  <IoMdCloudUpload className="text-2xl" />
                  <span>Upload new image</span>
                </label>
                
                {imagePreview && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="mt-2 text-red-500 hover:text-red-600 flex items-center space-x-1"
                  >
                    <IoIosCloseCircle />
                    <span>Remove image</span>
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG. Max size 2MB</p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
          
          <InputField
            label="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        
        <InputField
          label="Mobile Number"
          type="tel"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          placeholder="e.g., 123-456-7890"
          required
        />
        
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            className="border rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
          />
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            Profile updated successfully!
          </div>
        )}
        
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}