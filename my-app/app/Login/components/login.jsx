"use client"

import React from 'react'
import Image from 'next/image';
import logo from '../../../assets/FindItLogo.png'

import InputField from "./InputField";

import { useRouter } from 'next/navigation'

import { IoIosCheckboxOutline } from "react-icons/io";

// For the Sql database
// Removed unused useEffect import
import { useState } from "react";
import axios from "axios";


export default function login() {

  // For the Sql database
  // useEffect is used to fetch data from the database

  // For User LogIn Input
  const [userMode, setUser] = useState("finderUser");

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // State for error messages
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter(); // Router function
  
  
  
  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);
  
// Handle login
const handleLogin = async (e) => {
  e.preventDefault(); // Prevent form from reloading the page

  let isValid = true; // Track if the form is valid

  // Reset error messages
  setEmailError("");
  setPasswordError("");

  // Validate email
  if (!email.trim()) {
    setEmailError("Email is required.");
    isValid = false;
  // } else if (!email.endsWith("@ucalgary.ca")) {
  //   setEmailError("Invalid email. Please use your @ucalgary.ca email.");
  //   isValid = false;
  }

  // Validate password
  if (!password.trim()) {
    setPasswordError("Password is required.");
    isValid = false;
  }

  // If validation passes, proceed with login, check if the email and password exist in the database
  if (isValid) {
    const infoAccount = {
      Password: password,
      Email: email,
    };

    try {
      let endpoint = "";
      if (userMode === "finderUser") {
        endpoint = "http://localhost:8800/finder_account";
      } else if (userMode === "adminUser") {
        endpoint = "http://localhost:8800/admin_account";
      } else if (userMode === "ownerUser") {
        endpoint = "http://localhost:8800/owner_account";
      }

      if (endpoint) {
        const response = await axios.post(endpoint, infoAccount);
        if (response.data && response.data.success) {
          localStorage.setItem('isLoggedIn', 'true');
          router.push('/homepage');
        } else {
          setEmailError("Invalid credentials.");
        }
      } else {
        setEmailError("Please select a user type.");
      }
    } catch (err) {
      console.log(err);
      setEmailError("Invalid credentials.");
      setPasswordError("Invalid credentials.");
    }
  }
};

  return (
  <div className='flex items-center flex-col'>
    <Image src={logo} alt='Logo' width={48} height={48}/>
    <p className='font-semibold text-4xl my-2'>FindIT</p>
    <p className='text-gray-600'>Sign in to manage lost and found items</p>
    <div className='box px-8 border bg-white shadow-lg my-10 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 rounded-lg'>
      <div className='mt-12 flex flex-row justify-center gap-8'>
        <button onClick={() => setUser("adminUser")} className={`font-semibold border px-5 py-2 rounded-md 
          ${ userMode === "adminUser"
            ? "text-gray-50 bg-blue-500"
            : "text-gray-500"
          }`}> Admin </button>
        <button onClick={() => setUser("finderUser")} className={`font-semibold border px-5 py-2 rounded-md 
          ${ userMode === "finderUser"
            ? "text-gray-50 bg-blue-500"
            : "text-gray-500"
          }`}> Finder </button>
        <button onClick={() => setUser("ownerUser")} className={`font-semibold border px-5 py-2 rounded-md 
          ${ userMode === "ownerUser"
            ? "text-gray-50 bg-blue-500"
            : "text-gray-500"
          }`}> Owner </button>
      </div>
      <form onSubmit={handleLogin}>

        <div className='pt-10'>
          <p className='font-semibold text-gray-600'>Email</p>
          <InputField
            type="email"
            name="email"
            value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(""); // Reset email error when user starts typing
              }}
            required
          />
          {/* Display error message for email */}
          {emailError && (
              <div className="mt-2 text-sm text-red-500">{emailError}</div>
          )}
        </div>

        <div className='pt-8'>
          <p className='font-semibold text-gray-600'>Password</p>
          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(""); // Reset password error when user starts typing
              }}
              togglePassword={togglePassword}
            required
          />
          {/* Display error message for password */}
          {passwordError && (
              <div className="mt-2 text-sm text-red-500">{passwordError}</div>
          )}

        </div>

        
        <div className='my-4 flex flex-row place-content-between'>
          <div className='flex flex-row gap-2 items-center text-gray-500'>
            <button className='text-2xl'><IoIosCheckboxOutline/></button>
            <p>Remember me</p>
          </div>
          <button className='text-blue-500'>Forgot password?</button>
        </div>

        <button className='py-3 bg-blue-500 text-white text-lg rounded-xl border w-full'>Sign In</button>

      </form>
      <div className='my-6 flex flex-row items-center place-content-center gap-1'>
        <p className='text-gray-600'>Already have an account?</p>
        <button onClick={() => router.push('/Signup')} className='py-3 text-blue-500'>Sign In</button>
      </div>
    </div>
  </div>
  )
}
