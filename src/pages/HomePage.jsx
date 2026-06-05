// src/pages/HomePage.jsx
import HeroSection from "../components/Home/HeroSection";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import FeaturesSection from "../components/Home/FeaturesSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <FeaturesSection />
    </>
  );
};

export default HomePage;
