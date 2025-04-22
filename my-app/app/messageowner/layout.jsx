"use client";
import HomePageNavbar from "../homepage/components/HomePageNavbar";

export default function MessagesLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <HomePageNavbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
} 