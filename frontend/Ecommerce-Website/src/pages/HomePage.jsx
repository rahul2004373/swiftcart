import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ProductShowcase from "../components/ProductShowCase";
import Categoriessection from "../components/Categoriessection";
// import ShopByCategorySection from "../components/ShopByCategoryHomepage";

const HomePage = () => {
  return (
    <div>
      <Categoriessection />
      <HeroSection />
      {/* <ShopByCategorySection /> */}
      <ProductShowcase />
    </div>
  );
};

export default HomePage;
