import { motion } from 'framer-motion';

interface FooterProps {
  onReservationClick: () => void;
}

export default function Footer({ onReservationClick }: FooterProps) {
  return (
    <footer className="bg-[#0f1c19] text-white pt-16 pb-10 relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-10 wood-texture"></div>

      <div className="max-w-[1100px] mx-auto px-5 space-y-10 relative z-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-200 font-bold">
              Kontakt
            </p>
            <h2 className="text-3xl font-bold">
              Ozvěte se, rádi poradíme s plánem
            </h2>
            <p className="text-slate-200 max-w-xl">
              Máte speciální požadavek nebo větší skupinu? Napište nám krátkou
              zprávu, ozveme se do 24 hodin.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-map-marker-alt text-emerald-300 mt-1"></i>
                <p>
                  Dolní 1806, 744 01 Frenštát p. R.
                  <br />
                  <span className="text-emerald-200">49,5483° s. š., 18,2123° v. d.</span>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-envelope text-emerald-300 mt-1"></i>
                <p>
                  info@autokemp-frenstat.cz
                  <br />
                  <span className="text-emerald-200">+420 123 456 789</span>
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={onReservationClick}
                className="px-6 py-3 rounded-full bg-white text-[var(--forest)] font-bold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Poptat termín
              </motion.button>
              <motion.a
                href="#map"
                className="px-6 py-3 rounded-full border-2 border-white/30 text-white font-bold hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mrknout na mapu
              </motion.a>
            </div>
          </div>
          <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold">Rychlé info</h3>
            <ul className="space-y-3 text-slate-200 text-sm">
              {[
                'Sezona: květen - říjen',
                'Noční klid 22:00-7:00',
                'Domácí mazlíčci vítáni',
                'Aquapark 200 m, centrum 10 min pěšky',
                'Wifi u recepce zdarma',
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-emerald-300"></i>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <motion.a
                href="#"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-white/10 border-2 border-white/10 grid place-items-center"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <i className="fa-brands fa-instagram"></i>
              </motion.a>
              <motion.a
                href="#"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full bg-white/10 border-2 border-white/10 grid place-items-center"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <i className="fa-brands fa-facebook-f"></i>
              </motion.a>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-white/10 pt-6 flex flex-col sm:flex-row justify-between text-sm text-slate-300">
          <p>© 2025 Autokemp Frenštát. Navrženo s respektem k lesům Beskyd.</p>
          <p className="mt-3 sm:mt-0">Web spravuje tým kempu.</p>
        </div>
      </div>
    </footer>
  );
}
