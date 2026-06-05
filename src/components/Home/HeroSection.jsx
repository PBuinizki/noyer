// src/components/Home/HeroSection.jsx
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/img/hero.jpg";
import gsap from "gsap";

const HeroSection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Таймлайн для последовательной анимации
    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        transformOrigin: "left",
      }
    )
      .fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.3"
      )
      .fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0, rotate: 5 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-[#F5F0E8] overflow-hidden">
      {/* Анимированный оверлей */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#E2DCD3] origin-left"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Контент */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-[#3D2B1F] tracking-tight leading-tight"
          >
            Мебель с <br />
            <span className="font-medium">душой</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-[#3D2B1F] mt-6 max-w-xl"
          >
            Создаём предметы, которые живут с вами долгие годы. Натуральные
            материалы, минимализм и внимание к деталям.
          </p>

          <div ref={buttonRef} className="mt-10 flex gap-4">
            <Link to="/shop" className="btn-primary">
              Смотреть коллекцию
            </Link>
            <button className="btn-secondary">Узнать больше</button>
          </div>
        </div>
      </div>

      {/* Изображение с параллакс-эффектом */}
      <div
        ref={imageRef}
        className="absolute right-0 bottom-0 w-full md:w-1/2 h-full pointer-events-none"
      >
        <img
          src={heroImage}
          alt="Modern chair"
          className="w-full h-full object-cover object-center opacity-80"
        />
        {/* Градиентная маска для плавного перехода */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#F5F0E8] via-transparent to-transparent hidden md:block" />
      </div>

      {/* Декоративный элемент */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-[#8B7D6B]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
