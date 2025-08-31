// import React, { useState } from "react";
// import SectionTitle from "./SectionTitle";
// import { Calendar, Briefcase } from "lucide-react";

// const Experience = () => {
//   const [activeTab, setActiveTab] = useState("work");

//   const experiences = {
//     work: [
//       {
//         title: "Frontend Developer",
//         company: "Code Frame Technology Private Limited",
//         period: "2021 - Present",
//         description: [
//           "Led a team of 5 developers in building and maintaining the company's flagship product.",
//           "Implemented modern React architecture with hooks, context, and Suspense.",
//           "Reduced page load time by 40% through code splitting and lazy loading.",
//           "Integrated and optimized GraphQL API endpoints for data fetching.",
//         ],
//       },
//       {
//         title: "Frontend Developer",
//         company: "Digital Solutions Agency",
//         period: "2018 - 2021",
//         description: [
//           "Developed responsive websites and applications for various clients.",
//           "Created reusable component libraries and established coding standards.",
//           "Collaborated with designers to implement pixel-perfect UI.",
//           "Mentored junior developers and conducted code reviews.",
//         ],
//       },
//       {
//         title: "Web Developer Intern",
//         company: "WebCraft Studios",
//         period: "2017 - 2018",
//         description: [
//           "Assisted in building websites using HTML, CSS, and JavaScript.",
//           "Learned modern frontend development practices and tools.",
//           "Contributed to open-source projects and internal tools.",
//           "Participated in design and development meetings.",
//         ],
//       },
//     ],
//     education: [
//       {
//         title: "Master of Computer Applications (MCA)",
//         company: "Maya Devi University, Dehradun",
//         period: "2024 - Present",
//         description: [
//           "Currently pursuing MCA (Master of Computer Applications).",
//           "Completed the 1st semester successfully with 78%.",
//           "Specializing in Full Stack Development.",
//           "Actively learning and building skills in frontend and backend technologies.",
//         ],
//       },
//       {
//         title: "Bachelor of Computer Applications (BCA)",
//         company:
//           "Tulas Institute, Dehradun — affiliated with Sri Dev Suman University (SDSU), Tehri Garhwal, Uttarakhand.",
//         period: "2019 - 2022",
//         description: [
//           "Graduated with 76%, focusing on core programming and application development.",
//           "Developed a final-year project titled 'Mad Doctor' using Unity Engine and C#.",
//           "Authored a research paper: 'The Unity Game Engine with PDSim: Planning Domain Simulation'.",
//           "Completed internships at two technology companies to gain real-world experience.",
//         ],
//       },
//       {
//         title: "Intermediate (12th Grade)",
//         company:
//           "Jawahar Lal Nehru (J.L.N) College, Chandinawan, Nawada (BSEB)",
//         period: "2018 - 2019",
//         description: [
//           "Completed 12th-grade in the Science stream (PCM) with 65.5%.",
//           "College established in 1980, managed by the Department of Education.",
//           "Located in the rural area of Kashichak block, Nawada district, Bihar.",
//         ],
//       },
//       {
//         title: "Matriculation (10th Grade)",
//         company: "Adarsh Gyanodaya Vidyalaya, Barh, Patna (CBSE)",
//         period: "2014 - 2016",
//         description: [
//           "Completed 10th-grade with 7.6 CGPA, focused on Science and Mathematics.",
//           "School affiliated with CBSE (Affiliation No. 330219).",
//           "Located on NH 30 A, Brahmani Nagar, Nadawan, Barh, Patna.",
//         ],
//       },
//     ],
//   };

//   const tabs = [
//     { id: "education", label: "Education", icon: <Calendar size={20} /> },
//     { id: "work", label: "Work Experience", icon: <Briefcase size={20} /> },
//   ];

//   return (
//     <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto px-6 md:px-12">
//         <SectionTitle title="Experience" subtitle="My journey" />

//         <div className="max-w-4xl mx-auto mt-12">
//           <div className="flex flex-wrap gap-4 mb-8 justify-center">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium flex items-center space-x-2 ${
//                   activeTab === tab.id
//                     ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
//                     : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg"
//                 }`}
//               >
//                 {tab.icon}
//                 <span>{tab.label}</span>
//               </button>
//             ))}
//           </div>

//           <div className="space-y-8">
//             {experiences[activeTab].map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-800 dark:text-white">
//                       {item.title}
//                     </h3>
//                     <p className="text-blue-600 dark:text-blue-400">
//                       {item.company}
//                     </p>
//                   </div>
//                   <div className="mt-2 md:mt-0 px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
//                     {item.period}
//                   </div>
//                 </div>

