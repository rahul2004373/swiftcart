import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, TrendingUp, Award } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  soldCount: number;
}

const BestSellers: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      title: "Premium Wireless Earbuds",
      price: 129.99,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviews: 2847,
      badge: "#1 Bestseller",
      soldCount: 15420
    },
    {
      id: 2,
      title: "Smart Home Security Camera",
      price: 89.99,
      image: "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 1923,
      badge: "Top Rated",
      soldCount: 8930
    },
    {
      id: 3,
      title: "Ergonomic Office Chair",
      price: 249.99,
      image: "https://images.pexels.com/photos/586996/pexels-photo-586996.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 1456,
      badge: "Editor's Choice",
      soldCount: 5670
    },
    {
      id: 4,
      title: "Portable Power Bank 20000mAh",
      price: 39.99,
      image: "https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviews: 3241,
      badge: "Most Popular",
      soldCount: 12340
    },
    {
      id: 5,
      title: "Stainless Steel Water Bottle",
      price: 24.99,
      image: "https://images.pexels.com/photos/3766230/pexels-photo-3766230.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      reviews: 987,
      badge: "Eco-Friendly",
      soldCount: 7890
    },
    {
      id: 6,
      title: "LED Desk Lamp with USB Charging",
      price: 45.99,
      image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 1567,
      badge: "New Arrival",
      soldCount: 4560
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case '#1 Bestseller':
        return 'bg-green-500';
      case 'Top Rated':
        return 'bg-blue-700';
      case "Editor's Choice":
        return 'bg-purple-500';
      case 'Most Popular':
        return 'bg-orange-500';
      case 'Eco-Friendly':
        return 'bg-green-600';
      case 'New Arrival':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-orange-500 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Bestsellers
            </h2>
          </div>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Our most loved products, chosen by thousands of satisfied customers
          </p>
          <div className="flex items-center justify-center mt-4 text-green-500">
            <TrendingUp className="h-5 w-5 mr-2" />
            <span className="font-semibold">Trending Now</span>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden group cursor-pointer relative"
            >
              {/* Rank Badge for Top 3 */}
              {index < 3 && (
                <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              )}

              {/* Image Container */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Badge */}
                <div className={`absolute top-3 right-3 ${getBadgeColor(product.badge || '')} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                  {product.badge}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Quick Add
                  </motion.button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                  {product.title}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Sales Info */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500 text-sm">
                    {product.soldCount.toLocaleString()} sold
                  </span>
                  <span className="text-green-500 text-sm font-medium">
                    In Stock
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-700">
                    ${product.price}
                  </span>
                  <motion.button
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 flex items-center mx-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            View All Bestsellers
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellers;