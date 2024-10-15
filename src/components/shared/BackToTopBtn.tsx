"use client";
import { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";

const BackToTopBtn = () => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop} // Trigger smooth scroll to top
      className={`${
        !isActive ? "hidden" : "flex"
      } fixed bg-primary-300 hover:bg-primary-500 w-12 h-12 right-16 bottom-11 z-11 cursor-pointer justify-center items-center text-white border-2`}
    >
      <FaChevronUp className="text-xl" />
    </button>
  );
};

export default BackToTopBtn;
