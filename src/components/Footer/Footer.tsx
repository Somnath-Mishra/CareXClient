// import { Link } from "react-router-dom";
// import Logo from "../Logo";

// function Footer() {
//   return (
//     <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
//       <div className="relative z-10 mx-auto max-w-7xl px-4">
//         <div className="-m-6 flex flex-wrap">
//           <div className="w-full p-6 md:w-1/2 lg:w-5/12">
//             <div className="flex h-full flex-col justify-between">
//               <div className="mb-4 inline-flex items-center">
//                 <Logo width="100px" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">
//                   &copy; Copyright 2023. All Rights Reserved by DevUI.
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//             <div className="h-full">
//               <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                 Support
//               </h3>
//               <ul>
//                 <li className="mb-4">
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/account"
//                   >
//                     Account
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/help"
//                   >
//                     Help
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/contact-us"
//                   >
//                     Contact Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/customer-support"
//                   >
//                     Customer Support
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//             <div className="h-full">
//               <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                 Legals
//               </h3>
//               <ul>
//                 <li className="mb-4">
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/terms-and-conditions"
//                   >
//                     Terms &amp; Conditions
//                   </Link>
//                 </li>
//                 <li className="mb-4">
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/privacy-policy"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                     to="/licensing"
//                   >
//                     Licensing
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Footer;
import { FC } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold mb-2">CareX</h1>
            <p className="text-gray-400">
              Your trusted partner for medical consultations. Providing the best
              care and support to our patients.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
              <ul>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-gray-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-gray-300">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-gray-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="mb-6 md:mb-0">
              <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  <FaFacebookF size={20} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  <FaLinkedinIn size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} CareX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
