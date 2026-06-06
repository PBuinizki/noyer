// src/components/Checkout/ShippingForm.jsx
import { useState } from "react";
import { motion } from "framer-motion";

const ShippingForm = ({ data, onChange, onNext }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!data.fullName.trim()) newErrors.fullName = "Укажите имя";
    if (!data.email.trim()) newErrors.email = "Укажите email";
    if (!/\S+@\S+\.\S+/.test(data.email))
      newErrors.email = "Неверный формат email";
    if (!data.phone.trim()) newErrors.phone = "Укажите телефон";
    if (!data.address.trim()) newErrors.address = "Укажите адрес";
    if (!data.city.trim()) newErrors.city = "Укажите город";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <h2 className="text-2xl font-light text-[#3D2B1F] mb-6">
        Контактные данные
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#8B7D6B] mb-2">
            Полное имя *
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#E2DCD3] rounded-xl focus:outline-none focus:border-[#8B7D6B] transition-colors"
            placeholder="Иван Иванов"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-[#8B7D6B] mb-2">Email *</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#E2DCD3] rounded-xl focus:outline-none focus:border-[#8B7D6B] transition-colors"
            placeholder="ivan@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-[#8B7D6B] mb-2">Телефон *</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#E2DCD3] rounded-xl focus:outline-none focus:border-[#8B7D6B] transition-colors"
            placeholder="+7 (999) 123-45-67"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-[#8B7D6B] mb-2">Город *</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#E2DCD3] rounded-xl focus:outline-none focus:border-[#8B7D6B] transition-colors"
            placeholder="Москва"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-[#8B7D6B] mb-2">Адрес *</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => onChange("address", e.target.value)}
            className="w-full px-4 py-3 bg-white border border-[#E2DCD3] rounded-xl focus:outline-none focus:border-[#8B7D6B] transition-colors"
            placeholder="Улица, дом, квартира"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <button type="submit" className="btn-primary">
          Продолжить
        </button>
      </div>
    </motion.form>
  );
};

export default ShippingForm;
