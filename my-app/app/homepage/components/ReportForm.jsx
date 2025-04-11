import React from 'react'
import Image from "next/image";
import Form from "next/form"
import './components.css';

import Dropdown from './Dropdown';

import { FaCloudArrowUp } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";

export default function ReportForm() {
  return (
    <div className="mx-64 mt-10 box p-4 bg-white rounded-lg shadow-md">
        <p className='font-semibold text-xl py-2'>Submit Found Item</p>
        <p className='font-extralight text-gray-400'>Please provide detailed information about the item you found</p>

        <hr className='border-1 my-5'></hr>

        <div className=''>
            <p className='font-semibold text-gray-600'>Item Category</p>
            <Dropdown/>
        </div>

        <div className='pt-10'>
            <p className='font-semibold text-gray-600'>Item Name</p>
            {/* Input is put here */}
            <input className='mt-2 mx-2 py-1 px-4 shadow-sm rounded-md w-full'/>
        </div>

        <div className='pt-10'>
            <p className='font-semibold text-gray-600'>Description</p>
            {/* Input is put here */}
            <textarea className='mt-2 mx-2 py-2 px-4 shadow-sm rounded-md w-full'/>
        </div>

        <div className='pt-10'>
            <p className='font-semibold text-gray-600'>Location Found</p>
            {/* Input is put here */}
            <input className='mt-2 mx-2 py-1 px-4 shadow-sm rounded-md w-full'/>
        </div>

        <div className='pt-10'>
            <p className='font-semibold text-gray-600'>Date Found</p>
            {/* Input is put here */}
            <div className='flex place-content-between items-center'>
                <input className='mt-2 mx-2 py-1 px-4 shadow-sm rounded-md w-full' placeholder='mm/dd/yyyy'/>
                <CiCalendar className='text-3xl'/>
            </div>
        </div>

        <div className='pt-10'>
            <p className='font-semibold text-gray-600 pb-2'>Upload Images</p>
            {/* Input is put here */}
            <div className='flex items-center flex-col box border-2 border-dotted border-gray-300'>
                <FaCloudArrowUp className='text-5xl text-gray-400'/>
                <p className='text-gray-500'>Upload files or drag and drop</p>
                <p className='text-gray-400'>PNG, JPG up to 10MB</p>
            </div>

            <div className='flex pt-4 gap-4 justify-between'>
                <button className='flex-1 px-2 py-2 rounded-md bg-blue-500 text-white'>Submit Item</button>
                <button className='flex-1 px-2 py-2 rounded-md bg-gray-100 text-gray-600'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

