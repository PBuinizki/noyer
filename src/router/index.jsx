// src/router/index.jsx
import { createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../components/Layouts/RootLayout";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

export const routes = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<HomePage />} />
    <Route path="shop" element={<ShopPage />} />
    <Route path="product/:id" element={<ProductPage />} />
    <Route path="cart" element={<CartPage />} />
    <Route path="checkout" element={<CheckoutPage />} />
  </Route>
);
