// src/components/Home/WhyUsSection.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhyUsSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const reasons = [
    {
      number: "01",
      title: "Натуральные материалы",
      description:
        "Используем только экологически чистые материалы высшего качества",
    },
    {
      number: "02",
      title: "Ручная работа",
      description: "Каждое изделие создаётся мастерами с многолетним опытом",
    },
    {
      number: "03",
      title: "Индивидуальный подход",
      description: "Учитываем все пожелания при создании мебели под заказ",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Почему выбирают нас</h2>
          <p className="section-subtitle mx-auto">
            Мы создаём мебель, которая служит поколениям
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="text-center p-8 group cursor-pointer"
            >
              <div className="text-6xl font-light text-[#E2DCD3] mb-4 group-hover:text-[#5C3A21] transition-colors duration-300">
                {reason.number}
              </div>
              <h3 className="text-xl font-medium text-[#3D2B1F] mb-3">
                {reason.title}
              </h3>
              <p className="text-[#8B7D6B]">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
