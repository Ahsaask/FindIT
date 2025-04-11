"use client"

import Navbar from "./components/Navbar";
import ReportForm from "./components/ReportForm";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { FaRegBell } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { FaClock } from "react-icons/fa6";
import { FaLaptop } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Example: Check login status from localStorage (or cookies, auth context, etc.)
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
        if (!loggedIn) {
          router.push('/login'); // Redirect to login if not logged in
        };
    }, [router]);

    return (
        <div className="my-24">
            <Navbar />
            <div className='containerHome grid grid-cols-3 gap-6'>

                {/* ALL ARE TEMPLATE NEED TO CHANGE FOR DYNAMIC*/}
                <div className="box p-4 bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Total Items</p>
                        <FaBox className="text-blue-500 text-xl" />
                    </div>
                    <p className="text-4xl font-bold mt-2">247</p>
                    <p className="text-green-600 mt-2 flex items-center">
                        <span className="mr-1"><FaArrowUp /></span> 12% from last month
                    </p>
                </div>

                <div className="box p-4 bg-white shadow-md">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Active Claims</p>
                        <FaClipboardCheck className="text-blue-500 text-xl" />
                    </div>
                    <p className="text-4xl font-bold mt-2">38</p>
                    <p className="text-orange-600 mt-2 flex items-center">
                        <span className="mr-1"><FaClock /></span> 8 pending approval
                    </p>
                </div>

                <div className="box p-4 bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Success Rate</p>
                        <GoGraph  className="text-blue-500 text-xl" />
                    </div>
                    <p className="text-4xl font-bold mt-2">89%</p>
                    <p className="text-green-600 mt-2 flex items-center">
                        <span className="mr-1"><FaArrowUp /></span> 5% from last month
                    </p>
                </div>
            </div>

            <div className="containerHome mt-10 box bg-white shadow-md">
                <p className="pb-5 text-lg font-semibold">Recent Items</p>

                <table className="table-auto w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-400 text-left">
                            <th className="px-4 py-3">Item</th>
                            <th className="px-4 py-3">Location</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-left">
                            <td className="px-4 py-4 flex items-center gap-4">
                                <FaLaptop className='text-xl'/>
                                <div>
                                    <p className='font-semibold'>MacBook Pro</p>
                                    <p className='font-thin text-gray-500'>Electronics</p>
                                </div>
                            </td>
                            <td className="px-4 py-4">Library - Floor 3</td>
                            <td className="px-4 py-4 text-left">
                                <p className='inline-block px-5 py-1 font-semibold text-green-900 bg-green-100 rounded-full border border-green-100'>Found</p>
                            </td>
                            <td className="px-4 py-4">Jan 15, 2025</td>
                            <td className="px-4 py-4 text-blue-500">View Details</td>
                        </tr>
                    </tbody>
                </table>
            </div>

                <div>
                <div className='containerHome mt-10 grid grid-cols-2 gap-6'>
                    <div className="box p-4 bg-white rounded-lg shadow-md">
                        <p className="text-lg font-semibold">Recent Notifications</p>
                        <hr className='border-1 my-5'></hr>
                        <div className='flex items-center gap-4'>
                            <FaRegBell className='text-xl text-blue-500'/>
                            <div>
                                <p className='font-semibold text-sm py-1'>New claim request</p>
                                <p className='font-thin text-gray-500 text-sm py-1'>John Does submitted a claim for MacBook Pro</p>
                                <p className='font-thin text-gray-500 text-xs py-1 inline-block'>2 hours ago</p>
                            </div>
                        </div>
                    </div>

                    <div className="box p-4 bg-white rounded-lg shadow-md">
                        <p className="text-lg font-semibold">Quick Actions</p>
                        <hr className='border-1 my-5'></hr>
                        <div className='grid grid-cols-2 gap-6'>
                            <div className='flex items-center border-dotted border-gray-300 border-2 rounded-lg flex-col py-3'>
                                <IoIosAdd className='text-blue-500 text-3xl'/>
                                <p className='font-semibold text-sm'>Add Item</p>
                            </div>

                            <div className='flex items-center border-dotted border-gray-300 border-2 rounded-lg flex-col py-3'>
                                <IoSearch className='text-blue-500 text-3xl'/>
                                <p className='font-semibold text-sm'>Search Items</p>
                            </div>

                            <div className='flex items-center border-dotted border-gray-300 border-2 rounded-lg flex-col py-3'>
                                <FaMessage className='text-blue-500 text-3xl'/>
                                <p className='font-semibold text-sm'>Messages</p>
                            </div>

                            <div className='flex items-center border-dotted border-gray-300 border-2 rounded-lg flex-col py-3'>
                                <IoMdSettings className='text-blue-500 text-3xl'/>
                                <p className='font-semibold text-sm'>Settings</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReportForm/>

        </div>
    )
}