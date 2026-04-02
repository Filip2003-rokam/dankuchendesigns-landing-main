import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { createPageUrl } from '../../utils';

export default function QualitySection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left - Image with Award Badge */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80"
                alt="DANKÜCHEN Kitchen"
                className="w-full h-full object-cover"
              />
              {/* Award Badge Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-72 h-72">
                  {/* Brush Circle Background - More organic */}
                  <svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute inset-0">
                    <path
                      d="M 150,30 
                         Q 200,35 230,70
                         Q 265,105 270,150
                         Q 265,195 230,230
                         Q 195,265 150,270
                         Q 105,265 70,230
                         Q 35,195 30,150
                         Q 35,105 70,70
                         Q 120,35 150,30 Z"
                      fill="none"
                      stroke="#e6b800"
                      strokeWidth="28"
                      strokeLinecap="round"
                      opacity="0.95"
                    />
                  </svg>
                  {/* Center Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-zinc-900/95 backdrop-blur-sm rounded-full w-56 h-56 flex flex-col items-center justify-center text-white shadow-2xl">
                      <div className="text-lg tracking-[0.35em] font-bold mb-1">QUALITY</div>
                      <div className="text-lg tracking-[0.35em] font-bold mb-3">AWARD</div>
                      <div className="text-7xl font-bold">2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="italic font-light">Prestižna</span>
              <br />
              <span className="font-semibold">nagrada za</span>
              <br />
              <span className="italic font-light">kvalitet</span>
            </h2>
            
            <div className="space-y-3 sm:space-y-4 text-zinc-500">
              <p className="text-sm sm:text-base leading-relaxed">
                Sa ponosom vam saopštavamo da je brend DANKÜCHEN već osmu godinu zaredom 
                na vrhu i primio nagradu za najbolji kvalitet <span className="font-semibold text-zinc-600">QUALITY AWARD 2025.</span>
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-zinc-600">Svim</span> našim klijentima i partnerima se 
                <span className="font-semibold text-zinc-600"> zahvaljujemo na poverenju</span> i posvećenosti odličnosti.
              </p>
            </div>

            <div className="flex items-center gap-4 sm:gap-8">
              <Button 
                className="bg-white border-2 border-[#c8102e] text-[#c8102e] hover:bg-[#c8102e] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold transition-all duration-300"
                onClick={() => window.location.href = createPageUrl('IzrisKuhinje')}
              >
                VERUJTE NAM
              </Button>
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-300" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}