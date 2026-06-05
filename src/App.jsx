// src/App.jsx
import { useRoutes } from "react-router-dom";
import { routes } from "./router";
import { AnimatePresence } from "framer-motion";

function App() {
  const routing = useRoutes(routes);

  return <AnimatePresence mode="wait">{routing}</AnimatePresence>;
}

export default App;
