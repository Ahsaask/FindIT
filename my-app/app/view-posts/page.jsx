"use client"

import React from 'react'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";

import Navbar from "../homepage/components/HomePageNavbar";

import defaultprofile from '../../assets/default.png';

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
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!loggedIn) {
      router.push('/Login');
    };
  }, [router]);

  return (
    <div>
      <Navbar />
      <button onClick={() => router.push('/create-post')} className='mt-24 px-8 py-2 mx-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-lg border shadow-sm'>Create New Post</button>
      <div className='my-8 grid grid-cols-1 gap-6 mb-8 mx-10'>
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-blue-50 hover:bg-blue-100 p-6 rounded-lg shadow-md text-left transition relative flex items-start w-full cursor-pointer"
          >
            <Image
              src={post.ProfileImage || defaultprofile} // Fallback to default profile image
              alt={`${post.First_name} ${post.Last_name}'s Profile Pic`}
              className="w-24 h-24 rounded-full object-cover mr-6"
              width={96}
              height={96}
            />
            <div className="flex flex-col">
              <div className="flex mt-2 items-center">
                <p className='font-semibold text-blue-500'>{post.First_name} {post.Last_name}</p>
                <p className="break-words ml-2 text-xs">
                  {new Date(post.Year, post.Month - 1, post.Day).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <p className='font-semibold mt-2 text-lg'>{post.Title}</p>
              <p className="mt-2 mb-4 font-normal">
                {post.Content}
              </p>
              {post.PostImage && (
                <div className="flex items-center justify-center mr-28">
                  <Image
                    src={post.PostImage}
                    alt={post.Title || "Post Image"}
                    className="max-w-xl h-auto"
                    width={600}
                    height={400}
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
