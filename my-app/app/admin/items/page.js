"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import ItemTable from "../components/ItemTable";
import EditItemModal from "../components/EditItemModal";
import DeleteModal from "../components/DeleteModal";

export default function ItemsManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in as admin
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!loggedIn || userRole !== 'adminUser') {
      router.push('/login');
    } else {
      fetchItems();
    }
  }, [router]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8800/lost_items");
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleSaveItem = async (updatedItem) => {
    try {
      // Add your endpoint for updating items
      await axios.put(`http://localhost:8800/update_item/${editItem.LostItem_ID}`, updatedItem);
      setIsEditModalOpen(false);
      fetchItems(); // Refresh items list
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      // Add your endpoint for deleting items
      await axios.delete(`http://localhost:8800/delete_item/${itemToDelete.LostItem_ID}`);
      setIsDeleteModalOpen(false);
      fetchItems(); // Refresh items list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Items Management</h1>
        </div>
        
        {loading ? (
          <div className="text-center py-10">Loading items...</div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <ItemTable 
              items={items} 
              onEdit={handleEditClick} 
              onDelete={handleDeleteClick} 
            />
          </div>
        )}
      </div>
      
      <EditItemModal 
        item={editItem}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveItem}
      />
      
      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemType="item"
      />
    </div>
  );
}