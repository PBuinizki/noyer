// src/components/Shop/ProductGrid.jsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ProductGrid = ({
  products, // массив товаров
  title, // заголовок секции
  subtitle, // подзаголовок (опционально)
  showViewAll = false, // показывать кнопку "Смотреть все"
  viewAllLink = "/shop", // куда ведёт кнопка
  columns = 4, // количество колонок (2, 3, 4)
  withAnimation = true, // анимировать появление
}) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    if (!withAnimation) return;

    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    if (subtitle) {
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [withAnimation, subtitle]);

  // Определяем колонки в зависимости от параметра
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-12 bg-white">
      <div className="container-custom">
        {/* Заголовок секции */}
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 ref={titleRef} className="section-title">
                {title}
              </h2>
            )}
            {subtitle && (
              <p ref={subtitleRef} className="section-subtitle mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Сетка товаров */}
        <div className={`grid ${gridCols[columns]} gap-6`}>
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Кнопка "Смотреть все" */}
        {showViewAll && (
          <div className="text-center mt-10">
            <Link to={viewAllLink} className="btn-primary inline-block">
              Смотреть все товары
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
