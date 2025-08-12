import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Truck, CreditCard, Tag } from 'lucide-react';

const SaleSection = ({ currentDeal, currentSlide, setCurrentSlide, isVisible }) => {
  const deals = [
    {
      discount: "60%",
      title: "Mega Sale",
      subtitle: "Best deals of the season",
      badge: "SALE"
    },
    {
      discount: "70%",
      title: "Flash Sale",
      subtitle: "Limited time offers",
      badge: "FLASH"
    },
    {
      discount: "50%",
      title: "Weekend Special",
      subtitle: "Exclusive weekend deals",
      badge: "SPECIAL"
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-400 rounded-3xl p-8 shadow-xl overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/20 rounded-full animate-float"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-white" />
            <span className="text-white font-semibold text-sm">{currentDeal.badge}</span>
          </div>

          <div className="absolute top-6 right-6">
            <Tag className="w-6 h-6 text-white/70" />
          </div>

          <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="mb-2">
              <span className="text-gray-700 font-medium text-lg">OFF</span>
            </div>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <span className="text-6xl font-black text-gray-800">
                  {currentDeal.discount}
                </span>
              </div>
              <div className="bg-white/40 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <span className="text-2xl font-bold text-gray-700">OFF</span>
              </div>
            </div>

            <div className="bg-white/30 backdrop-blur-sm rounded-lg p-3 mb-3 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800">{currentDeal.title}</h2>
            </div>

            <p className="text-gray-700 font-medium text-base mb-8">
              {currentDeal.subtitle}
            </p>
          </div>

          <div className="flex justify-center gap-2">
            {deals.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const deals = [
    {
      discount: "60%",
      title: "Mega Sale",
      subtitle: "Best deals of the season",
      badge: "SALE"
    },
    {
      discount: "70%",
      title: "Flash Sale",
      subtitle: "Limited time offers",
      badge: "FLASH"
    },
    {
      discount: "50%",
      title: "Weekend Special",
      subtitle: "Exclusive weekend deals",
      badge: "SPECIAL"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % deals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentDeal = deals[currentSlide];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const features = [
    { icon: Shield, text: "Secure Shopping", color: "text-green-500" },
    { icon: Truck, text: "Free Shipping", color: "text-blue-700" },
    { icon: CreditCard, text: "Easy Returns", color: "text-orange-500" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-100 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="py-12 md:py-20 lg:py-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <motion.div variants={itemVariants} className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
                  <Star className="h-4 w-4 mr-2 fill-current" />
                  Trusted by 50,000+ customers
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Shop Smart,
                  <span className="block text-blue-700">Live Better</span>
                </h1>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Discover amazing products at unbeatable prices. From electronics to fashion, 
                we've got everything you need with fast, reliable delivery.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <motion.button
                  className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>

                <motion.button
                  className="border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-700 hover:text-blue-700 transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Browse Categories
                </motion.button>
              </motion.div>

              {/* Features */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center lg:justify-start gap-6"
              >
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={feature.text}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <IconComponent className={`h-5 w-5 ${feature.color}`} />
                      <span className="text-gray-600 font-medium">{feature.text}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Content */}
            <div className="relative">
              <motion.div className="relative z-10" variants={itemVariants}>
                <SaleSection
                  currentDeal={currentDeal}
                  currentSlide={currentSlide}
                  setCurrentSlide={setCurrentSlide}
                  isVisible={isVisible}
                />
                <motion.div
                  className="absolute -top-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                  variants={floatingVariants}
                  animate="animate"
                >
                  <div className="text-sm font-semibold">50% OFF</div>
                  <div className="text-xs">Limited Time</div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2, type: "spring", stiffness: 200 }}
                  variants={floatingVariants}
                  animate="animate"
                >
                  <div className="text-sm font-semibold">Free Shipping</div>
                  <div className="text-xs">On orders $50+</div>
                </motion.div>
              </motion.div>

              <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                  {[...Array(64)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="border border-gray-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.01 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="mt-16 pt-8 border-t border-gray-200"
            variants={itemVariants}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "50K+", label: "Happy Customers" },
                { number: "10K+", label: "Products" },
                { number: "99.9%", label: "Uptime" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
