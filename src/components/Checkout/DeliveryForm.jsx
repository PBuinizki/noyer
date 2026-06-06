// src/components/Checkout/DeliveryForm.jsx
import { motion } from "framer-motion";

const deliveryOptions = [
  { id: "standard", name: "Стандартная доставка", price: 0, days: "3-5 дней" },
  { id: "express", name: "Экспресс-доставка", price: 500, days: "1-2 дня" },
  { id: "pickup", name: "Самовывоз", price: 0, days: "сегодня" },
];

const DeliveryForm = ({ data, onChange, onBack, onNext }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.delivery) {
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
        Способ доставки
      </h2>

      <div className="space-y-4">
        {deliveryOptions.map((option) => (
          <label
            key={option.id}
            className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
              data.delivery === option.id
                ? "border-[#5C3A21] bg-[#F5F0E8]"
                : "border-[#E2DCD3] hover:border-[#8B7D6B]"
            }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="delivery"
                value={option.id}
                checked={data.delivery === option.id}
                onChange={(e) => onChange("delivery", e.target.value)}
                className="w-4 h-4 text-[#5C3A21]"
              />
              <div>
                <p className="font-medium text-[#3D2B1F]">{option.name}</p>
                <p className="text-sm text-[#8B7D6B]">
                  Доставка: {option.days}
                </p>
              </div>
            </div>
            <span className="font-medium text-[#5C3A21]">
              {option.price === 0 ? "Бесплатно" : `+$${option.price}`}
            </span>
          </label>
        ))}
      </div>

      <div className="flex justify-between pt-6">
        <button type="button" onClick={onBack} className="btn-secondary">
          Назад
        </button>
        <button type="submit" className="btn-primary">
          Продолжить
        </button>
      </div>
    </motion.form>
  );
};

export default DeliveryForm;
