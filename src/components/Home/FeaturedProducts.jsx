// src/components/Home/FeaturedProducts.jsx
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "../Shop/ProductCard";
import { products } from "../../data/products";

// Регистрируем плагин GSAP
gsap.registerPlugin(ScrollTrigger);

const FeaturedProducts = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Анимация заголовка при скролле
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
  }, []);

  // Берём только первые 4 товара для главной страницы
  const featuredProducts = products.slice(0, 4);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container-custom">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="section-title">
            Избранное
          </h2>
          <p ref={subtitleRef} className="section-subtitle mx-auto">
            Предметы, которые вдохновляют на создание уютного пространства
          </p>
        </div>

        {/* Сетка товаров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Кнопка "В магазин" */}
        <div className="text-center mt-12">
          <Link to="/shop" className="btn-primary inline-block">
            Смотреть все товары
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
