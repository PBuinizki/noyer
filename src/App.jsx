// src/App.jsx
import { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { routes } from "./router";
import PageLoader from "./components/UI/PageLoader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const routing = useRoutes(routes);

  useEffect(() => {
    // Симулируем загрузку (можно убрать или уменьшить время)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 секунды, можно уменьшить до 500

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <PageLoader key="loader" />
      ) : (
        <div key="content">{routing}</div>
      )}
    </AnimatePresence>
  );
}

export default App;
