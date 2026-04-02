import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { MapPin, Award, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: MapPin,
    title: 'Moj DANKÜCHEN Studio',
    description: 'Najbrži put do kuhinje vaših snova',
    link: 'Home#kontakt'
  },
  {
    icon: Award,
    title: 'Prednosti DAN-a',
    description: 'Naš standard je vaša prednost!',
    link: 'DanPrednosti'
  },
  {
    icon: PenTool,
    title: 'Planirajte svoju kuhinju',
    description: 'Pronađite kuhinju svojih snova',
    link: 'IzrisKuhinje'
  }
];

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            O DANKÜCHEN studiju Beograd
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Naša posebnost je što izdvajamo vreme za vas, savetujemo vas, planove računarski
            crtamo i brinemo o stručnoj montaži.
          </p>
          <p className="text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto mt-4 leading-relaxed">
            Trudimo se za zadovoljstvo naših klijenata i garantujemo da ćete kod DAN-a dobiti samo najbolje!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-zinc-800 p-10 rounded-xl hover:bg-zinc-700 transition-all duration-300 hover:shadow-2xl"
            >
              <feature.icon className="w-12 h-12 text-[#c8102e] mb-6" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-zinc-400 mb-6">{feature.description}</p>
              {feature.link ? (
                <Link
                  to={createPageUrl(feature.link)}
                  onClick={(e) => {
                    if (feature.link.includes('#kontakt')) {
                      e.preventDefault();
                      document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-[#c8102e] hover:text-[#a00d26] font-medium uppercase text-sm tracking-wider"
                >
                  Više informacija →
                </Link>
              ) : (
                <button className="text-[#c8102e] hover:text-[#a00d26] font-medium uppercase text-sm tracking-wider">
                  Více informacija →
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}