import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPageName]);

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        // User not logged in
      }
    };
    checkUser();
  }, []);

  const menuItems = [
    { label: 'AKTUELNO', page: 'Blog' },
    { label: 'KUHINJE', page: 'ModerneKuhinje' },
    { label: 'CLASSICO', page: 'ModelClassico' },
    { label: 'STUDIO', page: 'Home', hash: '#studio' },
    { label: 'PLANIRANJE KUHINJE', page: 'IzrisKuhinje' },
    { label: 'KONTAKT', page: 'Home', hash: '#kontakt' },
  ];

  if (user?.role === 'admin') {
    menuItems.push({ label: 'ADMIN', page: 'Admin' });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center space-x-2">
              <div className="text-white">
                <div className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  DanKüchen
                </div>
                <div className="text-[10px] tracking-[0.3em] opacity-90 -mt-1">Studio Beograd</div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-10">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.hash ? createPageUrl(item.page) + item.hash : createPageUrl(item.page)}
                  onClick={(e) => {
                    if (item.hash && currentPageName === item.page) {
                      e.preventDefault();
                      document.querySelector(item.hash)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-white text-xs tracking-[0.15em] uppercase hover:text-[#c8102e] transition-colors duration-300 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-lg">
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.hash ? createPageUrl(item.page) + item.hash : createPageUrl(item.page)}
                  onClick={(e) => {
                    if (item.hash && currentPageName === item.page) {
                      e.preventDefault();
                      document.querySelector(item.hash)?.scrollIntoView({ behavior: 'smooth' });
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="block text-white text-sm tracking-wide hover:text-[#c8102e] transition-colors py-2"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                DanKüchen
              </h3>
              <p className="text-sm text-zinc-400">
                Studio Beograd
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 tracking-wide">KONTAKT</h4>
              <p className="text-sm text-zinc-400 mb-2">
                Gočka 47a, Beograd
              </p>
              <p className="text-sm text-zinc-400 mb-2">
                <a href="tel:0652828141" className="hover:text-white transition-colors">065 282 8141</a>
              </p>
              <p className="text-sm text-zinc-400 mb-2">
                <a href="tel:062277697" className="hover:text-white transition-colors">062 277 697</a>
              </p>
              <p className="text-sm text-zinc-400">
                <a href="mailto:dk.vidikovac@gmail.com" className="hover:text-white transition-colors">dk.vidikovac@gmail.com</a>
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 tracking-wide">PRATITE NAS</h4>
              <p className="text-sm text-zinc-400">
                © 2026 DanKüchen. Sva prava zadržana.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}