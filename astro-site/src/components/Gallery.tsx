import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Using Unsplash for stock camping/nature photos
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop',
      title: 'Táboření u řeky',
      alt: 'Stan u řeky v Beskydách',
    },
    {
      url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=600&fit=crop',
      title: 'Lesní cesta',
      alt: 'Cesta lesem v okolí kempu',
    },
    {
      url: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=800&h=600&fit=crop',
      title: 'Táborák pod hvězdami',
      alt: 'Táborák v kempu večer',
    },
    {
      url: 'https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?w=800&h=600&fit=crop',
      title: 'Rodinné táboření',
      alt: 'Rodina u stanu',
    },
    {
      url: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=800&h=600&fit=crop',
      title: 'Horská scenérie',
      alt: 'Hory a příroda v Beskydách',
    },
    {
      url: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop',
      title: 'Chatky v lese',
      alt: 'Dřevěné chatky v kempu',
    },
    {
      url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop',
      title: 'Jezero v horách',
      alt: 'Horské jezero v Beskydách',
    },
    {
      url: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?w=800&h=600&fit=crop',
      title: 'Kemp u jezera',
      alt: 'Táborové místo u vody',
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-[var(--sand)]">
      <div className="max-w-[1100px] mx-auto px-5 space-y-10">
        <motion.div
          ref={ref}
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--forest)] font-bold">
            Galerie
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            Pohled na náš kemp
          </h2>
          <p className="text-slate-700 max-w-2xl mx-auto text-lg">
            Podívejte se, jak to u nás vypadá. Krásná příroda, klid a pohoda.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[var(--stone-dark)] shadow-[var(--shadow-organic)] cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-heavy)' }}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm">{image.title}</p>
                </div>
              </div>
              {/* Zoom icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="fa-solid fa-expand text-[var(--forest)] text-sm"></i>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white text-slate-900 grid place-items-center hover:bg-slate-100 transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </motion.button>

            <motion.div
              className="relative max-w-5xl max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <img
                src={images[selectedImage].url}
                alt={images[selectedImage].alt}
                className="rounded-2xl max-w-full max-h-[90vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
                <p className="text-white font-bold text-lg">
                  {images[selectedImage].title}
                </p>
              </div>

              {/* Navigation arrows */}
              {selectedImage > 0 && (
                <motion.button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 grid place-items-center hover:bg-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(selectedImage - 1);
                  }}
                >
                  <i className="fa-solid fa-chevron-left text-slate-900"></i>
                </motion.button>
              )}
              {selectedImage < images.length - 1 && (
                <motion.button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 grid place-items-center hover:bg-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(selectedImage + 1);
                  }}
                >
                  <i className="fa-solid fa-chevron-right text-slate-900"></i>
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
