// src/store/cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Добавить товар
      addItem: (product) => {
        const existingItem = get().items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...get().items, { ...product, quantity: 1 }],
          });
        }
      },

      // Удалить товар
      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      // Обновить количество
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
        } else {
          set({
            items: get().items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          });
        }
      },

      // Очистить корзину
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-storage",
      getStorage: () => localStorage,
    }
  )
);

// Селекторы для удобства (вычисляемые значения)
export const useCartTotal = () => {
  return useCartStore((state) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  );
};

export const useCartItemCount = () => {
  return useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0)
  );
};
