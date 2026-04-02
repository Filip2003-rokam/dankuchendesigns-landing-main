import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';

const kitchenModels = [
  {
    name: 'Model Classico',
    subtitle: 'Eiche Nordic Polarweiß',
    image: 'https://dankuchenmaribor.si/wp-content/uploads/2019/11/Classico-eiche-nordic-polarweiss.png',
    link: 'ModelClassico'
  },
  {
    name: 'Model Lion Classic',
    subtitle: 'Goldhorn Polarweiß',
    image: 'https://dankuchenmaribor.si/wp-content/uploads/2019/11/kuhinja-Lion-Classic-Goldhorn-polarweiss2-dankuchen-Lokev.jpg'
  },
  {
    name: 'Model Silbermond',
    subtitle: 'Eiche Nordic Anthrazit',
    image: 'https://dankuchenmaribor.si/wp-content/uploads/2019/03/Silbermond-eiche-nordic-anthrazit.png'
  },
  {
    name: 'Model Living',
    subtitle: 'Fliederweiß',
    image: 'https://dankuchenmaribor.si/wp-content/uploads/2019/03/074_075-Living-Glasr%C3%BCckwand-Fliederwei%C3%9F_Dan_K%C3%BCchen-2.jpg'
  },
  {
    name: 'Model La Corte',
    subtitle: 'Manhattan Grau Eiche Nordic Anthrazit',
    image: 'https://dankuchenmaribor.si/wp-content/uploads/2019/03/La-Corte-manhattan-grau-eiche-nordic-anthrazit.png'
  },
  {
    name: 'Model Sevilla',
    subtitle: 'Fliederweiß Burguesa',
    image: 'https://dankuchenmaribor.si/wp-content/uploads/2019/03/Sevilla_Fliederwei%C3%9F_Burguesa_dan_kuchen.png'
  },
  {
    name: 'Model Andros',
    subtitle: 'Anthrazit Asteiche',
    image: 'https://dankuchenmaribor.si/wp-content/uploads/2019/03/Andros-anthrazit-asteiche.png'
  },
  {
    name: 'Model Amica',
    subtitle: 'Eiche Nordic Fjord Grün',
    image: 'https://dankuchenmaribor.si/wp-content/uploads/2019/03/Amica-nordic-eiche-fjord-gru%CC%88n.png'
  }
];

export default function ModerneKuhinje() {
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1600&q=80"
          alt="Moderne kuhinje"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="italic">Moderna</span> <span className="font-semibold">kolekcija</span>
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Istražite našu ekskluzivnu kolekciju modernih kuhinja
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 sm:py-12 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8102e]"
              >
                <option value="all">Svi modeli</option>
                <option value="classico">Model Classico</option>
                <option value="lion">Model Lion Classic</option>
                <option value="silbermond">Model Silbermond</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Stil</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8102e]"
              >
                <option value="all">Svi stilovi</option>
                <option value="handle">Sa ručkama</option>
                <option value="handleless">Bez ručki</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen Models Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {kitchenModels.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">{model.name}</h3>
                  <p className="text-sm sm:text-base text-zinc-600 mb-4">{model.subtitle}</p>
                  {model.link ? (
                    <Link to={createPageUrl(model.link)}>
                      <Button 
                        variant="outline" 
                        className="w-full border-[#c8102e] text-[#c8102e] hover:bg-[#c8102e] hover:text-white"
                      >
                        Saznajte više
                      </Button>
                    </Link>
                  ) : (
                    <Link to={createPageUrl('IzrisKuhinje')}>
                      <Button 
                        variant="outline" 
                        className="w-full border-[#c8102e] text-[#c8102e] hover:bg-[#c8102e] hover:text-white"
                      >
                        Zakažite konsultaciju
                      </Button>
                    </Link>
                  )}
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
              Pronađite <span className="italic">svoju savršenu kuhinju</span>
            </h2>
            <p className="text-lg sm:text-xl text-zinc-300 mb-8">
              Naš tim stručnjaka će vam pomoći da odaberete idealan model za vaš prostor
            </p>
            <Link to={createPageUrl('IzrisKuhinje')}>
              <Button className="bg-[#c8102e] hover:bg-[#a00d26] px-10 py-6 text-sm uppercase tracking-[0.2em]">
                Zakažite besplatnu konsultaciju
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}