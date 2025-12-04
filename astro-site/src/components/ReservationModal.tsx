import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { FormEvent } from 'react';
import DateInput from './DateInput';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({
  isOpen,
  onClose,
}: ReservationModalProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowError(false);
    setShowSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Manual validation with Czech messages
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (!checkinDate || checkinDate.trim() === '') {
      setErrorMessage('Vyberte prosím datum příjezdu.');
      setShowError(true);
      return;
    }

    if (!checkoutDate || checkoutDate.trim() === '') {
      setErrorMessage('Vyberte prosím datum odjezdu.');
      setShowError(true);
      return;
    }

    if (!name || name.trim() === '') {
      setErrorMessage('Vyplňte prosím jméno a příjmení.');
      setShowError(true);
      return;
    }

    if (!email || email.trim() === '') {
      setErrorMessage('Vyplňte prosím e-mailovou adresu.');
      setShowError(true);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Zadejte platnou e-mailovou adresu (např. jmeno@email.cz).');
      setShowError(true);
      return;
    }

    // Validate dates
    const checkin = parseDate(checkinDate);
    const checkout = parseDate(checkoutDate);

    if (!checkin) {
      setErrorMessage('Datum příjezdu není ve správném formátu.');
      setShowError(true);
      return;
    }

    if (!checkout) {
      setErrorMessage('Datum odjezdu není ve správném formátu.');
      setShowError(true);
      return;
    }

    if (checkout <= checkin) {
      setErrorMessage('Datum odjezdu musí být po datu příjezdu.');
      setShowError(true);
      return;
    }

    const data = Object.fromEntries(formData.entries());
    console.log('Form data:', data);

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 3000);
  };

  const parseDate = (dateStr: string): Date | null => {
    const parts = dateStr.split('.');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl bg-[var(--sand)] rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] border-4 border-[var(--stone)]"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[var(--stone)] sticky top-0 bg-[var(--sand)] z-10">
              <h3 className="text-xl font-bold text-slate-900">
                Nezávazná poptávka pobytu
              </h3>
              <motion.button
                aria-label="Zavřít"
                className="text-slate-500 hover:text-slate-800 p-2"
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fa-solid fa-xmark text-2xl"></i>
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 pb-8" noValidate>
              {showSuccess && (
                <motion.div
                  className="rounded-xl border-2 border-emerald-500 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <strong className="font-bold">Děkujeme!</strong> Vaše
                  poptávka byla odeslána. (Mock - formulář zatím nikam
                  neposílá data)
                </motion.div>
              )}

              {showError && (
                <motion.div
                  className="rounded-xl border-2 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-800"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <strong className="font-bold">Chyba:</strong> {errorMessage}
                </motion.div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <DateInput
                  label="Datum příjezdu"
                  name="checkin"
                  value={checkinDate}
                  onChange={setCheckinDate}
                  minDate={new Date()}
                  required
                  placeholder="dd.mm.rrrr"
                />
                <DateInput
                  label="Datum odjezdu"
                  name="checkout"
                  value={checkoutDate}
                  onChange={setCheckoutDate}
                  minDate={checkinDate ? (() => {
                    const parts = checkinDate.split('.');
                    if (parts.length === 3) {
                      const nextDay = new Date(
                        parseInt(parts[2]),
                        parseInt(parts[1]) - 1,
                        parseInt(parts[0])
                      );
                      nextDay.setDate(nextDay.getDate() + 1);
                      return nextDay;
                    }
                    return new Date();
                  })() : new Date()}
                  required
                  placeholder="dd.mm.rrrr"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-700 space-y-2">
                  <span className="font-semibold">Typ ubytování</span>
                  <select
                    name="type"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[var(--stone)] focus:border-[var(--forest)] focus:ring-2 focus:ring-[var(--moss)]/30 transition-all bg-white"
                  >
                    <option>Stanová louka</option>
                    <option>Karavan + přípojka</option>
                    <option>Chata standard</option>
                    <option>Chata LUX (WC)</option>
                  </select>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-sm text-slate-700 space-y-2">
                    <span className="font-semibold">Dospělí</span>
                    <input
                      type="number"
                      name="adults"
                      min="1"
                      defaultValue="2"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--stone)] focus:border-[var(--forest)] focus:ring-2 focus:ring-[var(--moss)]/30 transition-all"
                    />
                  </label>
                  <label className="text-sm text-slate-700 space-y-2">
                    <span className="font-semibold">Děti</span>
                    <input
                      type="number"
                      name="children"
                      min="0"
                      defaultValue="0"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[var(--stone)] focus:border-[var(--forest)] focus:ring-2 focus:ring-[var(--moss)]/30 transition-all"
                    />
                  </label>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-700 space-y-2">
                  <span className="font-semibold">
                    Jméno a příjmení <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[var(--stone)] focus:border-[var(--forest)] focus:ring-2 focus:ring-[var(--moss)]/30 transition-all"
                    placeholder="Jan Novák"
                  />
                </label>
                <label className="text-sm text-slate-700 space-y-2">
                  <span className="font-semibold">
                    Email <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[var(--stone)] focus:border-[var(--forest)] focus:ring-2 focus:ring-[var(--moss)]/30 transition-all"
                    placeholder="jan@email.cz"
                  />
                </label>
              </div>

              <label className="text-sm text-slate-700 space-y-2">
                <span className="font-semibold">Poznámka</span>
                <textarea
                  name="note"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--stone)] focus:border-[var(--forest)] focus:ring-2 focus:ring-[var(--moss)]/30 transition-all resize-none"
                  placeholder="Máme psa, preferujeme stín..."
                ></textarea>
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl border-2 border-[var(--stone)] text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Zavřít
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-7 py-3 rounded-xl bg-[var(--forest)] text-white font-bold shadow-lg hover:bg-[var(--forest-dark)] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Odeslat poptávku
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
