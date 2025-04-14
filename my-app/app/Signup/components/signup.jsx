"use client"

import React from 'react'
import Image from 'next/image';
import logo from '../../../assets/FindItLogo.png'

import InputField from "./InputField";

import { useRouter } from 'next/navigation'

import { IoIosCheckboxOutline } from "react-icons/io";

// For the Sql database
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";


export default function signup() {

  // For the Sql database
  // useEffect is used to fetch data from the database

  // const [finder_accounts, setFinderAccounts] = useState([]);
  // const [owner_accounts, setOwnerAccounts] = useState([ ]);
  // const [admin_accounts, setAdminAccounts] = useState([]);

  const [userMode, setUser] = useState("finderUser");
  
  const [error,setError] = useState(false)

  // For User SignUp Input

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [passwordsMatch, setPasswordsMatch] = useState(false); // State to track if passwords match
  const [emailValid, setEmailValid] = useState(true); // State to track if email is valid
  const [passwordValid, setPasswordValid] = useState(true); // State to track if password is valid
  const [submitted, setSubmitted] = useState(false); // State to track if the form has been submitted
  
  const router = useRouter(); // Router function
  
  // Regular expression for password validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  // Regular expressions for individual password checks
  const lengthRegex = /.{8,}/; // At least 8 characters
  const upperCaseRegex = /[A-Z]/; // At least one uppercase letter
  const lowerCaseRegex = /[a-z]/; // At least one lowercase letter
  const numberRegex = /\d/; // At least one number
  const specialCharRegex = /[@$!%*?&]/; // At least one special character
  
  // Regular expression for email validation
  // const emailRegex = /@ucalgary\.ca$/;
  
  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    // Clear error messages when user starts typing
    if (name === "email") setEmailValid(true);
    if (name === "password" || name === "confirmPassword")
    setPasswordValid(true);
  
    // If user is typing in confirmPassword, check if passwords match
    if (name === "confirmPassword") {
    setPasswordsMatch(value === formData.password);
    }
  
    // If user is typing in password, also check if confirmPassword matches
    if (name === "password") {
    setPasswordsMatch(value === formData.confirmPassword);
    }
  };
  
  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Set submitted state to true when the form is submitted
  
    const { email, password, confirmPassword } = formData;
  
    // Validate all fields are filled
    if (!email || !password || !confirmPassword) {
    // If email is empty, set emailValid to false
    if (!email) {
      setEmailValid(false);
      return;
    }
    }
  
    // Validate email ends with "@ucalgary.ca"
    // if (!emailRegex.test(email)) {
    // console.log("email");
    // setEmailValid(false); // Set email valid state to false
    // return;
    // }
  
    // Validate password strength
    if (!userMode) {
      console.log("Please select a user type");
      setError(true);
      return; // Prevent form submission if user type is not selected
    }

    if (!passwordRegex.test(password)) {
      setPasswordValid(false); // Set password valid state to false
      console.log("Password");
      return;
    }
    
    if (!passwordsMatch) {
      console.log("Password match");
      return; // Prevent form submission if passwords do not match
    }

    // If all validations pass, put user name email password and other information to the database and navigate to the homepage

    // Add the user info to the finder account table in the database if the user is a finder
    const infoAccount = {
      Password: formData.password,
      Email: formData.email,
    };

    try {
      // Check if the account already exists
      const response = await axios.get(`http://findit-backend.vercel.app/check_account?email=${formData.email}`);
      if (response.data.exists) {
      console.log("Account already exists");
      setError(true);
      return; // Stop further execution if account exists
      }
    } catch (err) {
      console.log("Error checking account existence:", err);
      setError(true);
      return;
    }

    if (userMode === "finderUser") {
      try {
      await axios.post("http://findit-backend.vercel.app/finder_accounts", infoAccount);
      localStorage.setItem('isLoggedIn', 'true'); // Set login status in local storage
      router.push('/homepage');
      } catch (err) {
      console.log(err);
      setError(true);
      }
    }

    if (userMode === "ownerUser") {
      try {
      await axios.post("http://findit-backend.vercel.app/owner_accounts", infoAccount);
      localStorage.setItem('isLoggedIn', 'true'); // Set login status in local storage
      router.push('/homepage');
      } catch (err) {
      console.log(err);
      setError(true);
      }
    }

    if (userMode === "adminUser") {
      try {
      await axios.post("http://findit-backend.vercel.app/admin_accounts", infoAccount);
      localStorage.setItem('isLoggedIn', 'true'); // Set login status in local storage
      router.push('/homepage');
      } catch (err) {
      console.log(err);
      setError(true);
      }
    }
  }
  
  // Password validation states for each rule
  const passwordCriteria = {
    length: lengthRegex.test(formData.password),
    uppercase: upperCaseRegex.test(formData.password),
    lowercase: lowerCaseRegex.test(formData.password),
    number: numberRegex.test(formData.password),
    specialChar: specialCharRegex.test(formData.password),
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
      <form onSubmit={handleSignup}>

        <div className='pt-10'>
          <p className='font-semibold text-gray-600'>Email</p>
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {submitted && !emailValid && (
            <div className="mt-2 text-sm text-red-500">
            {formData.email === ""
              ? "Email is required."
              : "Please enter a valid @ucalgary.ca email address."}
            </div>
          )}
        </div>

        <div className='pt-8'>
          <p className='font-semibold text-gray-600'>Password</p>
          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            togglePassword={togglePassword}
            required
          />
          {submitted &&
            (!passwordCriteria.length ||
            !passwordCriteria.uppercase ||
            !passwordCriteria.lowercase ||
            !passwordCriteria.number ||
            !passwordCriteria.specialChar) && (
            <div className="mt-2 text-sm dark:text-uConnectDark-textSub">
              Password must be:
            </div>
            )}

          {submitted &&
            (!passwordCriteria.length ||
            !passwordCriteria.uppercase ||
            !passwordCriteria.lowercase ||
            !passwordCriteria.number ||
            !passwordCriteria.specialChar) && (
            <div className=" text-sm">
              <div
              className={
                passwordCriteria.length ? "text-green-500" : "text-red-500"
              }
              >
              At least 8 characters long
              </div>
              <div
              className={
                passwordCriteria.uppercase
                ? "text-green-500"
                : "text-red-500"
              }
              >
              Include at least one uppercase letter
              </div>
              <div
              className={
                passwordCriteria.lowercase
                ? "text-green-500"
                : "text-red-500"
              }
              >
              Include at least one lowercase letter
              </div>
              <div
              className={
                passwordCriteria.number ? "text-green-500" : "text-red-500"
              }
              >
              Include at least one number
              </div>
              <div
              className={
                passwordCriteria.specialChar
                ? "text-green-500"
                : "text-red-500"
              }
              >
              Include at least one special character (@$!%*?&)
              </div>
            </div>
            )}
        </div>

        <div className='pt-8'>
          <p className='font-semibold text-gray-600'>Confirm Password</p>
          <InputField
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            togglePassword={togglePassword}
            required
          />

          {/* Password Match Message */}
          {(formData.confirmPassword || submitted) && (
            <div className="mt-2 text-sm">
              {passwordsMatch ? (
                <span className="text-green-500">Passwords match!</span>
              ) : (
                <span className="text-red-500">Passwords do not match.</span>
              )}
            </div>
          )}
        </div>


        <button className='py-3 mt-4 bg-blue-500 text-white text-lg rounded-xl border w-full'>Sign In</button>
      </form>
      {error && (
        <div className="mt-2 text-sm text-red-500">
          Error signing up. Please try again.
        </div>
      )}
    <div className='my-3 flex flex-row items-center place-content-center gap-1'>
        <p className='text-gray-600'>Don't have an account?</p>
        <button onClick={() => router.push('/Login')} className='py-3 text-blue-500'>Sign up</button>
    </div>

    </div>
  </div>
  )
}
