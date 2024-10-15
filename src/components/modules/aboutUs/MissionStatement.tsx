"use client";
import { motion } from "framer-motion";

const MissionStatement = () => {
  return (
    <motion.section
      className="py-16 bg-gray-100 text-center"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
      <p className="text-lg mx-auto max-w-3xl">
        Our mission is to connect travelers with unique destinations and provide
        them with reliable tips and guides to make their journey unforgettable.
      </p>
    </motion.section>
  );
};

export default MissionStatement;
