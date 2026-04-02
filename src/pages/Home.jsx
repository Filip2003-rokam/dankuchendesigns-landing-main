import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSlider from '../components/home/HeroSlider';
import ProductShowcase from '../components/home/ProductShowcase';
import QualitySection from '../components/home/QualitySection';
import AboutSection from '../components/home/AboutSection';
import BlogSection from '../components/home/BlogSection';
import Newsletter from '../components/home/Newsletter';
import MapSection from '../components/home/MapSection';


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSlider />
      <div id="first">
        <QualitySection />
      </div>
      <div id="kuhinje">
        <ProductShowcase />
      </div>
      <div id="studio">
        <AboutSection />
      </div>
      <BlogSection />
      <Newsletter />
      <div id="kontakt" style={{ scrollMarginTop: '100px' }}>
        <MapSection />
      </div>
    </div>
  );
}