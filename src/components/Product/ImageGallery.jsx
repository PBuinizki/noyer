// src/components/Product/ImageGallery.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageGallery = ({ images, name }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Если изображений нет, показываем плейсхолдер
  const galleryImages =
    images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format",
        ];

  return (
    <div className="space-y-4">
      {/* Главное изображение */}
      <motion.div
        className="relative aspect-square bg-[#F5F0E8] rounded-2xl overflow-hidden cursor-zoom-in"
        onClick={() => setIsZoomed(true)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={galleryImages[selectedImage]}
          alt={name}
          className="w-full h-full object-cover"
        />

        {/* Иконка увеличения */}
        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur rounded-full p-2">
          <svg
            className="w-5 h-5 text-[#3D2B1F]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      </motion.div>

      {/* Миниатюры */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {galleryImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                selectedImage === index
                  ? "ring-2 ring-[#5C3A21] scale-95"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom модалка */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={galleryImages[selectedImage]}
              alt={name}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery;
