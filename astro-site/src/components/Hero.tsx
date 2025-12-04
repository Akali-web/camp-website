import { motion } from 'framer-motion';

interface HeroProps {
  onReservationClick: () => void;
}

export default function Hero({ onReservationClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Removed floating animation - was causing glitching

  return (
    <header className="relative min-h-screen flex items-center text-white overflow-hidden">
      {/* Background Image - Serene Forest Lake */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15, 28, 25, 0.7), rgba(23, 64, 46, 0.5)), url(https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&h=1080&fit=crop)`,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Organic overlay texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>

      <div className="max-w-[1100px] mx-auto px-5 relative z-10 flex items-center justify-center pt-20 pb-16 min-h-screen">
        <motion.div
          className="text-center space-y-8 max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--forest)]/40 backdrop-blur-sm border-2 border-[var(--moss)]/50 text-sm font-bold uppercase tracking-[0.2em]"
          >
            Beskydy - Radhošť
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl leading-tight font-bold text-organic"
          >
            Kemp v srdci Beskyd
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto leading-relaxed"
          >
            Klid, příroda a pohoda jen 35 minut z Ostravy
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={onReservationClick}
              className="px-8 py-4 rounded-full bg-white text-[var(--forest)] font-bold shadow-2xl text-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px -10px rgba(255, 255, 255, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Rezervovat pobyt
            </motion.button>
            <motion.a
              href="#about"
              className="px-8 py-4 rounded-full border-2 border-white text-white font-bold backdrop-blur-sm text-lg"
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Zjistit více
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
