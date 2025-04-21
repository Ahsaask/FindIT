import React from 'react'
import Image from "next/image";
import Form from "next/form"
import './components.css';
import { useState, useEffect } from "react";
import Dropdown from './Dropdown';
import axios from 'axios';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { FaCloudArrowUp } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";

const category = ['Electronics', 'Bag', 'Accessory', 'Miscellaneous', 'Personal Items', 'Sports & Recreation', 'Academic Materials', 'Clothing'];
const size = ['Small', 'Medium', 'Large'];
const condition = ['New', 'Good', 'Worn', 'Old'];
const color = ["Black", "Blue", "White", 'Silver', 'Red', 'Multicolor'];
const floornum = ['B', "G", "1", "2", '3', '4', '5','6','7','8','9','10','12','13'];

const building = ["Administration Building", 
                "Art Building",
                "Biological Sciences",
                "Cal Wenzel Precision Health",
                "Calgary Centre for Innovative Technology",
                "Canadian Natural Resources Limited Engineering Complex",
                "Central Heating and Cooling Plant",
                "Child Care Centre",
                "Child Development Centre",
                "Clinical Skills Building",
                "Downtown Campus",
                "General Services",
                "Grounds Building",
                "Health Research Innovation Centre",
                "Health Sciences Centre",
                "High Density Library",
                "Hunter Student Commons",
                "Information and Communications Technology Building",
                "International House",
                "Kinesiology Complex",
                "MacEwan Hall",
                "MacEwan Student Centre",
                "MacKimmie Tower",
                "Materials Handling",
                "Math Sciences",
                "Mathison Hall",
                "Mechanical Engineering Building",
                "Multidisciplinary Science Hub",
                "Murray Fraser Hall",
                "Olympic Oval",
                "Olympic Volunteer Centre",
                "Physical Plant",
                "Professional Faculties Building",
                "Reeve Theatre",
                "Residences",
                "Rozsa Centre",
                "Science A",
                "Science B",
                "Science Theatres",
                "Scurfield Hall",
                "Social Sciences",
                "Taylor Family Digital Library",
                "Taylor Family Kinesiology Building",
                "Veterinary Learning Commons",
                'Veterinary Science Research Station'];

const color_id = {"Black":1, "Blue":2, "White":3, 'Silver':4, 'Red':5, 'Multicolor':6}

