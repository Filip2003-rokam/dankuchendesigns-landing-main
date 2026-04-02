import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { createPageUrl } from '../../utils';

const slides = [
  {
    title: 'ODLIČAN IZBOR',
    subtitle: 'DAN First',
    description: 'Najveći paket kuhinje po najnižoj ceni',
    cta: 'Uštedite 20%',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&q=80'
  },
  {
    title: 'Klasičan i bezvremeni',
    subtitle: 'Model Classico',
    description: 'Elegancija u svakom detalju',
    cta: 'Planirajte sa nama',
    image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1920&q=80'
  },
  {
    title: 'DANKÜCHEN kolekcija',
    subtitle: 'Kuhinje po vašem ukusu',
    description: 'Otkrijte našu novu kolekciju',
    cta: 'Više',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1920&q=80'
  },
  {
    title: 'Planirajte sa nama',
    subtitle: 'Do kuhinje iz snova',
    description: 'Samo u nekoliko koraka',
    cta: 'Planirajte svoju kuhinju',
    image: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=1920&q=80'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slides[currentSlide].image})`
            }}
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6">
            <div className="max-w-4xl w-full">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6 uppercase font-light"
              >
                {slides[currentSlide].title}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light mb-6 sm:mb-8"
                style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
              >
                {slides[currentSlide].subtitle}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-white text-base sm:text-lg md:text-xl mb-8 sm:mb-10 font-light px-4"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Button 
                  className="bg-[#c8102e] hover:bg-[#a00d26] text-white px-6 sm:px-10 py-5 sm:py-7 text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold shadow-xl"
                  onClick={() => window.location.href = createPageUrl('IzrisKuhinje')}
                >
                  {slides[currentSlide].cta}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#c8102e] transition-colors p-1.5 sm:p-2 bg-black/30 rounded-full backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#c8102e] transition-colors p-1.5 sm:p-2 bg-black/30 rounded-full backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 text-white text-lg sm:text-2xl font-light">
        {currentSlide + 1}/{slides.length}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center hidden sm:flex">
        <p className="text-sm mb-2 tracking-wide">Skroluj dole</p>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </div>
    </div>
  );
}