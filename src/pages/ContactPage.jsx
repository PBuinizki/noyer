// src/pages/ContactPage.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const ContactPage = () => {
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }
    ).fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет отправка на сервер
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email",
      value: "hello@noyer.com",
      link: "mailto:hello@noyer.com",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Телефон",
      value: "+7 (999) 123-45-67",
      link: "tel:+79991234567",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Адрес",
      value: "Москва, ул. Дизайнерская, 15",
      link: "https://maps.google.com",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Часы работы",
      value: "Пн–Пт: 10:00 – 20:00\nСб–Вс: 11:00 – 18:00",
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* Hero секция */}
      <div className="bg-[#F5F0E8] py-20">
        <div className="container-custom">
          <h1 ref={titleRef} className="section-title text-center">
            Контакты
          </h1>
          <p className="section-subtitle text-center mx-auto">
            Мы всегда рады ответить на ваши вопросы
          </p>
        </div>
      </div>

      <div className="container-custom py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-light text-[#3D2B1F] mb-8">
                Свяжитесь с нами
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="text-[#8B7D6B]">{info.icon}</div>
                    <div>
                      <h3 className="font-medium text-[#3D2B1F] mb-1">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-[#8B7D6B] hover:text-[#5C3A21] transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-[#8B7D6B] whitespace-pre-line">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Форма обратной связи */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-light text-[#3D2B1F] mb-8">
              Напишите нам
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-[#8B7D6B] mb-2">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-[#E2DCD3] rounded-xl focus:outline-none focus:border-[#8B7D6B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8B7D6B] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-[#E2DCD3] rounded-xl focus:outline-none focus:border-[#8B7D6B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8B7D6B] mb-2">
                  Тема *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-[#E2DCD3] rounded-xl focus:outline-none focus:border-[#8B7D6B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[#8B7D6B] mb-2">
                  Сообщение *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white border border-[#E2DCD3] rounded-xl focus:outline-none focus:border-[#8B7D6B] transition-colors resize-none"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Отправить
              </button>
            </form>

            {/* Уведомление об отправке */}
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm text-center"
              >
                Спасибо! Мы свяжемся с вами в ближайшее время.
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Карта */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-[#F5F0E8] rounded-2xl overflow-hidden">
            <div className="aspect-video w-full">
              <iframe
                title="Карта"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.999999999999!2d37.6176!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5a1e1d1d1d%3A0x0!2z0JzQvtGB0LrQstCw!5e0!3m2!1sru!2sru!4v1234567890"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
