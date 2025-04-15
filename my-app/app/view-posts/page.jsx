"use client"

import React from 'react'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";

import Navbar from "../homepage/components/HomePageNavbar";

import defaultprofile from '../../assets/default.png'; // Ensure this path is correct or replace with a valid image path

export default function page() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
        try {
            const res = await axios.get("http://localhost:8800/posts");
            if (res.status === 200) {
                setPosts(res.data);
            } else {
                console.error("Failed to fetch posts: ", res.statusText);
            }
        } catch (err) {
            console.error("Error fetching posts: ", err);
        }
    };
    fetchAllPosts();
}, []);

  const router = useRouter();

  useEffect(() => {
    // Example: Check login status from localStorage (or cookies, auth context, etc.)
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!loggedIn) {
      router.push('/Login'); // Redirect to login if not logged in
    };
  }, [router]);


  return (
    <div>
      <Navbar/>
      <button onClick={() => router.push('/create-post')} className='mt-24 px-8 py-2 mx-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-lg border shadow-sm'>Create New Post</button>
      <div className='my-8 grid grid-cols-1 gap-6 mb-8 mx-10'>
        {posts.map((post, index) => (
            <div
              key={index}
              className="bg-blue-50 hover:bg-blue-100 p-6 rounded-lg shadow-md text-left transition relative flex items-start w-full cursor-pointer"
            >
              <Image
                src={defaultprofile}
                alt="Profile Pic"
                className="w-24 h-24 rounded-full object-cover mr-6"
                width={96} // Adjusted width to match the class
              />
              <div className="flex flex-col">
                <div className="flex mt-3 items-center">
                  <p className='font-semibold'>{post.Title}</p>
                  <p className="break-words ml-2 text-xs">
                    {new Date(post.Year, post.Month - 1, post.Day).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <p className="mt-2 mb-4 font-normal">
                  {post.Content}
                </p>
                {post.Image && (
                  <div className="flex items-center justify-center mr-28">
                    <Image
                      src={post.Image}
                      alt={post.Title || "Post Image"} // Fallback alt text
                      className="max-w-xl h-auto"
                      width={600} // Replace with appropriate width
                      height={400} // Replace with appropriate height
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

