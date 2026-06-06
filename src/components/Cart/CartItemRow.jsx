// src/components/Cart/CartItemRow.jsx
import { motion } from "framer-motion";
import { useCartStore } from "../../store/cartStore";

const CartItemRow = ({ item, index }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-[#E2DCD3]"
    >
      {/* Изображение и название */}
      <td className="py-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F5F0E8]">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-[#3D2B1F]">{item.name}</h3>
            <p className="text-sm text-[#8B7D6B] mt-1">Артикул: #{item.id}</p>
          </div>
        </div>
      </td>

      {/* Цена */}
      <td className="py-6 text-[#5C3A21] font-medium">
        ${item.price.toFixed(2)}
      </td>

      {/* Количество */}
      <td className="py-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 rounded-full bg-[#F5F0E8] hover:bg-[#E2DCD3] transition-colors flex items-center justify-center"
          >
            -
          </button>
          <span className="w-8 text-center text-[#3D2B1F]">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 rounded-full bg-[#F5F0E8] hover:bg-[#E2DCD3] transition-colors flex items-center justify-center"
          >
            +
          </button>
        </div>
      </td>

      {/* Итого за товар */}
      <td className="py-6 text-[#5C3A21] font-semibold">
        ${(item.price * item.quantity).toFixed(2)}
      </td>

      {/* Удалить */}
      <td className="py-6 text-center">
        <button
          onClick={() => removeItem(item.id)}
          className="text-[#8B7D6B] hover:text-red-500 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </motion.tr>
  );
};

export default CartItemRow;
