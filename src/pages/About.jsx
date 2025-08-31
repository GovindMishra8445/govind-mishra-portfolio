// components/About.jsx
import React from 'react';
import { Download } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import aboutImage from '../../public/assets/images/govindPhoto.jpg';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6 md:px-12">
        <SectionTitle title="About Me" subtitle="My introduction" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-8">
          {/* Image Section */}
          <div className="relative group max-w-[500px] mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <img 
                src={aboutImage}
                alt="Govind - Software Developer" 
                className="w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              <span className="inline-block text-2xl mr-2">👋</span>
              <strong className="font-semibold text-gray-800 dark:text-white">Hello, and welcome to my profile!</strong> 
              I'm a highly motivated and adaptable software developer with expertise in modern web technologies including 
              React, Node.js, and SQL. I specialize in creating efficient, scalable solutions that solve real-world problems.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {[
                { value: '1+', label: 'Years Experience' },
                { value: '20+', label: 'Projects Completed' },
                { value: '5+', label: 'Happy Clients' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm text-center transition-all duration-300 hover:shadow-lg"
                >
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Detailed Sections */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                  <span className="mr-2">🚀</span>Passion & Vision
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Committed to developing innovative technologies that shape the future, I focus on creating solutions 
                  that make a meaningful impact on people's lives and businesses.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                  <span className="mr-2">🤝</span>Collaboration
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  I thrive in team environments, believing that the best solutions come from diverse perspectives 
                  and collaborative problem-solving.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <h3 className="flex items-center text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                  <span className="mr-2">📬</span>Let's Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Interested in discussing opportunities or sharing ideas? Let's explore how we can collaborate 
                  to create something amazing!
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button className="flex items-center justify-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02] mt-6 w-full md:w-auto">
              <Download size={20} className="flex-shrink-0" />
              <span>Download CV</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;