import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Hero from "../components/Hero";
import Categories from "../components/Categories";
import DealsSection from "../components/DealsSection";
import BestSellers from "../components/Bestseller";
import CategoryShowcase from "../components/CategoryShowcase";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  /* motion variants */
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };
  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingSpinner key="loading" />
      ) : (
        <motion.div
          key="home-content"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="initial"
          className="flex flex-col gap-12"
        >
          {[Hero, Categories, DealsSection, CategoryShowcase, BestSellers].map(
            (Section, i) => (
              <motion.div key={i} variants={sectionVariants}>
                <Section />
              </motion.div>
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomePage;
