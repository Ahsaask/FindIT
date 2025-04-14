"use client"

import { FaTrash } from 'react-icons/fa';

export default function UserTable({ users, userType, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Password</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {users.map((user) => (
            <tr key={user[`${userType}_ID_number`]} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-left">{user[`${userType}_ID_number`]}</td>
              <td className="py-3 px-6 text-left">{user.Email}</td>
              <td className="py-3 px-6 text-left">{"********"}</td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button 
                    onClick={() => onDelete(user[`${userType}_ID_number`])} 
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