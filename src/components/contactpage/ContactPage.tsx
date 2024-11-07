// "use client";

// import Aos from "aos";
// import { useEffect } from "react";
// import "aos/dist/aos.css";

// const ContactPage = () => {
//   useEffect(() => {
//     Aos.init({ duration: 1200 });
//   }, []);

//   return (
//     <div className="container mx-auto px-4">
//       {/* Contact Information */}
//       <section data-aos="fade-up">
//         <div className="bg-gradient-to-r from-green-400 to-green-600 text-white py-12 px-8 rounded-lg shadow-lg">
//           <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
//           <p className="text-lg leading-relaxed mb-6 text-center">
//             Have questions? Reach out to Explore Nest for all your travel
//             and exploration needs!
//           </p>
//           <ul className="text-center text-lg mb-6 space-y-2">
//             <li>
//               <strong>Email:</strong> support@explorenest.com
//             </li>
//             <li>
//               <strong>Phone:</strong> (123) 456-7890
//             </li>
//             <li>
//               <strong>Address:</strong> 456 Explore Avenue, Adventure City, AC 78910
//             </li>
//           </ul>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ContactPage;

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
            Have questions? Reach out to Explore Nest for all your travel and
            exploration needs!
          </p>
          <ul className="text-center text-lg mb-6 space-y-2">
            <li>
              <strong>Email:</strong> support@explorenest.com
            </li>
            <li>
              <strong>Phone:</strong> (123) 456-7890
            </li>
            <li>
              <strong>Address:</strong> 456 Explore Avenue, Adventure City, AC
              78910
            </li>
          </ul>
        </div>
      </section>

      {/* Google Maps Location */}

      <section data-aos="fade-up" className="my-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Location</h2>
        <div className="flex justify-center">
          {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.387090957561!2d-122.41941518468128!3d37.77492927975927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064ecf61b97%3A0x1c2e0b9b9e8435d!2s456%20Explore%20Avenue%2C%20Adventure%20City%2C%20AC%2078910!5e0!3m2!1sen!2sus!4v1672846343001!5m2!1sen!2sus"
            width="600"
            height="450"
            style={{ border: 0 }}
           
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg w-full max-w-2xl"
          ></iframe> */}

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d767.4341942369052!2d90.34825925477693!3d23.798933428253864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1731017744503!5m2!1sen!2sbd"
            width="1000"
            height="500"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg w-full max-w-2xl"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
