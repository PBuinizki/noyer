// src/pages/HomePage.jsx
import HeroSection from "../components/Home/HeroSection";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import FeaturesSection from "../components/Home/FeaturesSection";
import WhyUsSection from "../components/Home/WhyUsSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <FeaturesSection />
      <WhyUsSection />
    </>
  );
};

export default HomePage;
