import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface TripsProps {
  onReservationClick: () => void;
}

export default function Trips({ onReservationClick }: TripsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const trips = [
    {
      img: `${import.meta.env.BASE_URL}/images/cyklo.webp`,
      badge: 'Rodinná rovina',
      badgeColor: 'text-green-700',
      badgeIcon: 'fa-leaf',
      title: 'Cyklostezka podél Lubiny',
      desc: '5 km rovina do Frenštátu a zpět. Hladký asfalt pro kočárek i odrážedla, cestou několik lávek přes řeku.',
      details: [
        { icon: 'fa-arrows-left-right', text: '10 km okruh' },
        { icon: 'fa-clock', text: '45 min' },
      ],
      link: `${import.meta.env.BASE_URL}/cyklostezka`,
    },
    {
      img: `${import.meta.env.BASE_URL}/images/pustevny.webp`,
      badge: 'Výzva',
      badgeColor: 'text-amber-700',
      badgeIcon: 'fa-mountain',
      title: 'Výjezd na Pustevny',
      desc: '12 km stálého stoupání, možnost půjčit e-bike ve Frenštátu. Odměnou je Radhošť, Jurkovičovy stavby a výhledy.',
      details: [
        { icon: 'fa-chart-line', text: '+600 m' },
        { icon: 'fa-bus', text: 'Lanovka zpět z Trojanovic' },
      ],
      link: `${import.meta.env.BASE_URL}/pustevny`,
    },
    {
      img: `${import.meta.env.BASE_URL}/images/horecky.webp`,
      badge: 'Pěší',
      badgeColor: 'text-sky-700',
      badgeIcon: 'fa-shoe-prints',
      title: 'Hořečky & beskydské stezky',
      desc: 'Lesní okruh 7 km s altánem a výhledy na Lysou horu. Vhodné pro nordic walking i kočárek do terénu.',
      details: [
        { icon: 'fa-bridge', text: 'Start 10 min od kempu' },
        { icon: 'fa-mug-hot', text: 'Občerstvení Řekovice' },
      ],
      link: `${import.meta.env.BASE_URL}/horecky`,
    },
  ];

  return (
    <section id="trips" className="py-20 bg-gradient-to-b from-white to-[var(--sand)]">
      <div className="max-w-[1100px] mx-auto px-5 space-y-10">
        <motion.div
          ref={ref}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--forest)] font-bold">
              Cyklo & výlety
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2">
              Trasy přímo z kempu
            </h2>
            <p className="text-slate-700 mt-3 max-w-2xl text-lg">
              Rodiny i bikeři si u nás vyberou. Cyklostezka podél Lubiny je
              rovinka pro děti, Pustevny a Radhošť potěší ty, kdo chtějí
              výhledy.
            </p>
          </div>
          <motion.button
            onClick={onReservationClick}
            className="px-6 py-3 rounded-full bg-[var(--forest)] text-white font-bold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Chci termín
          </motion.button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {trips.map((trip, index) => (
            <motion.a
              key={index}
              href={trip.link}
              className="block bg-white rounded-3xl border-2 border-[var(--stone)] shadow-[var(--shadow-organic)] overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: 'var(--shadow-heavy)' }}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={trip.img}
                  alt={trip.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="p-6 space-y-3">
                <div
                  className={`flex items-center gap-2 text-xs uppercase tracking-[0.2em] ${trip.badgeColor} font-bold`}
                >
                  <i className={`fa-solid ${trip.badgeIcon}`}></i>
                  <span>{trip.badge}</span>
                </div>
                <h3 className="text-xl font-bold group-hover:text-[var(--forest)] transition-colors">
                  {trip.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {trip.desc}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-600 pt-2">
                  {trip.details.map((detail, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      <i className={`fa-solid ${detail.icon}`}></i>
                      {detail.text}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
