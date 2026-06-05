// src/components/Shop/ProductCard.jsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../store/cartStore";
import Toast from "../ui/Toast";

import gsap from "gsap";

const ProductCard = ({ product, index }) => {
  const [showToast, setShowToast] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef(null);
  const addToCart = useCartStore((state) => state.addItem);

  // Анимация при скролле
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    // Анимация добавления
    const btn = e.currentTarget;
    gsap.to(btn, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Toast isVisible={showToast} message="Товар добавлен в корзину" />
      {/* Ссылка на страницу товара */}
      <Link to={`/product/${product.id}`}>
        {/* Контейнер изображения */}
        <div className="relative overflow-hidden bg-[#F5F0E8] aspect-square">
          {/* Skeleton загрузки */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0E8] to-[#E2DCD3] animate-pulse" />
          )}

          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Оверлей при наведении */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
              >
                <motion.button
                  onClick={handleAddToCart}
                  className="bg-white text-[#3D2B1F] px-6 py-3 rounded-full font-medium shadow-lg hover:bg-[#3D2B1F] hover:text-white transition-all duration-300"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  whileTap={{ scale: 0.95 }}
                >
                  В корзину
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Badge "Нет в наличии" */}
          {!product.inStock && (
            <div className="absolute top-4 right-4 bg-[#8B7D6B] text-white px-3 py-1 rounded-full text-sm">
              Нет в наличии
            </div>
          )}
        </div>

        {/* Информация о товаре */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-[#3D2B1F] group-hover:text-[#5C3A21] transition-colors">
              {product.name}
            </h3>
            <span className="text-xl font-light text-[#5C3A21]">
              ${product.price}
            </span>
          </div>
          <p className="text-sm text-[#8B7D6B] mb-2">{product.category}</p>
          <p className="text-sm text-[#8B7D6B] line-clamp-2">
            {product.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
