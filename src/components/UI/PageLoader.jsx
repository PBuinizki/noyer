// src/components/UI/PageLoader.jsx
import { motion } from "framer-motion";

const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360, 720],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Внешнее кольцо */}
        <div className="w-16 h-16 border-4 border-[#E2DCD3] border-t-[#5C3A21] rounded-full animate-spin" />

        {/* Логотип в центре */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-light text-[#3D2B1F] tracking-wider">
            NOYER
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PageLoader;
