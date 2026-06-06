// src/components/Layout/Header.jsx
import { Link } from "react-router-dom";
import { useCartItemCount } from "../../store/cartStore";
import { useUIStore } from "../../store/uiStore";

const Header = () => {
  const openCart = useUIStore((state) => state.openCart);
  const itemCount = useCartItemCount();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E2DCD3]">
      <div className="container-custom py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-light tracking-wide text-[#3D2B1F]"
        >
          Noyer
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link
            to="/shop"
            className="text-[#8B7D6B] hover:text-[#3D2B1F] transition-colors"
          >
            Магазин
          </Link>
          <Link
            to="/about"
            className="text-[#8B7D6B] hover:text-[#3D2B1F] transition-colors"
          >
            О нас
          </Link>
          <Link
            to="/contact"
            className="text-[#8B7D6B] hover:text-[#3D2B1F] transition-colors"
          >
            Контакты
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="hidden md:block text-[#8B7D6B] hover:text-[#3D2B1F] transition-colors"
          >
            Корзина
          </Link>
          <button
            onClick={openCart}
            className="relative p-2 hover:bg-[#F5F0E8] rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6 text-[#3D2B1F]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#5C3A21] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
