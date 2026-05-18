import { motion } from 'framer-motion';

const placeholderImages = [
  'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80',
  'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
  'https://images.unsplash.com/photo-1529634885378-2c8d13df039a?w=400&q=80',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=400&q=80',
];

export default function MasonryGallery() {
  return (
    <div className="columns-2 md:columns-3 gap-4 space-y-4">
      {placeholderImages.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="break-inside-avoid rounded-2xl overflow-hidden group relative"
        >
          <img src={img} alt={`Memory ${i + 1}`} className="w-full object-cover hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </div>
  );
}