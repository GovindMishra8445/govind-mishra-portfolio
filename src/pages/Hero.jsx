import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { ArrowDown, X, Download, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const el = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const fullText = `I am a passionate and results-driven software professional with a proven record of delivering innovative IT solutions. 
With deep expertise in HTML, CSS, and modern front-end frameworks like React.js, React Native, and Tailwind CSS, I bring creative designs to life with smooth animations using Framer Motion. 
My technical foundation is further reinforced by strong coding practices in JavaScript, C Programming, and SQL, complemented by hands-on experience with Next.js and Node.js. 
I thrive in fast-paced, dynamic environments where I continuously push the boundaries of technology. 
Whether I'm developing interactive user interfaces or crafting robust back-end systems, my goal is to create digital experiences that are not only visually appealing but also scalable and efficient. 
I am committed to leveraging my skills to make a lasting impact and drive meaningful change in every project I undertake.`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 md:pt-32 lg:pt-10 overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-20">
        <motion.div
          className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Left Content */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-2"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Govind Mishra
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto md:mx-0 mb-2">
                I am a passionate software professional with a proven record of
                delivering innovative IT solutions.....
                <button
                  onClick={() => setShowModal(true)}
                  className="ml-1 text-blue-400 hover:text-blue-300 hover:underline focus:outline-none transition-colors"
                >
                  See More
                </button>
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <span>Hire Me</span>
                <ExternalLink size={18} />
              </Link>
              <Link
                to="projects"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm cursor-pointer text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-white/20 border border-white/20 flex items-center justify-center gap-2"
              >
                <span>My Work</span>
                <ArrowDown size={18} className=" animate-bounce" />
              </Link>
              <a
                href="/resume.pdf"
                className="px-6 py-3 bg-gray-800/50 cursor-progress backdrop-blur-sm text-gray-300 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-800/70 border border-gray-700/30 flex items-center justify-center gap-2"
                download
              >
                <span>Resume</span>
                <Download size={18} className=" animate-pulse" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          {/* Right Image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center items-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative w-[250px] sm:w-[280px] md:w-[320px] lg:w-[350px] h-auto">
              {/* Glowing Animated Circle */}
              <motion.div
                className="absolute inset-0 m-auto w-full h-full rounded-full bg-gradient-to-tr from-orange-400 via-pink-500 to-yellow-400 blur-3xl opacity-50 animate-spin-slow z-0"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />

              {/* Image */}
              <motion.div
                className="relative z-10 w-full aspect-square"
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
              >
                <picture>
                  <source
                    media="(max-width: 639px)"
                    srcSet="/assets/images/govind2removebg.png"
                  />
                  <source
                    media="(min-width: 768px)"
                    srcSet="/assets/images/govind1removebg.png"
                  />
                  <img
                    src="/assets/images/govind1.jpg"
                    alt="Govind Mishra"
                    className="w-full h-full object-contain rounded-xl drop-shadow-lg"
                  />
                </picture>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-blue-400 shadow-md hover:shadow-lg cursor-pointer border border-white/20 hover:bg-white/20 transition-all duration-300 group"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown
              size={20}
              className="group-hover:text-blue-300 transition-colors"
            />
          </motion.div>
        </Link>
      </motion.div>

      {/* Modal for "See More" Content */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {/* Running Border Wrapper */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-xl animate-border-flow bg-[length:200%_auto]"></div>

              {/* Modal Content */}
              <div className="bg-gray-900 rounded-xl p-4 sm:p-6 md:p-8 relative z-10 border border-gray-800 max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-white cursor-pointer bg-gray-800/50 p-1.5 rounded-full transition-colors z-20"
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6 text-gradient bg-gradient-to-r from-blue-400 to-purple-500 pr-8">
                  About Me
                </h3>

                <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg select-none">
                  {fullText}
                </p>

                <div className="mt-4 sm:mt-6 flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
