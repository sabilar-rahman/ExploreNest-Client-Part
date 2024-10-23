"use client";

import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

const ContactPage = () => {
  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* Contact Information */}
      <section data-aos="fade-up">
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white py-12 px-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
          <p className="text-lg leading-relaxed mb-6 text-center">
            Have questions? Reach out to Turbo Shine for all your car care
            needs!
          </p>
          <ul className="text-center text-lg mb-6 space-y-2">
            <li>
              <strong>Email:</strong> support@turboshine.com
            </li>
            <li>
              <strong>Phone:</strong> (123) 456-7890
            </li>
            <li>
              <strong>Address:</strong> 456 Shine Street, Clean City, CC 78910
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
