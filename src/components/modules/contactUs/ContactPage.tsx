"use client";
import { motion } from "framer-motion";
import { Input, Button } from "@nextui-org/react";

const ContactUs = () => {
  return (
    <div className="flex flex-col md:flex-row h-[80vh]">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-b from-blue-200 to-blue-400 p-8 relative">
        {/* Paper Airplane Animation */}
        <motion.img
          alt="Paper Plane"
          animate={{ x: [0, 100, -50], y: [0, 50, -30] }}
          className="absolute top-10 left-10 w-20"
          src="./paperPlane.jpg"
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-lg text-white mb-2">
            24/7 We will answer your questions and problems
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8">
        <motion.form
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input
              fullWidth
              className="w-full"
              label="First Name"
              placeholder="First Name"
            />
            <Input
              fullWidth
              className="w-full"
              label="Last Name"
              placeholder="Last Name"
            />
          </div>
          <Input fullWidth className="mb-4" label="Email" placeholder="Email" />
          <Input fullWidth className="mb-4" label="Phone" placeholder="Phone" />
          <Input
            fullWidth
            className="mb-6"
            label="Describe your issue"
            placeholder="Describe your issue"
          />
          <Button className="w-full" color="primary">
            Send
          </Button>
        </motion.form>
      </div>
    </div>
  );
};

export default ContactUs;
