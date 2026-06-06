// src/pages/ShopPage.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "../components/Shop/ProductCard";
import ShopFilters from "../components/Shop/ShopFilters";
import { products } from "../data/products";

gsap.registerPlugin(ScrollTrigger);

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const pageTitleRef = useRef(null);

  // Фильтрация товаров
  useEffect(() => {
    let filtered = products;

    // Фильтр по категории
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === activeCategory
      );
    }

    // Фильтр по поиску
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [activeCategory, searchQuery]);

  // Анимация заголовка
  useEffect(() => {
    gsap.fromTo(
      pageTitleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: pageTitleRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container-custom">
        {/* Заголовок */}
        <motion.div
          ref={pageTitleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-title">Магазин</h1>
          <p className="section-subtitle mx-auto">
            Изысканная мебель для вашего дома
          </p>
        </motion.div>

        {/* Фильтры */}
        <div className="mb-10">
          <ShopFilters
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Результаты фильтрации */}
        <div className="mb-6">
          <p className="text-[#8B7D6B]">
            Найдено товаров: {filteredProducts.length}
          </p>
        </div>

        {/* Сетка товаров */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-[#8B7D6B] mb-4">
              <svg
                className="w-24 h-24 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-[#3D2B1F] mb-2">
              Ничего не найдено
            </h3>
            <p className="text-[#8B7D6B] mb-6">
              Попробуйте изменить параметры поиска
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="btn-primary"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
