"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import PostTable from "../components/PostTable";
import EditPostModal from "../components/EditPostModal";
import DeleteModal from "../components/DeleteModal";

export default function PostsManagement() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPost, setEditPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in as admin
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!loggedIn || userRole !== 'adminUser') {
      router.push('/login');
    } else {
      fetchPosts();
    }
  }, [router]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8800/posts");
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  };

  const handleEditClick = (post) => {
    setEditPost(post);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setIsDeleteModalOpen(true);
  };

  const handleSavePost = async (updatedPost) => {
    try {
      // First update post content and title
      await axios.put(`http://localhost:8800/update_post/${editPost.Title}`, {
        Content: updatedPost.Content,
        newTitle: updatedPost.newTitle
      });
      
      // If image was changed, update it separately
      if (updatedPost.Image !== editPost.PostImage) {
        await axios.put(`http://localhost:8800/update_post_image/${updatedPost.newTitle}`, {
          Image: updatedPost.Image
        });
      }
      
      setIsEditModalOpen(false);
      fetchPosts(); // Refresh posts list
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8800/delete_post/${postToDelete.Title}`);
      setIsDeleteModalOpen(false);
      fetchPosts(); // Refresh posts list
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Posts Management</h1>
        </div>
        
        {loading ? (
          <div className="text-center py-10">Loading posts...</div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <PostTable
              posts={posts}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
        )}
      </div>
      
      <EditPostModal
        post={editPost}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSavePost}
      />
      
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemType="post"
      />
    </div>
  );
}