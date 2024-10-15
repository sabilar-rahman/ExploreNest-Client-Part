"use client";
import { motion } from "framer-motion";

import { teamMembers } from "@/src/constant/teamMembers";

const TeamSection = () => {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
      <div className="flex justify-center flex-wrap gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="w-64 p-4 rounded-lg shadow-lg bg-gray-100"
            whileHover={{ scale: 1.05 }}
          >
            <img
              alt={member.name}
              className="w-full h-64 object-cover rounded-md mb-4"
              src={member.img}
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
