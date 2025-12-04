import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    { icon: 'fa-plug', text: 'Elektrické přípojky' },
    { icon: 'fa-fire', text: 'Oheň & dřevo' },
    { icon: 'fa-dog', text: 'Pet friendly' },
    { icon: 'fa-mug-hot', text: 'Káva u recepce' },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Subtle wood texture background */}
      <div className="absolute inset-0 wood-texture opacity-30"></div>

      <div className="max-w-[1100px] mx-auto px-5 relative z-10">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] items-center">
          <motion.div
            ref={ref}
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-sm uppercase tracking-[0.3em] text-[var(--forest)] font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              O kempu
            </motion.p>

            <motion.h2
              className="text-3xl md:text-5xl font-bold text-slate-900"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Moravský kemp s duší Beskyd
            </motion.h2>

            <motion.p
              className="text-lg text-slate-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Jsme rodinný autokemp na kraji Frenštátu pod Radhoštěm. Všechny
              hlavní služby najdete na místě: recepci, nově zrekonstruované
              sociální zázemí, prostor pro karavany i velkou stanovou louku u
              řeky. Díky poloze mezi Pustevnami a Hořečkami je to ideální
              základna pro cyklisty i rodiny.
            </motion.p>

            <motion.div
              className="grid gap-4 sm:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              {[
                {
                  title: 'Check-in 14:00 - Check-out 11:00',
                  desc: 'Pozdní příjezd nám stačí nahlásit předem.',
                },
                {
                  title: 'Bezpečné zázemí',
                  desc: 'Noční klid od 22:00, wifi u recepce, úschovna kol zdarma.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-5 rounded-2xl bg-white shadow-[var(--shadow-organic)] border-2 border-[var(--stone)]"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 15px 50px -20px rgba(15, 28, 25, 0.4)',
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <p className="font-bold text-[var(--forest)] mb-2">
                    {item.title}
                  </p>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 text-sm text-slate-700"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              {features.map((feature, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2.5 rounded-full bg-white shadow-md border-2 border-[var(--stone)] flex items-center gap-2 font-medium"
                  whileHover={{
                    scale: 1.05,
                    borderColor: 'var(--moss)',
                    backgroundColor: '#f0fdf4',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  <i
                    className={`fa-solid ${feature.icon} text-[var(--forest)]`}
                  ></i>
                  {feature.text}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="rounded-3xl overflow-hidden shadow-[var(--shadow-heavy)] border-4 border-[var(--stone)] bg-white"
            initial={{ opacity: 0, x: 50, rotate: 2 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02, rotate: -1 }}
          >
            <img
              src="/images/beskydy.webp"
              alt="Louka kempu v Beskydách"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
