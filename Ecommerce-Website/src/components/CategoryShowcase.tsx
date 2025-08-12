import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shirt, Home, Gamepad2, Book, Dumbbell } from 'lucide-react';

interface CategoryCard {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  productCount: number;
  image: string;
  color: string;
  description: string;
}

const CategoryShowcase: React.FC = () => {
  const categories: CategoryCard[] = [
    {
      id: 1,
      name: "Electronics",
      icon: Zap,
      productCount: 2847,
      image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400",
      color: "from-blue-500 to-blue-700",
      description: "Latest gadgets & tech"
    },
    {
      id: 2,
      name: "Fashion",
      icon: Shirt,
      productCount: 1923,
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
      color: "from-pink-500 to-rose-600",
      description: "Trendy clothing & accessories"
    },
    {
      id: 3,
      name: "Home & Kitchen",
      icon: Home,
      productCount: 1456,
      image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400",
      color: "from-green-500 to-emerald-600",
      description: "Everything for your home"
    },
    {
      id: 4,
      name: "Gaming",
      icon: Gamepad2,
      productCount: 892,
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400",
      color: "from-purple-500 to-indigo-600",
      description: "Gaming gear & accessories"
    },
    {
      id: 5,
      name: "Books",
      icon: Book,
      productCount: 3241,
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      color: "from-amber-500 to-orange-600",
      description: "Knowledge & entertainment"
    },
    {
      id: 6,
      name: "Sports & Fitness",
      icon: Dumbbell,
      productCount: 1567,
      image: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400",
      color: "from-red-500 to-pink-600",
      description: "Stay fit & healthy"
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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
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
            Shop by Category
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Discover amazing products across all your favorite categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  {/* Background Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      {/* Icon */}
                      <div className="flex justify-between items-start">
                        <motion.div
                          className="bg-white bg-opacity-20 p-3 rounded-full backdrop-blur-sm"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <IconComponent className="h-6 w-6" />
                        </motion.div>
                        
                        {/* Product Count */}
                        <div className="text-right">
                          <div className="text-sm opacity-90">Products</div>
                          <div className="text-lg font-bold">
                            {category.productCount.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      {/* Category Info */}
                      <div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-200">
                          {category.name}
                        </h3>
                        <p className="text-sm opacity-90 mb-4">
                          {category.description}
                        </p>
                        
                        {/* CTA Button */}
                        <motion.div
                          className="flex items-center text-sm font-semibold group-hover:translate-x-2 transition-transform duration-200"
                          whileHover={{ x: 5 }}
                        >
                          <span>Shop Now</span>
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Categories Button */}
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
            View All Categories
            <ArrowRight className="h-5 w-5 ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryShowcase;