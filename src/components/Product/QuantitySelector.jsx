// src/components/Product/QuantitySelector.jsx
const QuantitySelector = ({ quantity, onChange, maxStock = 99 }) => {
  const increment = () => {
    if (quantity < maxStock) {
      onChange(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-[#8B7D6B]">Количество:</span>
      <div className="flex items-center gap-3">
        <button
          onClick={decrement}
          className="w-10 h-10 rounded-full bg-[#F5F0E8] hover:bg-[#E2DCD3] transition-colors flex items-center justify-center text-xl"
        >
          -
        </button>
        <span className="w-12 text-center text-lg font-medium text-[#3D2B1F]">
          {quantity}
        </span>
        <button
          onClick={increment}
          className="w-10 h-10 rounded-full bg-[#F5F0E8] hover:bg-[#E2DCD3] transition-colors flex items-center justify-center text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
