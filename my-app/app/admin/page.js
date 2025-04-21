"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import AdminNavbar from "./components/AdminNavbar";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [lostitems, setLostItems] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({
    finders: [],
    owners: []
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in as admin
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!loggedIn || userRole !== 'adminUser') {
      router.push('/login');
    } else {
      setIsAdmin(true);
      fetchData();
    }
  }, [router]);

  const fetchData = async () => {
    try {
      // Fetch lost items
      const itemsRes = await axios.get("http://localhost:8800/lost_items");
      setLostItems(itemsRes.data);
      
      // Fetch posts
      const postsRes = await axios.get("http://localhost:8800/posts");
      setPosts(postsRes.data);
      
      // Fetch users
      const findersRes = await axios.get("http://localhost:8800/finder_accounts");
      const ownersRes = await axios.get("http://localhost:8800/owner_accounts");
      
      setUsers({
        finders: findersRes.data,
        owners: ownersRes.data
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      {isAdmin && (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Total Items</h2>
              <p className="text-3xl font-bold">{lostitems.length}</p>
              <button 
                onClick={() => router.push('/admin/items')}
                className="mt-4 text-blue-500 hover:text-blue-700"
              >
                View All Items
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Total Posts</h2>
              <p className="text-3xl font-bold">{posts.length}</p>
              <button 
                onClick={() => router.push('/admin/posts')}
                className="mt-4 text-blue-500 hover:text-blue-700"
              >
                View All Posts
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Total Finders</h2>
              <p className="text-3xl font-bold">{users.finders.length}</p>
              <button 
                onClick={() => router.push('/admin/users')}
                className="mt-4 text-blue-500 hover:text-blue-700"
              >
                View All Users
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Total Owners</h2>
              <p className="text-3xl font-bold">{users.owners.length}</p>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Admin Panel Overview</h2>
            <p className="mb-4">Welcome to the FindIt Admin Panel. From here you can:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>View and manage all lost and found items</li>
              <li>Edit item details such as description, name, and status</li>
              <li>Manage all posts created by users</li>
              <li>Edit post content and images</li>
              <li>Manage user accounts (finders and owners)</li>
              <li>View system statistics</li>
            </ul>
            <p>Use the navigation above to access different sections of the admin panel.</p>
          </div>
        </div>
      )}
    </div>
  );
}