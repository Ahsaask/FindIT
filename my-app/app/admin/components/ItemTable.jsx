"use client"

import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function ItemTable({ items, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Location</th>
            <th className="py-3 px-6 text-center">Date</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-left">{index + 1}</td>
              <td className="py-3 px-6 text-left">{item.Name}</td>
              <td className="py-3 px-6 text-left">
                {item.Description ? 
                  (item.Description.length > 40 ? 
                    `${item.Description.substring(0, 40)}...` : 
                    item.Description) : 
                  'No description'}
              </td>
              <td className="py-3 px-6 text-left">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.Status === 'Found' ? 'bg-green-200 text-green-800' : 
                  item.Status === 'Lost' ? 'bg-red-200 text-red-800' : 
                  'bg-yellow-200 text-yellow-800'}`}>
                  {item.Status}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                {item.Location_Name ? 
                  `${item.Location_Name} (Floor ${item.Floor_number})` : 
                  'Unknown'}
              </td>
              <td className="py-3 px-6 text-center">
                {new Date(item.Date).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button 
                    onClick={() => onEdit(item)} 
                    className="transform hover:text-blue-500 hover:scale-110 mr-3"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => onDelete(item)} 
                    className="transform hover:text-red-500 hover:scale-110"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}