export default function ReportForm() {
    const [startDate, setStartDate] = useState(new Date());

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedFloorNumber, setSelectedFloorNumber] = useState('');
    const [selectedBuilding, setSelectedBuilding] = useState('');

    const [description, setDescription] = useState('');
    const [itemName, setItemName] = useState('');
    const [address, setAddress] = useState('University Main Campus, 123 Learning St');

    const [showError, setError] = useState(false)
    const [success, setSuccess] = useState(false);

    const [userid, setUserID] = useState("");

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };

    const handleItemNameChange = (event) => {
        setItemName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    useEffect(() => {
          const storedID = localStorage.getItem('userId');
          setUserID(storedID);
        }, []);

    const resetForm = () => {
        setSelectedCategory('');
        setSelectedSize('');
        setSelectedCondition('');
        setSelectedColor('');
        setSelectedFloorNumber('');
        setSelectedBuilding('');
        setDescription('');
        setItemName('');
        setAddress('University Main Campus, 123 Learning St');
        setStartDate(new Date());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple form validation
        if (
            !selectedCategory ||
            !selectedSize ||
            !selectedCondition ||
            !itemName.trim() ||
            !description.trim() ||
            !selectedBuilding ||
            !selectedFloorNumber ||
            !address.trim()
        ) {
            setError(true);
            return;
        }

        setError(false);
        setSuccess(false);

        try {
            const response1 = await axios.post("http://localhost:8800/add_lost_item_location", {
                Floor_number: selectedFloorNumber,
                Location_Name: selectedBuilding,
                Address: address
            })

            const newLocationId = response1.data.insertId;
            // console.log(newLocationId)

            const response2 = await axios.post("http://localhost:8800/add_lost_item", {
                Description: description,
                Name: itemName,
                Status: "Lost",
                Date: startDate.toISOString().split('T')[0],
                Color_id: color_id[selectedColor] || null,
                Location_id: newLocationId,
                Finder_ID_number: userid,
            });

            const newlostid = response2.data.insertId
            // console.log(newlostid)

            const response3 = await axios.post("http://localhost:8800/add_lost_item_specifications", {
                Conditions: selectedCondition,
                Size_Type: selectedSize,
                Category_Name: selectedCategory,
                LostItem_ID: newlostid
            });

            resetForm();
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 4000);
            
          } catch (err) {
            console.log(err);
            setError(true)
          }
    }

  return (
    <div className="mx-64 mt-10 box p-4 bg-white rounded-lg shadow-md">
        <p className='font-semibold text-xl py-2'>Submit Found Item</p>
        <p className='font-extralight text-gray-400'>Please provide detailed information about the item you found</p>

        <hr className='border-1 my-5'></hr>

        <div>
            <p className='font-semibold text-gray-600'>Item Category</p>
            <Dropdown items={category}
                    text="Select Category"
                    value={selectedCategory}
                    onSelect={setSelectedCategory}/>
        </div>

        <div className='pt-10'>
            <p className='font-semibold text-gray-600'>Item Size</p>
            <Dropdown items={size}
                    text="Select Size Type"
                    value={selectedSize}
                    onSelect={setSelectedSize}/>
        </div>

        <div className='pt-10'>
            <p className='font-semibold text-gray-600'>Item Condition</p>
            <Dropdown items={condition}
                    text="Select the condition of the item"
                    value={selectedCondition}
                    onSelect={setSelectedCondition}/>
        </div>

        <div className='pt-10'>
            <p className='font-semibold text-gray-600'>Item Name</p>
            {/* Input is put here */}
            <input value={itemName} onChange={handleItemNameChange} className='mt-2 mx-2 py-1 px-4 shadow-sm rounded-md w-full'/>
        </div>

        <div className='pt-10'>
            <p className='font-semibold text-gray-600'>Description</p>
            {/* Input is put here */}
            <textarea value={description} onChange={handleDescriptionChange} className='mt-2 mx-2 py-2 px-4 shadow-sm rounded-md w-full'/>
        </div>

        <div className='pt-10'>
            <p className='font-semibold text-gray-600'>Item Color</p>
            <Dropdown items={color}
            text="Select the color of the item"
            value={selectedColor}
            onSelect={setSelectedColor}/>
        </div>

        <div className='pt-10'>
            <p className='font-semibold text-gray-600'>Location Found</p>
            {/* Input is put here */}
            <p className='pl-6 py-1 font-medium text-gray-600'>Location Name</p>
            <Dropdown items={building} 
                text='Select Building'
                value={selectedBuilding}
                onSelect={setSelectedBuilding}/>

            <p className='mt-2 pl-6 py-2 font-medium text-gray-600'>Location Floor Number</p>
            <Dropdown items={floornum} 
                text='Select Floor Number'
                value={selectedFloorNumber}
                onSelect={setSelectedFloorNumber}/>

            <p className='mt-2 pl-6 py-2 font-medium text-gray-600'>Address</p>
            <input value={address} onChange={handleAddressChange} className='mt-2 mx-2 py-1 px-4 shadow-sm rounded-md w-full'/>
        </div>

        <div className='pt-10'>
            <p className='font-semibold text-gray-600'>Date Found</p>
            {/* Input is put here */}
            <div className='flex place-content-between items-center mt-2 mx-2'>
                {/* <input className='mt-2 mx-2 py-1 px-4 shadow-sm rounded-md w-full' placeholder='mm/dd/yyyy'/>
                <CiCalendar className='text-3xl'/> */}
                <DatePicker
                showIcon className='shadow-sm rounded-md'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                />
            </div>
        </div>

        <div className='pt-10'>

            <div className='flex pt-4 gap-4 justify-between'>
                <button onClick={handleSubmit} className='flex-1 px-2 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white'>Submit Item</button>
                {/* <button className='flex-1 px-2 py-2 rounded-md bg-gray-100 text-gray-600'>Cancel</button> */}
            </div>
            {showError && (
                <div className="mt-4 text-red-500 font-semibold">
                    Please fill in all required fields before submitting.
                </div>
            )}
            {success && (
                <div className="mt-4 text-green-600 font-semibold">
                    Item submitted successfully!
                </div>
            )}
        </div>
    </div>
  )
}

