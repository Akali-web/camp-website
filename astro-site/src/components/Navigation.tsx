import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface NavigationProps {
  onReservationClick: () => void;
}

export default function Navigation({ onReservationClick }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(247, 243, 235, 0)', 'rgba(247, 243, 235, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-[var(--sand)] border-b-4 border-[var(--stone-dark)] wood-texture ${
        isScrolled ? 'shadow-2xl' : 'shadow-lg'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="w-10 h-10 rounded-xl bg-[var(--forest)] text-white grid place-items-center shadow-lg">
              <i className="fa-solid fa-campground"></i>
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500 font-medium">
                Morava, Beskydy
              </p>
              <p className="font-semibold text-lg text-slate-900">
                Autokemp Frenštát
              </p>
            </div>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a
              href="#about"
              className="text-slate-700 hover:text-[var(--forest)] transition-colors relative group"
            >
              O kempu
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--forest)] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#map"
              className="text-slate-700 hover:text-[var(--forest)] transition-colors relative group"
            >
              Mapa
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--forest)] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#gallery"
              className="text-slate-700 hover:text-[var(--forest)] transition-colors relative group"
            >
              Galerie
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--forest)] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#trips"
              className="text-slate-700 hover:text-[var(--forest)] transition-colors relative group"
            >
              Cyklo & výlety
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--forest)] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#pricing"
              className="text-slate-700 hover:text-[var(--forest)] transition-colors relative group"
            >
              Ceník
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--forest)] group-hover:w-full transition-all duration-300"></span>
            </a>
            <motion.button
              onClick={onReservationClick}
              className="px-5 py-2.5 rounded-full bg-[var(--forest)] text-white font-semibold shadow-md hover:bg-[var(--forest-dark)] transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -10px rgba(31, 92, 58, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Rezervovat
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700 p-2"
            aria-label="Menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.i
              className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden border-t-4 border-[var(--stone-dark)] bg-[var(--sand)] wood-texture"
      >
        <div className="max-w-[1100px] mx-auto px-5 py-4 flex flex-col gap-3 text-sm">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
              setTimeout(() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }}
            className="py-2 text-slate-700 hover:text-[var(--forest)] transition-colors"
          >
            O kempu
          </a>
          <a
            href="#map"
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
              setTimeout(() => {
                document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }}
            className="py-2 text-slate-700 hover:text-[var(--forest)] transition-colors"
          >
            Mapa
          </a>
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
              setTimeout(() => {
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }}
            className="py-2 text-slate-700 hover:text-[var(--forest)] transition-colors"
          >
            Galerie
          </a>
          <a
            href="#trips"
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
              setTimeout(() => {
                document.getElementById('trips')?.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }}
            className="py-2 text-slate-700 hover:text-[var(--forest)] transition-colors"
          >
            Cyklo & výlety
          </a>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
              setTimeout(() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }}
            className="py-2 text-slate-700 hover:text-[var(--forest)] transition-colors"
          >
            Ceník
          </a>
          <button
            onClick={() => {
              closeMenu();
              onReservationClick();
            }}
            className="px-4 py-3 rounded-xl bg-[var(--forest)] text-white font-semibold mt-2"
          >
            Rezervovat pobyt
          </button>
        </div>
      </motion.div>
    </motion.nav>
  );
}