//                 <ul className="space-y-2">
//                   {item.description.map((desc, i) => (
//                     <li key={i} className="flex items-start">
//                       <span className="text-blue-500 mr-2">•</span>
//                       <span className="text-gray-600 dark:text-gray-300">
//                         {desc}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Experience;







import React, { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import { Calendar, Briefcase, Award, ChevronRight, Star } from "lucide-react";

const Experience = () => {
  const [activeTab, setActiveTab] = useState("work");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-switch tabs every 30 seconds for better engagement
  // useEffect(() => {
  //   const tabInterval = setInterval(() => {
  //     setActiveTab(prev => prev === "work" ? "education" : "work");
  //   }, 30000);
    
  //   return () => clearInterval(tabInterval);
  // }, []);

  // Reset selected item when changing tabs
  useEffect(() => {
    setSelectedItem(null);
  }, [activeTab]);

  const experiences = {
    work: [
      {
        title: "AI Chat Application",
        company: '🔗 Live Demo | GitHub Repo',
        period: "Feb 2025-Present",
        icon: "💼",
        skills: ["React", "Tailwind", "Gemini API", "JavaScript", "Clerk", "CSS"],
        // achievements: "Led development of 3 major product launches",
        description: [
          "Built a modern AI-powered chat interface using Gemini API with real-time message handling.",
          "Implemented Clerk for authentication and protected routing.",
          "Learned regular expressions for cleaning AI responses and managing user input.",
          "Focused on responsive UI design and clean component architecture.",
          "Explored Gemini Docs for API integration and solved edge cases independently.",
        ],
      },
      {
        title: "Packpin Dashboard",
        company: "🔗 Live Demo | GitHub Repo",
        period: "Jan 2025-Feb 2025",
        icon: "💻",
        skills: ["React", "JavaScript", "Tailwind CSS", "Responsive Design", "Fake REST API"],
        // achievements: "Created component library used across 12+ client projects",
        description: [
          "Developed an interactive admin dashboard to manage and display data using fake API.",
          "Implemented login authentication flow and role-based authorization.",
          "Understood how dashboards are structured to handle complex datasets.",
          "Learned layout systems and UI optimization for responsive performance.",
          "Studied documentation and YouTube tutorials to structure the project flow.",
        ],
      },
      {
        title: "Country Data Explorer",
        company: "🔗 Live Demo | GitHub Repo",
        period: "Dec 2024-Jan 2025",
        icon: "💼",
        skills: ["React", "CSS", "JavaScript", " REST Country API"],
        // achievements: "Contributed to 5 open-source projects",
        description: [
          "Fetched and displayed country data dynamically using REST API integration.",
          "Designed card-based layout to show country flags, population, and region info.",
          "Implemented search and filter functionality by country name and border countries.",
          "Gained hands-on experience with dynamic routing and conditional rendering.",
          "Used documentation and online videos to enhance learning and development.",
        ],
      },
    ],
    education: [
      {
        title: "Master of Computer Applications (MCA)",
        company: "Maya Devi University, Dehradun",
        period: "2024 - Present",
        icon: "🎓",
        skills: ["Full Stack Development", "Cloud Computing", "AI/ML Basics"],
        achievements: "Received merit scholarship for academic excellence",
        description: [
          "Currently pursuing MCA (Master of Computer Applications).",
          "Completed the 1st semester successfully with 78%.",
          "Specializing in Full Stack Development.",
          "Actively learning and building skills in frontend and backend technologies.",
          "Working on research project exploring AI in frontend development.",
        ],
      },
      {
        title: "Bachelor of Computer Applications (BCA)",
        company: "Tulas Institute, Dehradun — affiliated with Sri Dev Suman University (SDSU)",
        period: "2019 - 2022",
        icon: "🖥️",
        skills: ["Programming", "Game Development", "Research Methodology"],
        achievements: "Published research paper on Unity Game Engine",
        description: [
          "Graduated with 76%, focusing on core programming and application development.",
          "Developed a final-year project titled 'Mad Doctor' using Unity Engine and C#.",
          "Authored a research paper: 'The Unity Game Engine with PDSim: Planning Domain Simulation'.",
          "Completed internships at two technology companies to gain real-world experience.",
          "Participated in multiple hackathons and coding competitions.",
        ],
      },
      {
        title: "Intermediate (12th Grade)",
        company: "Jawahar Lal Nehru (J.L.N) College, Chandinawan, Nawada (BSEB)",
        period: "2018 - 2019",
        icon: "🧪",
        skills: ["Physics", "Chemistry", "Mathematics"],
        achievements: "Science exhibition winner",
        description: [
          "Completed 12th-grade in the Science stream (PCM) with 65.5%.",
          "College established in 1980, managed by the Department of Education.",
          "Located in the rural area of Kashichak block, Nawada district, Bihar.",
          "Participated in district-level science competitions.",
          "Served as Science Club volunteer coordinator.",
        ],
      },
      {
        title: "Matriculation (10th Grade)",
        company: "Adarsh Gyanodaya Vidyalaya, Barh, Patna (CBSE)",
        period: "2014 - 2016",
        icon: "📚",
        skills: ["Science", "Mathematics", "English"],
        achievements: "School topper in Mathematics",
        description: [
          "Completed 10th-grade with 7.6 CGPA, focused on Science and Mathematics.",
          "School affiliated with CBSE (Affiliation No. 330219).",
          "Located on NH 30 A, Brahmani Nagar, Nadawan, Barh, Patna.",
          "Active participant in school's mathematics club.",
          "Represented school in regional academic competitions.",
        ],
      },
    ],
    certifications: [
      {
        title: "Frontend Mastery with React & Tailwind",
        company: "Self-Learning (YouTube, Docs)",
        period: "2024-2025",
        icon: "⚛️",
        skills: ["React", "JavaScript", "React Router-DOM", "Responsive Design", "Tailwind CSS"],
        achievements: "Built real-world UIs with reusable components and responsive layouts.",
        description: [
          "Learned layout design using Tailwind CSS utilities",
          "Built responsive and mobile-friendly UIs",
          "Created reusable components and custom UI blocks",
          "Applied real project structure and dark mode theming",
        ],
      },
      {
        title: "Gemini API Integration & AI Chat App",
        company: "Google Gemini Docs + YouTube",
        period: "2025",
        icon: "🔧",
        skills: ["React","JavaScript", " Gemini API", "Tailwind CSS", "Clerk Authentication", "Regular Expressions"],
        achievements: "Developed AI-powered chat interface with secure login and prompt handling",
        description: [
          "Integrated Gemini API for AI-based chat responses",
          "Used regex to clean and format response data",
          "Implemented Clerk for user authentication",
          "Enhanced real-time UI updates and dark mode support",
          "Deployed applications to cloud platforms like Vercel and Netlify.",
        ],
      },
    ],
  };

  const tabs = [
    { id: "education", label: "Education", icon: <Calendar size={20} /> },
    { id: "work", label: "Work Experience", icon: <Briefcase size={20} /> },
    { id: "certifications", label: "Certifications", icon: <Award size={20} /> },
  ];

  const handleItemClick = (index) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedItem(selectedItem === index ? null : index);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 md:px-12">
        <SectionTitle title="Experience" subtitle="My Professional Journey" />

        <div className="max-w-5xl mx-auto mt-12">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg hover:scale-102"
                }`}
                aria-label={`Switch to ${tab.label}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Timeline View */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:translate-x-0 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {experiences[activeTab]?.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row transition-all duration-500 ${
                    isAnimating ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 shadow-md items-center justify-center">
                    <span className="text-lg">{item.icon}</span>
                  </div>

                  {/* Content card - alternate sides on larger screens */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"
                    }`}
                  >
                    <div
                      onClick={() => handleItemClick(index)}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-102"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <span className="text-2xl mr-4 md:hidden">{item.icon}</span>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                              {item.title}
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400">
                              {item.company}
                            </p>
                          </div>
                        </div>
                        <div className="px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                          {item.period}
                        </div>
                      </div>

                      {/* Skills tags */}
                      <div className="flex flex-wrap gap-2 mt-3 mb-4">
                        {item.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Achievement highlight */}
                      <div className="flex items-center mb-4 text-green-600 dark:text-green-400">
                        <Star size={16} className="mr-2" />
                        <span className="text-sm font-medium">{item.achievements}</span>
                      </div>

                      {/* Description - toggle visibility */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {selectedItem === index ? "Hide details" : "Show details"}
                        </span>
                        <ChevronRight
                          size={20}
                          className={`text-blue-500 transition-transform duration-300 ${
                            selectedItem === index ? "rotate-90" : ""
                          }`}
                        />
                      </div>

                      {/* Expandable description */}
                      <div
                        className={`mt-4 overflow-hidden transition-all duration-500 ${
                          selectedItem === index
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="space-y-3">
                          {item.description.map((desc, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-blue-500 mr-2 mt-1">•</span>
                              <span className="text-gray-600 dark:text-gray-300">
                                {desc}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;