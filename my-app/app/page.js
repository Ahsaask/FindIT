'use client';

import { useEffect } from 'react';
import Navbar from './components/navigation/Navbar';
import Hero from './components/sections/Hero';
import HowItWorks from './components/sections/HowItWorks';
import Stats from './components/sections/Stats';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';
import CTA from './components/sections/CTA';
import Footer from './components/navigation/Footer';
import { useAnimations } from './lib/utils/animation';

function useInitializeAnimations() {
  useAnimations();
}

export default function Home() {
  useInitializeAnimations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA /> 
      <Footer />
    </div>
  );
}