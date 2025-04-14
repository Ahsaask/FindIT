"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AdminNavbar() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in as admin
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!loggedIn || userRole !== 'adminUser') {
      router.push('/login');
    } else {
      setIsAdmin(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/admin" className="text-xl font-bold">
              FindIt Admin
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/admin" className="hover:text-blue-200">
              Dashboard
            </Link>
            <Link href="/admin/items" className="hover:text-blue-200">
              Items
            </Link>
            <Link href="/admin/users" className="hover:text-blue-200">
              Users
            </Link>
          </div>
          
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}