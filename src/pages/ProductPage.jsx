// src/pages/ProductPage.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useCartStore } from "../store/cartStore";
import ImageGallery from "../components/Product/ImageGallery";
import QuantitySelector from "../components/Product/QuantitySelector";
import ProductGrid from "../components/Shop/ProductGrid";
import { products } from "../data/products";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const product = products.find((p) => p.id === parseInt(id));
  const addToCart = useCartStore((state) => state.addItem);
  const pageRef = useRef(null);

  // Похожие товары (другие товары из той же категории)
  const similarProducts = products
    .filter((p) => p.id !== product?.id && p.category === product?.category)
    .slice(0, 4);

  useEffect(() => {
    // Анимация появления страницы
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  // Если товар не найден
  if (!product) {
    return (
      <div className="min-h-screen bg-white py-32 text-center">
        <div className="container-custom">
          <h1 className="text-4xl font-light text-[#3D2B1F] mb-4">
            Товар не найден
          </h1>
          <p className="text-[#8B7D6B] mb-8">
            Возможно, товар был удалён или вы перешли по неверной ссылке.
          </p>
          <button onClick={() => navigate("/shop")} className="btn-primary">
            Вернуться в магазин
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }

    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2000);
  };

  // Галерея изображений (для демо используем несколько фото)
  const productImages = [
    product.image,
    product.image.replace("w=600", "w=800"),
    product.image.replace("w=600", "w=1000"),
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-white py-12">
      <div className="container-custom">
        {/* Хлебные крошки */}
        <div className="flex items-center gap-2 text-sm text-[#8B7D6B] mb-8">
          <button
            onClick={() => navigate("/")}
            className="hover:text-[#3D2B1F] transition-colors"
          >
            Главная
          </button>
          <span>/</span>
          <button
            onClick={() => navigate("/shop")}
            className="hover:text-[#3D2B1F] transition-colors"
          >
            Магазин
          </button>
          <span>/</span>
          <span className="text-[#3D2B1F]">{product.name}</span>
        </div>

        {/* Основная информация */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Галерея */}
          <ImageGallery images={productImages} name={product.name} />

          {/* Информация о товаре */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-light text-[#3D2B1F] mb-2">
                {product.name}
              </h1>

              <p className="text-[#8B7D6B] mb-4">{product.category}</p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-semibold text-[#5C3A21]">
                  ${product.price}
                </span>
                {!product.inStock && (
                  <span className="text-sm text-red-500 ml-4">
                    Нет в наличии
                  </span>
                )}
              </div>

              <p className="text-[#8B7D6B] leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Характеристики */}
              <div className="border-t border-[#E2DCD3] pt-6 mb-8 space-y-3">
                <div className="flex gap-4">
                  <span className="w-32 text-sm text-[#8B7D6B]">Материал:</span>
                  <span className="text-sm text-[#3D2B1F]">
                    Натуральный дуб, ткань
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="w-32 text-sm text-[#8B7D6B]">Размеры:</span>
                  <span className="text-sm text-[#3D2B1F]">
                    80 × 75 × 90 см
                  </span>
                </div>
                <div className="flex gap-4">
                  <span className="w-32 text-sm text-[#8B7D6B]">Вес:</span>
                  <span className="text-sm text-[#3D2B1F]">15 кг</span>
                </div>
                <div className="flex gap-4">
                  <span className="w-32 text-sm text-[#8B7D6B]">Гарантия:</span>
                  <span className="text-sm text-[#3D2B1F]">5 лет</span>
                </div>
              </div>

              {/* Количество и корзина */}
              {product.inStock ? (
                <div className="space-y-6">
                  <QuantitySelector
                    quantity={quantity}
                    onChange={setQuantity}
                    maxStock={10}
                  />

                  <button
                    onClick={handleAddToCart}
                    className="w-full md:w-auto btn-primary px-12 py-3"
                  >
                    Добавить в корзину
                  </button>
                </div>
              ) : (
                <div className="bg-[#F5F0E8] p-4 rounded-xl text-center">
                  <p className="text-[#8B7D6B]">
                    Товар временно отсутствует. <br />
                    Свяжитесь с нами для уточнения наличия.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Похожие товары */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <ProductGrid
              products={similarProducts}
              title="Похожие товары"
              subtitle="Возможно, вас заинтересуют эти модели"
              showViewAll={false}
              columns={4}
              withAnimation={true}
            />
          </div>
        )}
      </div>

      {/* Toast уведомление */}
      <AnimatePresence>
        {showAddedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 w-full transform -translate-x-1/2 z-50"
          >
            <div className="bg-[#3D2B1F] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                {quantity} × {product.name} добавлен{quantity > 1 ? "о" : ""} в
                корзину
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;
