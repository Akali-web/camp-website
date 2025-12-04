import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-5 space-y-10">
        <motion.div
          ref={ref}
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--forest)] font-bold">
            Ceník 2025
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            Jednoduché ceny bez překvapení
          </h2>
          <p className="text-slate-700 max-w-2xl mx-auto text-lg">
            Za děti účtujeme méně, delší pobyty mají 10% slevu. Při skupinových
            akcích vám připravíme nabídku na míru.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Chatky */}
          <motion.div
            className="bg-gradient-to-br from-[var(--sand)] to-white rounded-3xl border-2 border-[var(--stone)] shadow-[var(--shadow-organic)] p-8 space-y-5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-heavy)' }}
          >
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-[var(--forest)] text-white grid place-items-center text-xl">
                <i className="fa-solid fa-home"></i>
              </span>
              <div>
                <h3 className="text-2xl font-bold">Chatky</h3>
                <p className="text-sm text-slate-600">
                  Kapacita 4-6 osob, možnost přistýlky.
                </p>
              </div>
            </div>
            <ul className="space-y-3 text-slate-700">
              <li className="flex justify-between border-b-2 border-[var(--stone)] pb-3">
                <span>Chata standard / noc</span>
                <span className="font-bold text-[var(--forest)]">950 Kč</span>
              </li>
              <li className="flex justify-between border-b-2 border-[var(--stone)] pb-3">
                <span>Chata LUX (WC) / noc</span>
                <span className="font-bold text-[var(--forest)]">1 450 Kč</span>
              </li>
              <li className="flex justify-between border-b-2 border-[var(--stone)] pb-3">
                <span>Přistýlka</span>
                <span className="font-bold text-[var(--forest)]">150 Kč</span>
              </li>
              <li className="flex justify-between text-sm text-slate-600">
                <span>Rekreační poplatek městu</span>
                <span>20 Kč / os.</span>
              </li>
            </ul>
          </motion.div>

          {/* Stanování */}
          <motion.div
            className="bg-gradient-to-br from-[var(--sand)] to-white rounded-3xl border-2 border-[var(--stone)] shadow-[var(--shadow-organic)] p-8 space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-heavy)' }}
          >
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-amber-600 text-white grid place-items-center text-xl">
                <i className="fa-solid fa-campground"></i>
              </span>
              <div>
                <h3 className="text-2xl font-bold">Stanování & karavany</h3>
                <p className="text-sm text-slate-600">
                  Louka u řeky s přípojkami, možnost stínu i slunce.
                </p>
              </div>
            </div>
            <ul className="space-y-3 text-slate-700">
              <li className="flex justify-between border-b-2 border-[var(--stone)] pb-3">
                <span>Osoba nad 15 let</span>
                <span className="font-bold text-amber-700">120 Kč</span>
              </li>
              <li className="flex justify-between border-b-2 border-[var(--stone)] pb-3">
                <span>Dítě (3-15 let)</span>
                <span className="font-bold text-amber-700">80 Kč</span>
              </li>
              <li className="flex justify-between border-b-2 border-[var(--stone)] pb-3">
                <span>Stan malý / velký</span>
                <span className="font-bold text-amber-700">100 / 150 Kč</span>
              </li>
              <li className="flex justify-between border-b-2 border-[var(--stone)] pb-3">
                <span>Karavan + přípojka</span>
                <span className="font-bold text-amber-700">350 Kč</span>
              </li>
              <li className="flex justify-between pb-3">
                <span>Auto</span>
                <span className="font-bold text-amber-700">100 Kč</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="text-center text-sm text-slate-600 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <i className="fa-solid fa-leaf text-[var(--forest)]"></i>
          V ceně je vstup na dětské hřiště a úschova kol. Sleva 10 % pro pobyty
          na 7+ nocí.
        </motion.div>
      </div>
    </section>
  );
}
