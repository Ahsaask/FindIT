"use client"

import React from 'react'
import axios from 'axios';
// Removed unused import
import { useState, Suspense } from "react";
import { useRouter } from 'next/navigation';
import HomeNavbar from '../homepage/components/HomepageNavbar';

export default function page() {

  const [content, setContent] = useState({
    title: "",
    content: ""
  });

  const [postdate, setpostdate] = useState({
    day: "",
    month: "",
    year: ""
  });

  const [postimg, setPostImg] = useState(null); // Removed unused setter

  const router = useRouter()
  const handleChange = (e) => {
    setContent({ ...content, content: e.target.value }); // Corrected parameter usage
  }

  const handlePost = async (e) => {
    e.preventDefault();

    console.log(content)
    
    const currentDate = new Date();
    setpostdate({
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1, // Months are zero-based
      year: currentDate.getFullYear()
    });
    
    console.log(postdate)
    
    try {
      // On handlePost
      await axios.post("http://localhost:8800/add_post_content", {
        Title: content.title,
        Content: content.content,
      });
      await axios.post("http://localhost:8800/add_post_date", {
        Title: content.title,
        Year: currentDate.getFullYear(),
        Month: currentDate.getMonth() + 1,
        Day: currentDate.getDate(),
      });
      if (postimg?.Image) {
        await axios.post("http://localhost:8800/add_post_image", {
          Title: content.title,
          Image: postimg.Image,
        });
      } else {
        await axios.post("http://localhost:8800/add_post_image", {
          Title: content.title,
          Image: null,
        });
      }

      router.push('/view-posts')
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div>
      <HomeNavbar/>
      <div className="flex-1 p-6 mt-24 mx-36 transition bg-blue-100 rounded-md">
        <p className="text-center text-3xl font-bold"></p>
        <div className="rounded-md m-auto max-w-5xl">
          <div className="TextEditor">
            {/* Input Title */}
            <div className="top-0 left-0 px-4 py-1 flex items-center w-full mt-4 lg:mt-0">
              <input
                type="text"
                value={content.title}
                placeholder="Title (Required)"
                onChange={(e) => setContent({title: e.target.value })}
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

