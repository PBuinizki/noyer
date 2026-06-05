// src/components/Cart/CartDrawer.jsx
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  useCartStore,
  useCartItemCount,
  useCartTotal,
} from "../../store/cartStore";
import { useUIStore } from "../../store/uiStore";
import gsap from "gsap";

const CartDrawer = () => {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQuantity } = useCartStore();
  const drawerRef = useRef(null);

  // Блокировка скролла при открытой корзине
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  // Анимация при добавлении товара
  useEffect(() => {
    if (isCartOpen && drawerRef.current) {
      gsap.fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [isCartOpen]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const totalItems = useCartItemCount();
  const totalPrice = useCartTotal();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Оверлей */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Заголовок */}
            <div className="flex justify-between items-center p-6 border-b border-[#E2DCD3]">
              <h2 className="text-2xl font-light text-[#3D2B1F]">
                Корзина ({totalItems})
              </h2>
              <button
                onClick={closeCart}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F5F0E8] transition-colors"
              >
                <svg
                  className="w-5 h-5 text-[#8B7D6B]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Список товаров */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-[#8B7D6B] mb-4">
                    <svg
                      className="w-20 h-20 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6"
                      />
                    </svg>
                  </div>
                  <p className="text-[#8B7D6B] mb-4">Ваша корзина пуста</p>
                  <button
                    onClick={closeCart}
                    className="btn-primary inline-block"
                  >
                    Продолжить покупки
                  </button>
                </div>
              ) : (
                items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-4 bg-[#F5F0E8] p-4 rounded-xl"
                  >
                    {/* Изображение */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Информация */}
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-medium text-[#3D2B1F]">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#8B7D6B] hover:text-red-500 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
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
                      </div>
                      <p className="text-sm text-[#5C3A21] font-medium mb-2">
                        ${item.price}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-[#E2DCD3] transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-[#3D2B1F]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-[#E2DCD3] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Итог по товару */}
                    <div className="text-right">
                      <p className="font-medium text-[#5C3A21]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Итог и кнопка оформления */}
            {items.length > 0 && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="border-t border-[#E2DCD3] p-6 space-y-4"
              >
                <div className="flex justify-between text-lg">
                  <span className="text-[#8B7D6B]">Подытог:</span>
                  <span className="font-semibold text-[#3D2B1F]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-[#8B7D6B]">
                  <span>Доставка:</span>
                  <span>Рассчитывается при оформлении</span>
                </div>
                <div className="border-t border-[#E2DCD3] pt-4">
                  <div className="flex justify-between text-xl font-semibold">
                    <span>Итого:</span>
                    <span className="text-[#5C3A21]">
                      ${totalPrice.toFixed(2)} USD
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button onClick={closeCart} className="flex-1 btn-secondary">
                    Продолжить
                  </button>
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="flex-1 btn-primary text-center"
                  >
                    Оформить
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
