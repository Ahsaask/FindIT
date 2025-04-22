"use client"

import Navbar from "./components/HomePageNavbar";
import ReportForm from "./components/ReportForm";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";

import { FaRegBell } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { BsFileEarmarkPostFill } from "react-icons/bs";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userid, setUserID] = useState("");
    const router = useRouter();

    const [lostitems, setLostItems] = useState([]);
    const [claims, setClaims] = useState([]);
    const [numberOfItems, setNumItems] = useState(0);
    const [numberOfClaims, setNumClaims] = useState(0);
    const [currentUserRole, setUserRole] = useState("");

    const [showSubmitItem, setShowSubmitItem] = useState(false);
    const [showClaimPopup, setShowClaimPopup] = useState(false);
    const [claimText, setClaimText] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(null); // to track which item is being claimed

    useEffect(() => {
          const storedID = localStorage.getItem('userId');
          setUserID(storedID);
        }, []);


    useEffect(() => {
        const fetchAllLostItems = async () => {
            try {
                const res = await axios.get("http://localhost:8800/lost_items");
                if (res.status === 200) {
                    setLostItems(res.data);
                    setNumItems(res.data.length);
                } else {
                    console.error("Failed to fetch lost items: ", res.statusText);
                }
            } catch (err) {
                console.error("Error fetching lost items: ", err);
            }
        };
        fetchAllLostItems();
    }, []);

    useEffect(() => {
        const fetchAllClaims = async () => {
            try {
                const res = await axios.get("http://localhost:8800/claim_items");
                if (res.status === 200) {
                    setClaims(res.data);
                    setNumClaims(res.data.length);
                } else {
                    console.error("Failed to fetch claims: ", res.statusText);
                }
            } catch (err) {
                console.error("Error fetching claims: ", err);
            }
        };
        fetchAllClaims();
    }, []);

    useEffect(() => {
        // Example: Check login status from localStorage (or cookies, auth context, etc.)
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (!loggedIn) {
            router.push('/Login'); // Redirect to login if not logged in
        };

        const userRole = localStorage.getItem('userRole')
        setUserRole(userRole);

    }, [router]);

    const handleSubmitClaim = async (e) => {
        e.preventDefault();
        console.log("Submit claim for item ID:", selectedItemId, "OwnerID:", userid, "Text:", claimText, "Status:", "Pending");

        try {
            await axios.post("http://localhost:8800/add_newclaim", {
                Owner_ID_number: userid,
                LostItem_ID: selectedItemId,
                Status: "Pending",
                Text: claimText
            });
                                    
            setShowClaimPopup(false);
            setClaimText('');

          } catch (err) {
            console.log(err);
            setError(true)
          }
    }

    return (
        <div className="my-24">
            <Navbar />
            <div className='containerHome grid grid-cols-2 gap-24'>

                {/* ALL ARE TEMPLATE NEED TO CHANGE FOR DYNAMIC*/}
                <div className="box p-4 bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Total Items</p>
                        <FaBox className="text-blue-500 text-xl" />
                    </div>
                    <p className="text-4xl font-bold mt-2">{numberOfItems}</p>
                    {/* <p className="text-green-600 mt-2 flex items-center">
                        <span className="mr-1"><FaArrowUp /></span> 12% from last month
                    </p> */}
                </div>

                <div className="box p-4 bg-white shadow-md">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Active Claims</p>
                        <FaClipboardCheck className="text-blue-500 text-xl" />
                    </div>
                    <p className="text-4xl font-bold mt-2">{numberOfClaims}</p>
                </div>

            </div>

            <div className="containerHome mt-10 box bg-white shadow-md overflow-auto">
                <p className="pb-5 text-lg font-semibold">Recent Items</p>

                <table className="table-auto w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-400 text-left">
                            <th className="px-4 py-3">Item</th>
                            <th className="px-4 py-3">Location</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Date</th>
                            {currentUserRole==='ownerUser' && (<th className="px-4 py-3">Action</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {lostitems.map((item, index) => (
                            <tr className="text-left" key={item.id || index}>
                                <td className="px-4 py-4 flex items-center gap-4">
                                    {/* <FaLaptop className='text-xl'/> */}
                                    <div>
                                        <p className='font-semibold'>{item?.Description || "N/A"}</p>
                                        <p className='font-thin text-gray-500'>{item?.Name || "N/A"}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-4">{item?.Location_Name || "Unknown"} - Floor {item?.Floor_number || "N/A"}</td>
                                <td className="px-4 py-4 text-left">
                                    {item?.Status === "Found" ? (
                                        <p className='inline-block px-5 py-1 font-semibold text-green-900 bg-green-100 rounded-full border border-green-100'>Found</p>
                                    ) : item?.Status === "Claimed" ? (
                                        <p className='inline-block px-5 py-1 font-semibold text-blue-900 bg-blue-100 rounded-full border border-blue-100'>Claimed</p>
                                    ) : (
                                        <p className='inline-block px-5 py-1 font-semibold text-red-900 bg-red-100 rounded-full border border-red-100'>Lost</p>
                                    )}
                                </td>
                                <td className="px-4 py-4">{new Date(item.Date).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                                {currentUserRole==='ownerUser' && (
                                    <td
                                    onClick={() => {
                                      setSelectedItemId(item.LostItem_ID); // or the correct ID field
                                      setShowClaimPopup(true);
                                    }}
                                    className="px-4 py-4 text-blue-500 cursor-pointer"
                                  >
                                    Make Claim
                                  </td>
                                    )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

                <div>
                <div className='containerHome mt-10 grid grid-cols-2 gap-6 px-56'>
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
                        <div className='grid grid-row-3 gap-6'>
                            {currentUserRole==='finderUser' && (<button onClick={() => setShowSubmitItem(!showSubmitItem)} className='flex items-center border-dotted border-gray-300 border-2 rounded-lg flex-col py-3 hover:bg-gray-100'>
                                <IoIosAdd className='text-blue-500 text-3xl'/>
                                <p className='font-semibold text-sm'>Add Item</p>
                            </button>)}

                            {(currentUserRole==='ownerUser' || currentUserRole==='finderUser') && (
                                <button onClick={() => router.push('/messages')} className='flex items-center border-dotted border-gray-300 border-2 rounded-lg flex-col py-3 hover:bg-gray-100'>
                                    <FaMessage className='text-blue-500 text-3xl'/>
                                    <p className='font-semibold text-sm'>Messages</p>
                                </button>
                            )}

                            <button onClick={() => router.push('/view-posts')} className='flex items-center border-dotted border-gray-300 border-2 rounded-lg flex-col py-3 hover:bg-gray-100'>
                                <BsFileEarmarkPostFill className='text-blue-500 text-3xl'/>
                                <p className='font-semibold text-sm'>View Posts</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {currentUserRole === 'finderUser' && showSubmitItem === true && (<ReportForm />)}

            {showClaimPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 shadow-md w-96">
                        <h2 className="text-lg font-semibold mb-4">Submit Claim</h2>
                        <textarea
                            className="w-full h-28 border border-gray-300 rounded-md p-2 text-sm"
                            placeholder="Enter your reason for claiming this item..."
                            value={claimText}
                            onChange={(e) => setClaimText(e.target.value)}
                        />
                        <div className="flex justify-end mt-4 gap-2">
                            <button
                                onClick={() => {
                                    setShowClaimPopup(false);
                                    setClaimText('');
                                }}
                                className="px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitClaim}
                                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                            >
                            Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    )
    
}