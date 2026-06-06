// src/pages/CartPage.jsx (обновлённая версия)
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  useCartStore,
  useCartTotal,
  useCartItemCount,
} from "../store/cartStore";
import CartItemRow from "../components/Cart/CartItemRow";
import ProductGrid from "../components/Shop/ProductGrid";
import { products } from "../data/products";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const totalPrice = useCartTotal();
  const totalItems = useCartItemCount();
  const pageRef = useRef(null);

  // Анимация появления страницы
  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  // Рекомендуемые товары (исключаем те, что уже в корзине)
  const cartItemIds = items.map((item) => item.id);
  const recommendedProducts = products
    .filter((product) => !cartItemIds.includes(product.id))
    .slice(0, 4); // максимум 4 товара для рекомендаций

  if (items.length === 0) {
    return (
      <div ref={pageRef} className="min-h-screen bg-white py-20">
        <div className="container-custom text-center">
          <div className="mb-8">
            <svg
              className="w-32 h-32 mx-auto text-[#E2DCD3]"
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
          <h1 className="text-3xl md:text-4xl font-light text-[#3D2B1F] mb-4">
            Ваша корзина пуста
          </h1>
          <p className="text-[#8B7D6B] mb-8 max-w-md mx-auto">
            Похоже, вы ещё не выбрали ни одного товара. Давайте это исправим!
          </p>
          <Link to="/shop" className="btn-primary inline-block">
            Перейти в магазин
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-white pb-20">
      <div className="container-custom">
        {/* Заголовок */}
        <div className="py-8 mb-4">
          <h1 className="section-title text-left">Корзина</h1>
          <p className="text-[#8B7D6B] mt-2">
            {totalItems} товар{totalItems !== 1 ? "ов" : ""} на сумму $
            {totalPrice.toFixed(2)}
          </p>
        </div>

        {/* Таблица корзины (десктоп) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#E2DCD3]">
              <tr className="text-left text-[#8B7D6B] text-sm">
                <th className="pb-4">Товар</th>
                <th className="pb-4">Цена</th>
                <th className="pb-4">Количество</th>
                <th className="pb-4">Итого</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <CartItemRow key={item.id} item={item} index={index} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Мобильная версия (карточки) */}
        <div className="md:hidden space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#F5F0E8] rounded-2xl p-4"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[#3D2B1F]">{item.name}</h3>
                  <p className="text-[#5C3A21] font-medium mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          useCartStore
                            .getState()
                            .updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          useCartStore
                            .getState()
                            .updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        useCartStore.getState().removeItem(item.id)
                      }
                      className="text-[#8B7D6B] hover:text-red-500"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Итоговая панель */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Link
              to="/shop"
              className="btn-secondary inline-flex items-center gap-2"
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
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Продолжить покупки
            </Link>
          </div>

          <div className="md:col-span-1">
            <div className="bg-[#F5F0E8] rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-medium text-[#3D2B1F] mb-4">
                Сумма заказа
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-[#8B7D6B]">
                  <span>Товары ({totalItems}):</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#8B7D6B]">
                  <span>Доставка:</span>
                  <span>Рассчитывается при оформлении</span>
                </div>
              </div>

              <div className="border-t border-[#E2DCD3] pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Итого:</span>
                  <span className="text-[#5C3A21]">
                    ${totalPrice.toFixed(2)} USD
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate("/checkout")}
                  className="btn-primary w-full text-center"
                >
                  Оформить заказ
                </button>
                <button
                  onClick={clearCart}
                  className="text-[#8B7D6B] text-sm hover:text-red-500 transition-colors"
                >
                  Очистить корзину
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Рекомендуемые товары - используем ProductGrid! */}
        {recommendedProducts.length > 0 && (
          <div className="mt-20">
            <ProductGrid
              products={recommendedProducts}
              title="Вам также может понравиться"
              subtitle="Товары, которые отлично дополнят ваш выбор"
              showViewAll={false}
              columns={4}
              withAnimation={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
