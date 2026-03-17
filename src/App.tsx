/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu,
  X
} from 'lucide-react';
import Home from './pages/Home';
import { AboutPage, ExpertisePage, BlueprintPage, FutureLabPage, ContactPage } from './pages/Pages';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'عن فيورا', path: '/about' },
    { name: 'خبراتنا', path: '/expertise' },
    { name: 'المخطط', path: '/blueprint' },
    { name: 'مختبر المستقبل', path: '/future-lab' },
    { name: 'اتصل بنا', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-white/10' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1800px] mx-auto px-4 md:px-12 lg:px-24 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-display font-medium text-white">
            فيورا<span className="text-emerald-500">.</span>
          </Link>
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`text-[14px] uppercase transition-colors ${location.pathname === item.path ? 'text-emerald-400' : 'text-white/50 hover:text-emerald-400'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/contact" className="px-8 py-3 bg-emerald-500 text-black text-[14px] font-bold uppercase rounded-sm hover:bg-white transition-all">
            ابدأ مشروعك
          </Link>
          <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#050505] z-[100] flex flex-col p-8 md:p-12 h-screen w-screen overflow-hidden"
          >
            <div className="flex justify-between items-center mb-16 md:mb-24">
              <Link to="/" className="text-2xl font-display font-medium text-white">فيورا<span className="text-emerald-500">.</span></Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-6 md:space-y-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link 
                    to={item.path}
                    className={`text-4xl md:text-6xl font-display font-medium uppercase transition-colors ${location.pathname === item.path ? 'text-emerald-500' : 'text-white hover:text-emerald-500'}`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-auto pt-12 border-t border-white/10">
              <p className="text-white/40 uppercase text-xs tracking-widest mb-4 font-mono">// تواصل معنا</p>
              <a href="mailto:hello@viora.events" className="text-xl text-white hover:text-emerald-500 transition-colors">hello@viora.events</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500 selection:text-black" dir="rtl">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/expertise" element={<ExpertisePage />} />
          <Route path="/blueprint" element={<BlueprintPage />} />
          <Route path="/future-lab" element={<FutureLabPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}
