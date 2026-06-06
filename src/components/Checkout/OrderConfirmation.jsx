// src/components/Checkout/OrderConfirmation.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const OrderConfirmation = ({ orderData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-3xl font-light text-[#3D2B1F] mb-4">
        Заказ оформлен!
      </h2>

      <p className="text-[#8B7D6B] mb-8 max-w-md mx-auto">
        Спасибо за покупку! Номер вашего заказа: <br />
        <span className="font-mono text-lg text-[#5C3A21]">
          NOYER-{Math.floor(Math.random() * 10000)}
        </span>
      </p>

      <p className="text-[#8B7D6B] mb-8">
        Мы отправили подтверждение на {orderData.email}
      </p>

      <div className="flex gap-4 justify-center">
        <Link to="/shop" className="btn-primary">
          Продолжить покупки
        </Link>
        <Link to="/" className="btn-secondary">
          На главную
        </Link>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;
