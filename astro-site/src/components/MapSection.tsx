import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function MapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    {
      x: '56%',
      y: '30%',
      title: 'Recepce & kavárna',
      desc: 'Check-in, káva a snack do batohu.',
    },
    {
      x: '42%',
      y: '68%',
      title: 'Stanová louka',
      desc: 'Stín u vody, nejbližší ohniště a elektřina.',
    },
    {
      x: '30%',
      y: '46%',
      title: 'Chatky 4-6 osob',
      desc: 'Klidný pruh u lesa, parkování u každé chatky.',
    },
    {
      x: '70%',
      y: '54%',
      title: 'Dětské hřiště',
      desc: 'Lanová prolézačka, pískoviště, pro nejmenší s dohledem.',
    },
    {
      x: '82%',
      y: '22%',
      title: 'Aquapark',
      desc: 'Bazény a tobogán 200 m od brány kempu.',
    },
  ];

  return (
    <section id="map" className="py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-5 space-y-10">
        <motion.div
          ref={ref}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--forest)] font-bold">
              Mapa areálu
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">
              Jak náš kemp vypadá
            </h2>
            <p className="text-slate-700 mt-3 max-w-2xl text-lg">
              Přehledná kreslená mapa s jednotlivými zónami. Chatky jsou blíž
              recepci, stany a karavany mají klidnou louku u řeky.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="bg-[var(--sand)] rounded-3xl border-2 border-[var(--stone)] shadow-[var(--shadow-heavy)] overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}/images/camp_map.webp`}
              alt="Kreslená mapa areálu Autokempu Frenštát"
              className="w-full"
            />
            {/* Interactive Hotspots */}
            {hotspots.map((hotspot, index) => (
              <motion.button
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: hotspot.x, top: hotspot.y }}
                onMouseEnter={() => setActiveHotspot(index)}
                onMouseLeave={() => setActiveHotspot(null)}
                onClick={() =>
                  setActiveHotspot(activeHotspot === index ? null : index)
                }
                whileHover={{ scale: 1.2 }}
              >
                {/* Pulsing ring */}
                <motion.span
                  className="absolute w-8 h-8 rounded-full border-2 border-[var(--forest)]/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [0.9, 1.4, 0.9],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                {/* Dot */}
                <span className="relative w-4 h-4 rounded-full bg-white border-2 border-[var(--forest)] shadow-lg block"></span>
                {/* Tooltip */}
                <motion.span
                  className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm border-2 border-[var(--stone)] px-4 py-3 rounded-xl shadow-xl min-w-[200px] text-left pointer-events-none"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: activeHotspot === index ? 1 : 0,
                    x: activeHotspot === index ? 0 : -10,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <strong className="block mb-1 text-[var(--forest)] text-sm">
                    {hotspot.title}
                  </strong>
                  <span className="text-xs text-slate-700">{hotspot.desc}</span>
                </motion.span>
              </motion.button>
            ))}
          </div>
          <div className="p-6 grid gap-4 md:grid-cols-3 text-sm text-slate-700 bg-white">
            {[
              {
                icon: 'fa-map-marker-alt',
                title: 'Recepce & kavárna',
                desc: 'Check-in, ranní káva, rychlé občerstvení.',
              },
              {
                icon: 'fa-shower',
                title: 'Nové sociální zázemí',
                desc: 'Sprchy s teplou vodou, kuchyňka, pračka.',
              },
              {
                icon: 'fa-fire',
                title: 'Oheň a gril point',
                desc: 'Dřevo u recepce, společné posezení pod stromy.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <i
                  className={`fa-solid ${item.icon} text-[var(--forest)] mt-1`}
                ></i>
                <p>
                  <strong>{item.title}</strong>
                  <br />
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
