import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { createPageUrl } from '../../utils';

const products = [
  {
    title: 'Dobrodošli kod nas!',
    subtitle: 'Novi DANKÜCHEN studio Beograd',
    cta: 'Zakažite planiranje',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&q=80'
  },
  {
    title: 'DAN kolekcija',
    subtitle: 'Kuhinjski trendovi koji će ove godine biti nezamenljiv izbor za svaki dom.',
    cta: 'Želim kuhinju',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'
  }
];

export default function ProductShowcase() {
  return (
    <section className="py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group overflow-hidden rounded-lg shadow-xl"
            >
              <div className="aspect-[4/5] relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-light mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                    {product.title}
                  </h3>
                  <p className="text-base mb-6 opacity-90">
                    {product.subtitle}
                  </p>
                  <Button 
                    className="bg-[#c8102e] hover:bg-[#a00d26] text-white uppercase tracking-wider"
                    onClick={() => window.location.href = createPageUrl('IzrisKuhinje')}
                  >
                    {product.cta}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}