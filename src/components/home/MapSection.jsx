import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapSection() {
  // Coordinates for DAN KUHINJE - Gocka 47a, Beograd
  const position = [44.7252386, 20.4191228];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light italic mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Naša lokacija
          </h2>
          <p className="text-lg text-zinc-600 mb-2">DANKÜCHEN Studio Beograd</p>
          <p className="text-base text-zinc-500 mb-2">Gočka 47a, Vidikovac, Beograd</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-zinc-600">
            <a href="tel:0652828141" className="hover:text-[#c8102e] transition-colors">065 282 8141</a>
            <span className="hidden sm:inline text-zinc-400">•</span>
            <a href="tel:062277697" className="hover:text-[#c8102e] transition-colors">062 277 697</a>
            <span className="hidden sm:inline text-zinc-400">•</span>
            <a href="mailto:dk.vidikovac@gmail.com" className="hover:text-[#c8102e] transition-colors">dk.vidikovac@gmail.com</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl overflow-hidden shadow-2xl"
        >
          <MapContainer 
            center={position} 
            zoom={16} 
            style={{ height: '500px', width: '100%' }}
            scrollWheelZoom={false}
            dragging={true}
            zoomControl={true}
            doubleClickZoom={true}
            touchZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <div className="text-center">
                  <strong>DANKÜCHEN Studio Beograd</strong><br />
                  Gočka 47a, Vidikovac<br />
                  Beograd 11090<br />
                  <a href="tel:0652828141" className="text-blue-600">065 282 8141</a>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      </div>
    </section>
  );
}