import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const features = [
  'Bezvremenska elegancija',
  'Vrhunski materijali',
  'Ručna izrada detalja',
  'Prilagođena dimenzija',
  'Tradicionalni dizajn',
  'Moderna funkcionalnost'
];

export default function ModelClassico() {
  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1600&q=80"
          alt="Model Classico"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] mb-4 uppercase">
              Model Classico
            </p>
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="italic">Klasičan</span> <span className="font-semibold">i bezvremeni</span>
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Kuhinja koja spaja tradiciju i modernu funkcionalnost
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                <span className="italic">Elegancija</span> <span className="font-semibold">koja traje</span>
              </h2>
              <p className="text-base sm:text-lg text-zinc-600 mb-6 leading-relaxed">
                Model Classico predstavlja savršenu ravnotežu između tradicionalnog zanata i savremene funkcionalnosti. 
                Svaki detalj je pažljivo osmišljen kako bi stvorio kuhinju koja će ostati moderna decenijama.
              </p>
              <p className="text-base sm:text-lg text-zinc-600 mb-8 leading-relaxed">
                Sa svojom bezvreменskom elegancijom, Model Classico je idealan izbor za one koji cene kvalitet, 
                trajnost i sofisticiran dizajn.
              </p>

              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#c8102e] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-zinc-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to={createPageUrl('IzrisKuhinje')}>
                <Button className="bg-[#c8102e] hover:bg-[#a00d26] px-8 py-6 text-sm uppercase tracking-[0.2em]">
                  Planirajte svoju kuhinju
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80"
                alt="Classico detalji"
                className="w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="italic">Zašto</span> <span className="font-semibold">Classico?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Kvalitetni materijali',
                description: 'Koristimo samo najkvalitetnije materijale koji garantuju dugotrajnost i otpornost.',
                image: 'https://images.unsplash.com/photo-1565183928294-7d22f2a3e042?w=600&q=80'
              },
              {
                title: 'Pažljiva izrada',
                description: 'Svaki element je precizno izrađen sa pažnjom posvećenom svakom detalju.',
                image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80'
              },
              {
                title: 'Prilagodljiv dizajn',
                description: 'Prilagodimo svaki element vašim potrebama i prostoru.',
                image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-zinc-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Spremni za <span className="italic">vašu novu kuhinju?</span>
            </h2>
            <p className="text-lg sm:text-xl text-zinc-300 mb-8">
              Zakažite besplatnu konsultaciju i 3D projektovanje u našem studiju
            </p>
            <Link to={createPageUrl('IzrisKuhinje')}>
              <Button className="bg-[#c8102e] hover:bg-[#a00d26] px-10 py-6 text-sm uppercase tracking-[0.2em]">
                Zakažite konsultaciju
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}