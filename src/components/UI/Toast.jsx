// src/components/UI/Toast.jsx
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ isVisible, message, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 w-full transform -translate-x-1/2 z-50"
        >
          <div className="bg-[#3D2B1F] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
