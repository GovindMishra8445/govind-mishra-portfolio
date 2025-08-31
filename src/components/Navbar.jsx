// // components/Navbar.jsx
// import React, { useState, useEffect } from 'react';
// import { NavLink, Link as RouterLink } from 'react-router-dom';
// import { Link as ScrollLink } from 'react-scroll';
// import { Menu, X } from 'lucide-react';
// import { useTheme } from '../contexts/ThemeContext'; 
// import Logo from '../assets/images/mainLogo.png'

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const { theme } = useTheme(); // Correct usage of useTheme

//   const navItems = [
//     { label: 'Home', to: 'hero' },
//     { label: 'About', to: 'about' },
//     { label: 'Skills', to: 'skills' },
//     { label: 'Projects', to: 'projects' },
//     { label: 'Experience', to: 'experience' },
//     { label: 'Contact', to: 'contact' }
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <nav 
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         scrolled 
//           ? 'bg-black/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md py-2' 
//           : 'bg-transparent py-4'
//       }`}
//     >
//       <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
//         <NavLink to="/" className="flex items-center space-x-2">
//          <img src={Logo} alt="Logo" className="w-12 h-12 rounded-md" />
//           {/* <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Portfolio</span> */}
//         </NavLink>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex space-x-8">
//           {navItems.map((item) => (
//             <ScrollLink
//               key={item.to}
//               to={item.to}
//               spy={true}
//               smooth={true}
//               offset={-80}
//               duration={500}
//               className={`
//                 cursor-pointer font-medium relative
//                dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
//                 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0
//                 after:bg-gradient-to-r after:from-blue-500 after:to-purple-600
//                 after:transition-all after:duration-300 hover:after:w-full text-white
//               `}
//             >
//               {item.label}
//             </ScrollLink>
//           ))}
//         </div>

//         {/* Mobile Navigation Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="md:hidden text-gray-700 dark:text-gray-300 z-50"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Navigation Menu */}
//       <div
//         className={`
//           fixed inset-0 bg-white dark:bg-gray-900 z-40 flex flex-col items-center justify-center
//           transform transition-transform duration-300 md:hidden
//           ${isOpen ? 'translate-x-0' : 'translate-x-full'}
//         `}
//       >
//         <div className="flex flex-col items-center space-y-6">
//           {navItems.map((item) => (
//             <ScrollLink
//               key={item.to}
//               to={item.to}
//               spy={true}
//               smooth={true}
//               offset={-80}
//               duration={500}
//               onClick={() => setIsOpen(false)}
//               className="text-xl font-medium text-gray-800 dark:text-gray-200"
//             >
//               {item.label}
//             </ScrollLink>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Import auth

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme(); 
  const [user] = useAuthState(auth); // Check auth state

  const navItems = [
    { label: 'Home', to: 'hero' },
    { label: 'About', to: 'about' },
    { label: 'Skills', to: 'skills' },
    { label: 'Projects', to: 'projects' },
    { label: 'Experience', to: 'experience' },
    { label: 'Contact', to: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <img src="/mainLogo.png" alt="Logo" className="w-12 h-12 rounded-md" />
          {/* <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Portfolio</span> */}
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className={`
                cursor-pointer font-medium relative
                dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
                after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0
                after:bg-gradient-to-r after:from-blue-500 after:to-purple-600
                after:transition-all after:duration-300 hover:after:w-full text-white
              `}
            >
              {item.label}
            </ScrollLink>
          ))}
          <NavLink
            to="/admin"
            className={`
              font-medium relative text-white
              dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
              after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0
              after:bg-gradient-to-r after:from-blue-500 after:to-purple-600
              after:transition-all after:duration-300 hover:after:w-full
            `}
            activeClassName="text-blue-600 dark:text-blue-400 font-semibold after:w-full"
          >
            {user ? "Admin Panel" : "Login Admin Panel"}
          </NavLink>
        </div>

        {/* Mobile Navigation Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 dark:text-gray-300 z-50"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`
          fixed inset-0 bg-white dark:bg-gray-900 z-40 flex flex-col items-center justify-center
          transform transition-transform duration-300 md:hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col items-center space-y-6">
          {navItems.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              onClick={() => setIsOpen(false)}
              className="text-xl font-medium text-gray-800 dark:text-gray-200"
            >
              {item.label}
            </ScrollLink>
          ))}
          <NavLink
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="text-xl font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            activeClassName="text-blue-600 dark:text-blue-400 font-semibold"
          >
            {user ? "Admin Panel" : "Login Admin Panel"}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;