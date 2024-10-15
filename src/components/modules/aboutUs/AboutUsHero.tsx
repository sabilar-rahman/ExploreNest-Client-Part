"use client";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";

const AboutUsHero = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(./about-us-hero.jpg)" }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-4"
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold mb-4">Welcome to Travelio</h1>
        <p className="text-lg mb-6">
          A community where adventurers share their travel tips and experiences.
        </p>
        <Button color="primary">Explore Now</Button>
      </motion.div>
    </section>
  );
};

export default AboutUsHero;
