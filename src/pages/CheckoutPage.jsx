// src/pages/CheckoutPage.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  useCartStore,
  useCartTotal,
  useCartItemCount,
} from "../store/cartStore";
import ShippingForm from "../components/Checkout/ShippingForm";
import DeliveryForm from "../components/Checkout/DeliveryForm";
import PaymentForm from "../components/Checkout/PaymentForm";
import OrderConfirmation from "../components/Checkout/OrderConfirmation";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const totalPrice = useCartTotal();
  const totalItems = useCartItemCount();
  const [step, setStep] = useState(1);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const pageRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    delivery: "standard",
    payment: "card",
  });

  // Редирект, если корзина пуста
  useEffect(() => {
    if (items.length === 0 && !orderCompleted) {
      navigate("/cart");
    }
  }, [items, navigate, orderCompleted]);

  // Анимация появления
  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const deliveryPrice = formData.delivery === "express" ? 500 : 0;
  const finalTotal = totalPrice + deliveryPrice;

  const handleSubmitOrder = () => {
    // Здесь будет отправка заказа на сервер
    console.log("Заказ отправлен:", { ...formData, items, total: finalTotal });
    clearCart();
    setOrderCompleted(true);
  };

  if (orderCompleted) {
    return (
      <div ref={pageRef} className="min-h-screen bg-white py-20">
        <div className="container-custom">
          <OrderConfirmation orderData={formData} />
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Форма */}
          <div className="md:col-span-2">
            {/* Прогресс-бар */}
            <div className="flex mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      step >= i
                        ? "bg-[#5C3A21] text-white"
                        : "bg-[#E2DCD3] text-[#8B7D6B]"
                    }`}
                  >
                    {i}
                  </div>
                  {i < 3 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        step > i ? "bg-[#5C3A21]" : "bg-[#E2DCD3]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Формы по шагам */}
            {step === 1 && (
              <ShippingForm
                data={formData}
                onChange={updateFormData}
                onNext={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <DeliveryForm
                data={formData}
                onChange={updateFormData}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <PaymentForm
                data={formData}
                onChange={updateFormData}
                onBack={() => setStep(2)}
                onSubmit={handleSubmitOrder}
              />
            )}
          </div>

          {/* Сводка заказа */}
          <div className="md:col-span-1">
            <div className="bg-[#F5F0E8] rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-medium text-[#3D2B1F] mb-4">
                Ваш заказ
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#8B7D6B]">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-[#3D2B1F]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E2DCD3] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B7D6B]">Подытог:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B7D6B]">Доставка:</span>
                  <span>
                    {deliveryPrice === 0 ? "Бесплатно" : `$${deliveryPrice}`}
                  </span>
                </div>
                <div className="border-t border-[#E2DCD3] pt-3 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Итого:</span>
                    <span className="text-[#5C3A21] text-xl">
                      ${finalTotal.toFixed(2)} USD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
