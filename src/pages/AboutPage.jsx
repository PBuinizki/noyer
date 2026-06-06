// src/pages/AboutPage.jsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const AboutPage = () => {
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
      .fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );
  }, []);

  const values = [
    {
      title: "Качество",
      description:
        "Используем только лучшие материалы и работаем с проверенными мастерами",
    },
    {
      title: "Экологичность",
      description:
        "Натуральное дерево, безопасные покрытия и ответственное производство",
    },
    {
      title: "Дизайн",
      description:
        "Минимализм, функциональность и вечная эстетика в каждой детали",
    },
    {
      title: "Сервис",
      description: "Индивидуальный подход и поддержка на всех этапах",
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* Hero секция */}
      <div className="bg-[#F5F0E8] py-20">
        <div className="container-custom">
          <h1 ref={titleRef} className="section-title text-center">
            О нас
          </h1>
          <p ref={contentRef} className="section-subtitle text-center mx-auto">
            История создания мебели с душой
          </p>
        </div>
      </div>

      {/* История */}
      <div className="container-custom py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-light text-[#3D2B1F] mb-6">
              Наша история
            </h2>
            <div className="space-y-4 text-[#8B7D6B] leading-relaxed">
              <p>
                Noyer родился из любви к натуральным материалам и минимализму.
                Всё началось с небольшой мастерской, где мы создавали мебель для
                себя и друзей.
              </p>
              <p>
                Сегодня мы — команда дизайнеров и мастеров, которые верят, что
                дом должен быть местом силы и уюта. Каждый наш предмет создаётся
                с вниманием к деталям и уважением к природе.
              </p>
              <p>
                Noyer (в переводе с французского — "орех") — это дань
                благородному дереву, которое мы используем в своих работах.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#F5F0E8] rounded-2xl overflow-hidden"
          >
            <img
              src="https://avatars.mds.yandex.net/i?id=9597d20dc8e0c30112cd2a649a57ba45_l-12690968-images-thumbs&n=13"
              alt="Наша мастерская"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Наши ценности */}
      <div className="bg-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-[#3D2B1F] mb-4">
              Наши ценности
            </h2>
            <p className="text-[#8B7D6B] max-w-2xl mx-auto">
              Четыре принципа, которые лежат в основе всего, что мы делаем
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 bg-[#F5F0E8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#5C3A21] text-xl font-light">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-[#3D2B1F] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[#8B7D6B]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Цитата */}
      <div className="bg-[#F5F0E8] py-20">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <svg
              className="w-12 h-12 text-[#E2DCD3] mx-auto mb-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl md:text-2xl font-light text-[#3D2B1F] max-w-3xl mx-auto leading-relaxed">
              Мы создаём не просто мебель. Мы создаём пространство, в котором
              хочется жить, работать и вдохновляться.
            </p>
            <p className="text-[#8B7D6B] mt-6">— Основатель Noyer</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
