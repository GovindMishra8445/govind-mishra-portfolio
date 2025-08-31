// // components/Skills.jsx
// import React, { useState } from 'react';
// import SectionTitle from './SectionTitle';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import SkillSlider from './SkillSlider';

// const Skills = () => {
//   const [activeTab, setActiveTab] = useState('frontend');

//   const skillsData = {
//     frontend: [
//       { name: 'HTML', level: 95 },
//       { name: 'CSS/SASS', level: 90 },
//       { name: 'JavaScript', level: 92 },
//       { name: 'React', level: 94 },
//       { name: 'Redux', level: 85 },
//       { name: 'Tailwind CSS', level: 88 },
//     ],
//     backend: [
//       { name: 'Node.js', level: 80 },
//       { name: 'Express', level: 75 },
//       { name: 'MongoDB', level: 70 },
//       { name: 'Firebase', level: 82 },
//       { name: 'REST APIs', level: 85 },
//       { name: 'GraphQL', level: 72 },
//     ],
//     tools: [
//       { name: 'Git', level: 90 },
//       { name: 'Webpack', level: 82 },
//       { name: 'Figma', level: 88 },
//       { name: 'Jest', level: 78 },
//       { name: 'VS Code', level: 95 },
//       { name: 'Docker', level: 65 },
//     ]
//   };

//   const categories = [
//     { id: 'frontend', label: 'Frontend Development' },
//     { id: 'backend', label: 'Backend Development' },
//     { id: 'tools', label: 'Tools & Software' }
//   ];

//   return (
//     <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-6 md:px-12">
//         <SectionTitle title="Skills" subtitle="My technical level" />

//         <div className="max-w-4xl mx-auto mt-12">
//           <div className="flex flex-wrap gap-4 mb-8 justify-center">
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => setActiveTab(category.id)}
//                 className={`
//                   px-6 py-3 rounded-lg transition-all duration-300 font-medium
//                   ${activeTab === category.id
//                     ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
//                     : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'}
//                 `}>
//                 {category.label}
//               </button>
//             ))}
//           </div>

//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {skillsData[activeTab].map((skill, index) => (
//                 <div key={index} className="group">
//                   <div className="flex justify-between mb-2">
//                     <h3 className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</h3>
//                     <span className="text-blue-600 dark:text-blue-400 font-medium">{skill.level}%</span>
//                   </div>
//                   <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse"
//                       style={{ width: `${skill.level}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//       <SkillSlider/>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Skills;

// components/Skills.jsx
import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { Code, PenTool, Server } from "lucide-react";
import { motion } from "framer-motion";
import SkillSlider from "./SkillSlider";

import htmlIcon from "../../public/assets/skill_icon/html.png";
import cssIcon from "../../public/assets/skill_icon/css.png";
import jsIcon from "../../public/assets/skill_icon/js.png";
import reactIcon from "../../public/assets/skill_icon/reactjs.png";
import reduxIcon from "../../public/assets/skill_icon/reactjs.png";
import tailwindIcon from "../../public/assets/skill_icon/tailwind.png"; 
import nodejsIcon from "../../public/assets/skill_icon/nodejs.png"; 
import figmaIcon from "../../public/assets/skill_icon/figma.png"; 
import gitIcon from "../../public/assets/skill_icon/git.png"; 
import visualIcon from "../../public/assets/skill_icon/visual-studio-code.png";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("frontend");

  const skillsData = {
    frontend: [
      { name: "Html", level: 80, icon: htmlIcon },
      { name: "CSS", level: 60, icon: cssIcon },
      { name: "JavaScript", level: 70, icon: jsIcon }, // Use imported jsIcon
      { name: "React", level: 80, icon: reactIcon }, // Use imported reactIcon
      { name: "Redux", level: 20, icon: reduxIcon }, // Use imported reduxIcon
      { name: "Tailwind CSS", level: 90, icon: tailwindIcon }, // Use imported tailwindIcon
    ],
    backend: [
      { name: "Node.js", level: 20, icon: nodejsIcon },
      { name: "Express", level: 40, icon: "🚀" },
      { name: "MongoDB", level: 60, icon: "🍃" },
      { name: "Firebase", level: 60, icon: "🔥" },
      { name: "REST APIs", level: 80, icon: "🔗" },
      { name: "GraphQL", level: 20, icon: "🕸️" },
    ],
    tools: [
      { name: "Git", level: 75, icon: gitIcon },
      { name: "Figma", level: 88, icon: figmaIcon },
      { name: "VS Code", level: 90, icon: visualIcon },
    ],
  };

  const categories = [
    { id: "frontend", label: "Frontend Development", icon: <Code size={20} /> },
    { id: "backend", label: "Backend Development", icon: <Server size={20} /> },
    { id: "tools", label: "Tools & Software", icon: <PenTool size={20} /> },
  ];

  return (
    <>
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-12">
          <SectionTitle title="Skills" subtitle="My technical expertise" />

          <div className="max-w-5xl mx-auto mt-12">
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium
                    ${
                      activeTab === category.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  {category.icon}
                  {category.label}
                </motion.button>
              ))}
            </div>

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8"
            >
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {skillsData[activeTab].map((skill, index) => (
                  <div
                    key={index}
                    className="group p-4 rounded-xl bg-amber-200 transition-color "
                  >
                    <div className="flex flex-col items-center gap-1 mb-1">
                      <span className="text-xl">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-20 h-20 object-contain"
                        />
                      </span>
                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                            {skill.name}
                          </h3>
                        </div>

                        <div className="relative h-3 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mt-2">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-end pr-2"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          >
                            <span className="text-xs text-white font-medium">
                              {skill.level}%
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div> */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8"
            >
              <div className="grid grid-cols-3 md:grid-cols-3 gap-4 perspective-[1000px]">
                {skillsData[activeTab].map((skill, index) => (
                  <motion.div
                    key={index}
                    className="group p-4 rounded-xl bg-gradient-to-br from-amber-200 to-yellow-300 dark:from-gray-700 dark:to-gray-900 transition-transform duration-500 transform-style-3d shadow-xl cursor-pointer"
                    whileHover={{
                      rotateY: 20,
                      rotateX: 30,
                      scale: 1.05,
                      transition: {
                        type: "spring",
                        stiffness: 500,
                        damping: 50,
                      },
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-20 h-20 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                      />
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-center">
                        {skill.name}
                      </h3>

                      <div className="relative h-3 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mt-2 shadow-inner">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-end pr-2"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                          <span className="text-xs text-white font-medium">
                            {skill.level}%
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* SkillSlider with percentage badges */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <SkillSlider />
            </motion.div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;
