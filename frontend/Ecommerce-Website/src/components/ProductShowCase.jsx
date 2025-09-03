import React from "react";

import ProductSectionHomepage from "./ProductSectionHomepage.jsx";

const ProductShowcase = () => {
  const beautyFoodToysProducts = [
    {
      id: "1",
      image:
        "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Coffee Powder",
      discount: "Upto 80% Off",
    },
    {
      id: "2",
      image:
        "https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Top Selling Stationery",
      price: "From ₹49",
    },
    {
      id: "3",
      image:
        "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Dry Fruits",
      discount: "Upto 75% Off",
    },
    {
      id: "4",
      image:
        "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Geared Cycles",
      discount: "Up to 70% Off",
    },
    {
      id: "5",
      image:
        "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Remote Control Toys",
      discount: "Up to 80% Off",
    },
    {
      id: "6",
      image:
        "https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Best of Action Toys",
      discount: "Up to 70% Off",
    },
    {
      id: "7",
      image:
        "https://images.pexels.com/photos/236111/pexels-photo-236111.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Soft Toys",
      discount: "Upto 70% Off",
    },
  ];

  const sportsHealthcareProducts = [
    {
      id: "8",
      image:
        "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Musical Toys",
      price: "Under ₹199",
    },
    {
      id: "9",
      image:
        "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Food Spreads",
      discount: "Upto 75% Off",
    },
    {
      id: "10",
      image:
        "https://images.pexels.com/photos/301703/pexels-photo-301703.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Puzzles & Cubes",
      price: "From ₹79",
    },
    {
      id: "11",
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Breakfast Cereal",
      discount: "Upto 75% Off",
    },
    {
      id: "12",
      image:
        "https://images.pexels.com/photos/8617709/pexels-photo-8617709.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Learning & Educational Toys",
      discount: "Up to 80% Off",
    },
    {
      id: "13",
      image:
        "https://images.pexels.com/photos/33783/honey-sweet-syrup-organic.jpg?auto=compress&cs=tinysrgb&w=400",
      title: "Honey",
      discount: "Upto 75% Off",
    },
  ];

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductSectionHomepage
          title="Beauty, Food, Toys & more"
          products={beautyFoodToysProducts}
        />

        <ProductSectionHomepage
          title="Sports, Healthcare & more"
          products={sportsHealthcareProducts}
        />
      </div>
    </div>
  );
};

export default ProductShowcase;
