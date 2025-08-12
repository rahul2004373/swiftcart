import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, ShoppingCart, Heart, Eye } from 'lucide-react';

interface Deal {
  id: number;
  title: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  rating: number;
  reviews: number;
  timeLeft: string;
  badge?: string;
}

const DealsSection: React.FC = () => {
  const deals: Deal[] = [
    {
      id: 1,
      title: "Wireless Bluetooth Headphones",
      originalPrice: 199.99,
      salePrice: 99.99,
      discount: 50,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviews: 1234,
      timeLeft: "2h 15m",
      badge: "Flash Sale"
    },
    {
      id: 2,
      title: "Smart Fitness Watch",
      originalPrice: 299.99,
      salePrice: 179.99,
      discount: 40,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviews: 856,
      timeLeft: "5h 42m",
      badge: "Limited"
    },
    {
      id: 3,
      title: "Premium Coffee Maker",
      originalPrice: 149.99,
      salePrice: 89.99,
      discount: 40,
      image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviews: 642,
      timeLeft: "1d 3h",
      badge: "Hot Deal"
    },
    {
      id: 4,
      title: "Wireless Gaming Mouse",
      originalPrice: 79.99,
      salePrice: 49.99,
      discount: 38,
      image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      reviews: 423,
      timeLeft: "8h 20m",
      badge: "Deal"
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🔥 Flash Deals
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Limited time offers on our most popular products. Don't miss out!
          </p>
          <div className="flex items-center justify-center mt-4 text-orange-500">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-semibold">Deals end soon!</span>
          </div>
        </motion.div>

        {/* Deals Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {deals.map((deal) => (
            <motion.div
              key={deal.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-48 object-cover"
                  variants={imageVariants}
                  whileHover="hover"
                />
                
                {/* Badge */}
                <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {deal.badge}
                </div>
                
                {/* Discount Badge */}
                <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  -{deal.discount}%
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                  <motion.button
                    className="bg-white text-gray-800 p-2 rounded-full hover:bg-blue-700 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    className="bg-white text-gray-800 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                  {deal.title}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(deal.rating) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm ml-2">
                    ({deal.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-blue-700">
                      ${deal.salePrice}
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      ${deal.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Timer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-orange-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="font-medium">{deal.timeLeft}</span>
                  </div>
                  <motion.button
                    className="bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors duration-200"
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
            className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Deals
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default DealsSection;