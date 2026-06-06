// src/components/Shop/ShopFilters.jsx
import { motion } from "framer-motion";

const categories = [
  { id: "all", name: "Все товары" },
  { id: "Кресла", name: "Кресла" },
  { id: "Столы", name: "Столы" },
  { id: "Диваны", name: "Диваны" },
  { id: "Свет", name: "Светильники" },
  { id: "Декор", name: "Декор" },
];

const ShopFilters = ({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Поиск */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Поиск товаров..."
          className="w-full px-5 py-3 bg-[#F5F0E8] border border-[#E2DCD3] rounded-full focus:outline-none focus:border-[#8B7D6B] transition-colors text-[#3D2B1F] placeholder:text-[#8B7D6B]"
        />
        <svg
          className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8B7D6B]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Категории */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-5 py-2 rounded-full transition-all duration-300 ${
              activeCategory === category.id
                ? "bg-[#3D2B1F] text-white"
                : "bg-[#F5F0E8] text-[#8B7D6B] hover:bg-[#E2DCD3] hover:text-[#3D2B1F]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ShopFilters;
