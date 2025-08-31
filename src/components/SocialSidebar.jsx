import React from 'react';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa'; // ✅ Correct import for WhatsApp icon

const SocialSidebar = () => {
  const socialLinks = [
    {
      href: "https://github.com/GovindMishra8445",
      icon: <Github size={20} />,
      label: "GitHub",
      color: "hover:text-gray-800 dark:hover:text-gray-200",
      className: "bg-[#F0F2F6]",
    },
    {
      href: "https://x.com/GovindMishra445?t=jXMauDwOzAv_Uc7gYDyvIA&s=08",
      icon: <Twitter size={20} />,
      label: "Twitter",
      color: "hover:text-blue-500 dark:hover:text-blue-400",
      className: "bg-[#F0F2F6]",
    },
    {
      href: "https://www.linkedin.com/in/govindmishra-bca/",
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
      color: "hover:text-blue-600 dark:hover:text-blue-500",
      className: "bg-[#F0F2F6]",
    },
    {
      href: "https://wa.me/6200538445", // ✅ Replace with actual WhatsApp link
      icon: <FaWhatsapp size={20} />,
      label: "WhatsApp",
      color: "hover:text-green-500 dark:hover:text-green-400", // ✅ WhatsApp green
      className: "bg-[#F0F2F6]",
    },
    {
      href: "https://instagram.com/YourInstagramHandle",
      icon: <Instagram size={20} />,
      label: "Instagram",
      color: "hover:text-pink-500 dark:hover:text-pink-400",
      className: "bg-[#F0F2F6]",
    }
  ];

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col space-y-5">
      {socialLinks.map((link, index) => (
        <a 
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 rounded-full bg-[#F0F2F6] dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-500 dark:text-gray-300 transition-all duration-300 hover:shadow-xl ${link.color} hover:-translate-y-1`}
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;
