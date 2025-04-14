"use client"

import React, { useState, useRef } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

export default function ImageUpload({ onImageChange }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const disabledMessage = "Image upload feature is currently disabled";

  const handleClickUpload = () => {
    setError(disabledMessage);
  };
  
  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageChange(null);
  };

  return (
    <div className="mt-2">
      {/* We're keeping the input but making it non-functional */}
      <input
        type="file"
        accept="image/*"
        disabled
        className="hidden"
        ref={fileInputRef}
      />
      
      {!preview ? (
        <div 
          onClick={handleClickUpload}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-not-allowed bg-gray-50 opacity-70"
        >
          <IoMdCloudUpload className="text-gray-400 text-4xl mb-2" />
          <p className="text-gray-500 text-center">
            Image upload feature is currently disabled<br />
            <span className="text-xs text-gray-400 line-through">JPEG, PNG (Max 2MB)</span>
          </p>
        </div>
      ) : (
        <div className="relative">
          <img 
            src={preview} 
            alt="Profile preview" 
            className="w-full h-40 object-cover rounded-lg opacity-70"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 text-red-500 bg-white rounded-full"
          >
            <IoIosCloseCircle className="text-2xl" />
          </button>
        </div>
      )}
      
      {error && (
        <p className="text-amber-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}