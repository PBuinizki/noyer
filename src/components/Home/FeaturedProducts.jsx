// src/components/Home/FeaturedProducts.jsx
import ProductGrid from "../Shop/ProductGrid";
import { products } from "../../data/products";

const FeaturedProducts = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <ProductGrid
      products={featuredProducts}
      title="Избранное"
      subtitle="Предметы, которые вдохновляют на создание уютного пространства"
      showViewAll={true}
      viewAllLink="/shop"
      columns={4}
      withAnimation={true}
    />
  );
};

export default FeaturedProducts;
