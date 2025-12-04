import { useState } from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import About from './About';
import MapSection from './MapSection';
import Gallery from './Gallery';
import Trips from './Trips';
import Pricing from './Pricing';
import Footer from './Footer';
import ReservationModal from './ReservationModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navigation onReservationClick={() => setIsModalOpen(true)} />
      <Hero onReservationClick={() => setIsModalOpen(true)} />
      <About />
      <MapSection />
      <Gallery />
      <Trips onReservationClick={() => setIsModalOpen(true)} />
      <Pricing />
      <Footer onReservationClick={() => setIsModalOpen(true)} />
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
