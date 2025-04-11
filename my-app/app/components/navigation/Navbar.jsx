'use client'
 
import { useRouter } from 'next/navigation'


export default function Navbar() {

    const router = useRouter()

    return (
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-sm px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Find<span className="text-blue-500">It</span>
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">How It Works</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">Testimonials</a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105">FAQ</a>
          </div>
          <div>
            <button type="button" onClick={() => router.push('/Signup')} className="px-4 py-2 text-blue-600 border border-blue-400 rounded-full hover:bg-blue-50 transition-all duration-300 hover:shadow-lg hover:border-blue-600">
              Sign In
            </button>
          </div>
        </div>
      </nav>
    );
  }