"use client"

import React from 'react'
import axios from 'axios';
// Removed unused import
import { useState, Suspense, useEffect } from "react";
import { useRouter } from 'next/navigation';
import HomeNavbar from '../homepage/components/HomePageNavbar';

export default function page() {
  const [userid, setUserID] = useState("");
  const [currentUserRole, setUserRole] = useState("");

  const router = useRouter()
  
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    if (!loggedIn) {
      router.push('/Login');
      return;
    }

    if (userRole !== 'finderUser') {
      router.push('/homepage');
      return;
    }

    setUserRole(userRole); // This is now safe
  }, [router]);
  
  useEffect(() => {
    const storedID = localStorage.getItem('userId');
    if (storedID) {
      setUserID(storedID);
      setContent((prev) => ({
        ...prev,
        finderid: storedID,
      }));
    }
  }, []);
  
  const [content, setContent] = useState({
    title: "",
    content: "",
    finderid: userid,
  });

  const [postimg, setPostImg] = useState(null); 

  const handleChange = (e) => {
    setContent({ ...content, content: e.target.value }); 
  }

  const handlePost = async (e) => {
    e.preventDefault();

    console.log(content)

    if (postimg?.Image) {
      const base64Length = postimg.Image.length;
      const approxImageSizeKB = (base64Length * (3 / 4)) / 1024;
      const approxImageSizeGB = approxImageSizeKB / (1024 * 1024);

      if (approxImageSizeGB > 1) {
        alert("Image is too large. Please upload an image under 1GB.");
        return;
      }
    }
    
    const currentDate = new Date();

    try {
      // Start API requests
      const res1 = await axios.post("http://localhost:8800/add_post_content", {
        Title: content.title,
        Content: content.content,
        Finder_ID_number: content.finderid
      });

      if (res1.status !== 200) throw new Error("Content post failed");

      const res2 = await axios.post("http://localhost:8800/add_post_date", {
        Title: content.title,
        Year: currentDate.getFullYear(),
        Month: currentDate.getMonth() + 1,
        Day: currentDate.getDate(),
      });

      if (res2.status !== 200) throw new Error("Date post failed");

      const res3 = await axios.post("http://localhost:8800/add_post_image", {
        Title: content.title,
        Image: postimg?.Image || null,
      });

      if (res3.status !== 200) throw new Error("Image post failed");

      router.push('/view-posts');

    } catch (err) {
      console.error("Error during posting:", err);
      alert("Failed to post. Please try again.");
    }
};
  

  return (
    <div>
      <HomeNavbar/>
      <div className="flex-1 transition my-6 m-auto max-w-5xl">
        <p className="mt-36 text-left text-4xl font-bold ">Create Post</p>
        <div className="rounded-md bg-blue-100 p-6 my-8">
          <div className="TextEditor">
            {/* Input Title */}
            <div className="top-0 left-0 px-4 py-1 flex items-center w-full mt-4 lg:mt-0">
              <input
                type="text"
                value={content.title}
                placeholder="Title (Required)"
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                className=" placeholder:italic pt-4 px-4 pb-2 text-2xl font-semibold bg-transparent outline-none flex-1"
              />
            </div>
            <hr className="w-11/12 mx-auto border-2"></hr>
            {/* Input Content, The Text Editor */}
            <Suspense fallback={<div>Loading...</div>}>
              <div className="rounded-md transition p-4">
                <textarea
                  value={content.content}
                  onChange={handleChange}
                  placeholder="Type your content here..."
                  className="placeholder:italic mt-2 w-full h-80 p-6 rounded-md"
                />
              </div>
            </Suspense>
            {/* Post Button */}

            <input
              className='ml-7'
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPostImg({
                    Title: content.title,
                    Image: reader.result, // base64 string
                  });
                };
                reader.readAsDataURL(file);
              }}
            />

            <div className="flex justify-end">
              <button
                onClick={handlePost}
                disabled={!content.title}
                className="mr-4 mt-4 group/trash relative text-xl px-4 bg-blue-500 inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed w-1/4 py-3 disabled:bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition"
              >
                <span>Create Post</span>
                {!content.title && (
                  <div className="absolute transform bottom-full mb-3 hidden group-hover/trash:block text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-md z-10 text-black">
                    Title is Required to Post!
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

