"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import UserTable from "../components/UserTable";
import DeleteModal from "../components/DeleteModal";

export default function UsersManagement() {
  const [users, setUsers] = useState({
    finders: [],
    owners: []
  });
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userTypeToDelete, setUserTypeToDelete] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in as admin
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!loggedIn || userRole !== 'adminUser') {
      router.push('/login');
    } else {
      fetchUsers();
    }
  }, [router]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const findersRes = await axios.get("http://localhost:8800/finder_accounts");
      const ownersRes = await axios.get("http://localhost:8800/owner_accounts");
      
      setUsers({
        finders: findersRes.data,
        owners: ownersRes.data
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleDeleteFinder = (finderId) => {
    setUserToDelete(finderId);
    setUserTypeToDelete('Finder');
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOwner = (ownerId) => {
    setUserToDelete(ownerId);
    setUserTypeToDelete('Owner');
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (userTypeToDelete === 'Finder') {
        // Add your endpoint for deleting finder users
        await axios.delete(`http://localhost:8800/delete_finder/${userToDelete}`);
      } else if (userTypeToDelete === 'Owner') {
        // Add your endpoint for deleting owner users
        await axios.delete(`http://localhost:8800/delete_owner/${userToDelete}`);
      }
      setIsDeleteModalOpen(false);
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Users Management</h1>
        </div>
        
        {loading ? (
          <div className="text-center py-10">Loading users...</div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Finders</h2>
              <UserTable 
                users={users.finders}
                userType="Finder"
                onDelete={handleDeleteFinder}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Owners</h2>
              <UserTable 
                users={users.owners}
                userType="Owner"
                onDelete={handleDeleteOwner}
              />
            </div>
          </div>
        )}
      </div>
      
      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemType="user"
      />
    </div>
  );
}