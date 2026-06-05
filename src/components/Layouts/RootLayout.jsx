// src/layouts/RootLayout.jsx
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "../Cart/CartDrawer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      <motion.main
        className="flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Outlet />
      </motion.main>

      <Footer />
    </div>
  );
};

export default RootLayout;
