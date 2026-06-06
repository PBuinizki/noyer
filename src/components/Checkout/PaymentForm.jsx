// src/components/Checkout/PaymentForm.jsx
import { motion } from "framer-motion";

const paymentMethods = [
  {
    id: "card",
    name: "Банковская карта",
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
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
  },
  {
    id: "cash",
    name: "Наличными при получении",
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
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    id: "paypal",
    name: "PayPal",
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
          d="M3 10h18M6 19h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 14v.01M8 10h.01M16 10h.01"
        />
      </svg>
    ),
  },
];

const PaymentForm = ({ data, onChange, onBack, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.payment) {
      onSubmit();
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <h2 className="text-2xl font-light text-[#3D2B1F] mb-6">Способ оплаты</h2>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
              data.payment === method.id
                ? "border-[#5C3A21] bg-[#F5F0E8]"
                : "border-[#E2DCD3] hover:border-[#8B7D6B]"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={data.payment === method.id}
              onChange={(e) => onChange("payment", e.target.value)}
              className="w-4 h-4 text-[#5C3A21] focus:ring-[#5C3A21] focus:ring-offset-0"
            />
            <div className="text-[#8B7D6B] group-hover:text-[#5C3A21] transition-colors">
              {method.icon}
            </div>
            <span className="text-[#3D2B1F]">{method.name}</span>
          </label>
        ))}
      </div>

      {/* Поля для карты (если выбран способ "card") */}
      {data.payment === "card" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-4 mt-6 pt-6 border-t border-[#E2DCD3]"
        >
          <h3 className="font-medium text-[#3D2B1F]">Данные карты</h3>

          <div>
            <input
              type="text"
              placeholder="Номер карты"
              className="w-full px-4 py-3 bg-white border border-[#E2DCD3] rounded-xl focus:outline-none focus:border-[#8B7D6B] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              className="px-4 py-3 bg-white border border-[#E2DCD3] rounded-xl focus:outline-none focus:border-[#8B7D6B] transition-colors"
            />
            <input
              type="text"
              placeholder="CVC"
              className="px-4 py-3 bg-white border border-[#E2DCD3] rounded-xl focus:outline-none focus:border-[#8B7D6B] transition-colors"
            />
          </div>
        </motion.div>
      )}

      <div className="flex justify-between pt-6">
        <button type="button" onClick={onBack} className="btn-secondary">
          Назад
        </button>
        <button type="submit" className="btn-primary">
          Подтвердить заказ
        </button>
      </div>
    </motion.form>
  );
};

export default PaymentForm;
