"use client"

import { FaEdit, FaTrash } from 'react-icons/fa';

export default function PostTable({ posts, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Content</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Posted By</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {posts.map((post) => (
            <tr key={post.Title} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-left">{post.Title}</td>
              <td className="py-3 px-6 text-left">
                {post.Content ? (
                  post.Content.length > 50 
                    ? `${post.Content.substring(0, 50)}...` 
                    : post.Content
                ) : ""}
              </td>
              <td className="py-3 px-6 text-left">
                {`${post.Month}/${post.Day}/${post.Year}`}
              </td>
              <td className="py-3 px-6 text-left">
                {post.First_name && post.Last_name 
                  ? `${post.First_name} ${post.Last_name}` 
                  : "Unknown"}
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center gap-4">
                  <button 
                    onClick={() => onEdit(post)} 
                    className="transform hover:text-blue-500 hover:scale-110"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => onDelete(post)} 
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