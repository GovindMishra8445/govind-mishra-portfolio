// src/components/Projects.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye, Search, X, Filter, LayoutDashboard, Menu } from "lucide-react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import SectionTitle from "../components/SectionTitle";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "projects"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(data);

      const tagsSet = new Set();
      data.forEach((p) => Array.isArray(p.tags) && p.tags.forEach((t) => tagsSet.add(t)));
      setAllTags([...tagsSet]);
    });
    return () => unsub();
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) =>
        filter === "all"
          ? true
          : filter === "featured"
          ? p.featured
          : p.category === filter
      )
      .filter(
        (p) =>
          p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (p) =>
          selectedTags.length === 0 ||
          (Array.isArray(p.tags) && selectedTags.every((t) => p.tags.includes(t)))
      );
  }, [projects, filter, searchTerm, selectedTags]);

  const ProjectCard = ({ project }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform"
        />
        {project.featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 cursor-pointer"
          >
            <ExternalLink size={18} />
          </a>
          <a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-900 cursor-pointer"
          >
            <Github size={18} />
          </a>
          <Link
            to={`/project/${project.id}`}
            className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white hover:bg-purple-600 cursor-pointer"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {project.title}
          </h3>
          <span className="text-xs text-gray-500">
            {project.createdAt?.seconds
              ? new Date(project.createdAt.seconds * 1000).toLocaleDateString()
              : ""}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-10 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <SectionTitle title="Projects" subtitle="My recent work" />

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {["all", "web", "app", "featured"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm cursor-pointer ${
                  filter === cat
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 rounded-l-lg cursor-pointer ${
                  viewMode === "grid" ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
              >
                <LayoutDashboard size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 rounded-r-lg cursor-pointer ${
                  viewMode === "list" ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
              >
                <Menu size={20} />
              </button>
            </div>

            {/* Search */}
            {isSearchOpen ? (
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Project Search..."
                  className="px-3 py-2 bg-transparent focus:outline-none w-40 sm:w-64 text-white"
                />
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setIsSearchOpen(false);
                  }}
                  className="px-2 cursor-pointer"
                >
                  <X size={18} className="text-white border-l" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer"
              >
                <Search size={20} className="text-white" />
              </button>
            )}

            {/* Filter Modal Button */}
            <button
              onClick={() => document.getElementById("tagsModal").showModal()}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg relative cursor-pointer text-white"
            >
              <Filter size={20} />
              {selectedTags.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {selectedTags.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Project List */}
        {filteredProjects.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-6"
            }
          >
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No projects found.</p>
        )}
      </div>

      {/* Tags Modal */}
      <dialog
        id="tagsModal"
        className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Filter by Tags</h3>
          <button
            onClick={() => document.getElementById("tagsModal").close()}
            className="cursor-pointer"
          >
            <X size={20} className="text-white" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                selectedTags.includes(tag)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setSelectedTags([])}
            className="text-zinc-950 bg-gray-200 dark:bg-gray-600 px-4 py-1 rounded-lg cursor-pointer"
          >
            Clear
          </button>
          <button
            onClick={() => document.getElementById("tagsModal").close()}
            className="text-zinc-950 bg-gray-200 dark:bg-gray-600 px-4 py-1 rounded-lg cursor-pointer"
          >
            Apply
          </button>
        </div>
      </dialog>
    </section>
  );
};

export default Projects;


// // components/Projects.jsx
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ExternalLink, Github, Eye, Search, X, Filter } from "lucide-react";
// import E_commerceWebsite from "../assets/images/Project-Image/web-development-image-project.jpg";
// import SectionTitle from "../components/SectionTitle";

// const Projects = () => {
//   const [filter, setFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

//   // Mock projects data - in a real app this might come from an API
//   // const projects = [
//   //   {
//   //     id: 1,
//   //     title: "E-commerce Website",
//   //     description:
//   //       "A full-featured online store with cart functionality and payment processing.",
//   //     image: E_commerceWebsite,
//   //     category: "web",
//   //     tags: ["React", "Redux", "Node.js", "MongoDB"],
//   //     demoLink: "https://tailwindcss.com/docs/installation/using-vite",
//   //     codeLink: "#",
//   //     featured: true,
//   //     date: "2024-03-15",
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "Task Management App",
//   //     description:
//   //       "A productivity app to manage tasks with drag-and-drop functionality.",
//   //     image: "/src/assets/avatar-4.png",
//   //     category: "app",
//   //     tags: ["React", "Firebase", "Tailwind CSS"],
//   //     demoLink: "#",
//   //     codeLink: "#",
//   //     featured: false,
//   //     date: "2024-02-20",
//   //   },
//   //   {
//   //     id: 3,
//   //     title: "Portfolio Website",
//   //     description:
//   //       "A responsive portfolio website with dark mode and animations.",
//   //     image: "/api/placeholder/600/400",
//   //     category: "web",
//   //     tags: ["React", "Tailwind CSS", "Framer Motion"],
//   //     demoLink: "#",
//   //     codeLink: "#",
//   //     featured: true,
//   //     date: "2024-01-10",
//   //   },
//   //   {
//   //     id: 4,
//   //     title: "Weather Dashboard",
//   //     description:
//   //       "Real-time weather information with detailed forecasts and visualizations.",
//   //     image: "/api/placeholder/600/400",
//   //     category: "app",
//   //     tags: ["React", "Charts.js", "Weather API"],
//   //     demoLink: "#",
//   //     codeLink: "#",
//   //     featured: false,
//   //     date: "2023-12-05",
//   //   },
//   //   {
//   //     id: 5,
//   //     title: "Fitness Tracker",
//   //     description:
//   //       "Track and visualize workout progress with personalized recommendations.",
//   //     image: "/api/placeholder/600/400",
//   //     category: "app",
//   //     tags: ["React Native", "Redux", "Firebase"],
//   //     demoLink: "#",
//   //     codeLink: "#",
//   //     featured: false,
//   //     date: "2023-11-20",
//   //   },
//   //   {
//   //     id: 6,
//   //     title: "Blog Platform",
//   //     description:
//   //       "Content management system with markdown editor and user authentication.",
//   //     image: "/api/placeholder/600/400",
//   //     category: "web",
//   //     tags: ["React", "Node.js", "Express", "MongoDB"],
//   //     demoLink: "#",
//   //     codeLink: "#",
//   //     featured: false,
//   //     date: "2023-10-15",
//   //   },
//   //   {
//   //     id: 7,
//   //     title: "Mobile Chat Application",
//   //     description:
//   //       "Real-time messaging app with end-to-end encryption and media sharing.",
//   //     image: "/api/placeholder/600/400",
//   //     category: "app",
//   //     tags: ["React Native", "Firebase", "Socket.io"],
//   //     demoLink: "#",
//   //     codeLink: "#",
//   //     featured: false,
//   //     date: "2023-09-10",
//   //   },
//   //   {
//   //     id: 8,
//   //     title: "Data Visualization Dashboard",
//   //     description:
//   //       "Interactive charts and graphs for analyzing complex datasets.",
//   //     image: "/api/placeholder/600/400",
//   //     category: "web",
//   //     tags: ["React", "D3.js", "Material UI"],
//   //     demoLink: "#",
//   //     codeLink: "#",
//   //     featured: false,
//   //     date: "2023-08-20",
//   //   },
//   //   {
//   //     id: 9,
//   //     title: "Recipe Finder App",
//   //     description:
//   //       "Search and discover recipes based on available ingredients.",
//   //     image: "/api/placeholder/600/400",
//   //     category: "app",
//   //     tags: ["React", "Redux Toolkit", "API Integration"],
//   //     demoLink: "#",
//   //     codeLink: "#",
//   //     featured: false,
//   //     date: "2023-07-05",
//   //   },
//   //   {
//   //     id: 10,
//   //     title: "Crypto Tracker",
//   //     description:
//   //       "Real-time cryptocurrency price tracking with portfolio management.",
//   //     image: "/api/placeholder/600/400",
//   //     category: "web",
//   //     tags: ["React", "WebSockets", "Charts.js"],
//   //     demoLink: "#",
//   //     codeLink: "#",
//   //     featured: false,
//   //     date: "2023-06-15",
//   //   },
//   //   {
//   //     id: 11,
//   //     title: "Social Media Dashboard",
//   //     description:
//   //       "Analytics and management tools for multiple social media accounts.",
//   //     image: "/api/placeholder/600/400",
//   //     category: "web",
//   //     tags: ["React", "Node.js", "OAuth", "Redux"],
//   //     demoLink: "#",
//   //     codeLink: "#",
//   //     featured: false,
//   //     date: "2023-05-10",
//   //   },
//   //   {
//   //     id: 12,
//   //     title: "Virtual Reality Game",
//   //     description: "Immersive VR experience with physics-based gameplay.",
//   //     image: "/api/placeholder/600/400",
//   //     category: "app",
//   //     tags: ["Three.js", "WebXR", "JavaScript"],
//   //     demoLink: "#",
//   //     codeLink: "#",
//   //     featured: false,
//   //     date: "2023-04-20",
//   //   },
//   // ];
//     // Fetch projects from Firebase
//   useEffect(() => {

//   }, [input])(() => {
//     const unsub = onSnapshot(collection(db, "projects"), (snap) => {
//       const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setProjects(data);

//       // Unique tags list
//       const tags = new Set();
//       data.forEach((p) => {
//         if (p.tags && Array.isArray(p.tags)) {
//           p.tags.forEach((tag) => tags.add(tag));
//         }
//       });
//       setAllTags(Array.from(tags));
//     });
//     return () => unsub();
//   }, []);

// Toggle tag filter
//   const toggleTag = (tag) => {
//     setSelectedTags((prev) =>
//       prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
//     );
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setSearchTerm("");
//     setSelectedTags([]);
//   };

//   // Filtered projects
//   const filteredProjects = useMemo(() => {
//     return projects.filter((project) => {
//       const matchesSearch =
//         project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesTags =
//         selectedTags.length === 0 ||
//         (project.tags && selectedTags.every((t) => project.tags.includes(t)));

//       return matchesSearch && matchesTags;
//     });
//   }, [projects, searchTerm, selectedTags]);

//   // Simulate loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   // Get all unique tags
//   const allTags = [...new Set(projects.flatMap((project) => project.tags))];

//   // Filter projects based on category, search term, and selected tags
//   const filteredProjects = projects
//     .filter((project) => filter === "all" || project.category === filter)
//     .filter(
//       (project) =>
//         project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         project.description.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter(
//       (project) =>
//         selectedTags.length === 0 ||
//         selectedTags.every((tag) => project.tags.includes(tag))
//     );

//   // Toggle tag selection
//   const toggleTag = (tag) => {
//     setSelectedTags((prev) =>
//       prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
//     );
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setFilter("all");
//     setSearchTerm("");
//     setSelectedTags([]);
//   };

//   const categories = [
//     { id: "all", label: "All Projects" },
//     { id: "web", label: "Web" },
//     { id: "app", label: "App" },
//     { id: "featured", label: "Featured" },
//   ];

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 5,
//       transition: { duration: 0.5 },
//     },
//   };

//   // Project Card Component
//   const ProjectCard = ({ project }) => (
//     <motion.div
//       variants={itemVariants}
//       className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
//     >
//       <div className="relative overflow-hidden">
//         <img
//           src={project.image}
//           alt={project.title}
//           className="w-full h-50 object-cover transform group-hover:scale-110 transition-transform duration-500"
//         />
//         {project.featured && (
//           <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
//             Featured
//           </div>
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
//           <div className="flex space-x-4">
//             <a
//               href={project.demoLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="View live demo"
//               className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
//             >
//               <ExternalLink size={18} />
//             </a>
//             <a
//               href={project.codeLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="View source code"
//               className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-900 transition-colors"
//             >
//               <Github size={18} />
//             </a>
//             <Link
//               to={`/project/${project.id}`}
//               aria-label="View project details"
//               className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
//             >
//               <Eye size={18} />
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-xl font-bold text-gray-800 dark:text-white">
//             {project.title}
//           </h3>
//           <span className="text-xs text-gray-500 dark:text-gray-400">
//             {new Date(project.date).toLocaleDateString()}
//           </span>
//         </div>
//         <p className="text-gray-600 dark:text-gray-300 mb-4">
//           {project.description}
//         </p>
//         <div className="flex flex-wrap gap-2">
//           {project.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );

//   // Project List Item Component (for list view)
//   const ProjectListItem = ({ project }) => (
//     <motion.div
//       variants={itemVariants}
//       className="flex flex-col md:flex-row bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300"
//     >
//       <div className="relative md:w-1/3 overflow-hidden">
//         <img
//           src={project.image}
//           alt={project.title}
//           className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
//         />
//         {project.featured && (
//           <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
//             Featured
//           </div>
//         )}
//       </div>

//       <div className="p-6 md:w-2/3 flex flex-col justify-between">
//         <div>
//           <div className="flex justify-between items-start mb-2">
//             <h3 className="text-xl font-bold text-gray-800 dark:text-white">
//               {project.title}
//             </h3>
//             <span className="text-xs text-gray-500 dark:text-gray-400">
//               {new Date(project.date).toLocaleDateString()}
//             </span>
//           </div>
//           <p className="text-gray-600 dark:text-gray-300 mb-4">
//             {project.description}
//           </p>
//           <div className="flex flex-wrap gap-2 mb-4">
//             {project.tags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="flex space-x-4">
//           <a
//             href={project.demoLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
//           >
//             <ExternalLink size={16} /> Demo
//           </a>
//           <a
//             href={project.codeLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
//           >
//             <Github size={16} /> Code
//           </a>
//           <Link
//             to={`/project/${project.id}`}
//             className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
//           >
//             <Eye size={16} /> Details
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );

//   // Render loading skeleton while data is loading
//   if (isLoading) {
//     return (
//       <section id="projects" className="py-20 bg-white dark:bg-gray-800">
//         <div className="container mx-auto px-6 md:px-12">
//           <SectionTitle title="Projects" subtitle="My recent work" />
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg animate-pulse"
//               >
//                 <div className="h-64 bg-gray-200 dark:bg-gray-600"></div>
//                 <div className="p-6">
//                   <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
//                   <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full mb-2"></div>
//                   <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6 mb-4"></div>
//                   <div className="flex flex-wrap gap-2">
//                     <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-16"></div>
//                     <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-20"></div>
//                     <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full w-12"></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="projects" className="py-5 bg-white dark:bg-gray-800">
//       <div className="container mx-auto px-6 md:px-12">
//         <SectionTitle title="Projects" subtitle="My recent work" />

//         {/* Filters and Search */}
//         <div className="mt-5 mb-10">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-8">
//             {/* Category Filters */}
//             <div className="flex flex-wrap gap-3">
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   onClick={() =>
//                     setFilter(
//                       category.id === "featured"
//                         ? (prev) => (prev === "featured" ? "all" : "featured")
//                         : category.id
//                     )
//                   }
//                   className={`
//                     px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm
//                     ${
//                       filter === category.id ||
//                       (category.id === "featured" &&
//                         filteredProjects.some((p) => p.featured))
//                         ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
//                         : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-md"
//                     }
//                   `}
//                 >
//                   {category.label}
//                 </button>
//               ))}
//             </div>

// {/* View toggle and search */}
// <div className="flex items-center gap-4">
//   {/* View toggle */}
//   <div className="bg-gray-100 dark:bg-gray-700 rounded-lg flex">
//     <button
//       onClick={() => setViewMode("grid")}
//       className={`px-3 py-2 rounded-l-lg ${
//         viewMode === "grid"
//           ? "bg-blue-500 text-white"
//           : "text-gray-700 dark:text-gray-300"
//       }`}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
//         />
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"
//         />
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z"
//         />
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
//         />
//       </svg>
//     </button>
//     <button
//       onClick={() => setViewMode("list")}
//       className={`px-3 py-2 rounded-r-lg ${
//         viewMode === "list"
//           ? "bg-blue-500 text-white"
//           : "text-gray-700 dark:text-gray-300"
//       }`}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M4 6h16M4 12h16M4 18h16"
//         />
//       </svg>
//     </button>
//   </div>

//   {/* Search button and form */}
//   <div className="relative">
//     {isSearchOpen ? (
//       <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden pr-2">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search projects..."
//           className="px-4 py-2 bg-transparent focus:outline-none w-64 text-gray-800 dark:text-white"
//         />
//         <button
//           onClick={() => {
//             setSearchTerm("");
//             setIsSearchOpen(false);
//           }}
//           className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//         >
//           <X size={18} />
//         </button>
//       </div>
//     ) : (
//       <button
//         onClick={() => setIsSearchOpen(true)}
//         className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
//       >
//         <Search size={20} />
//       </button>
//     )}
//   </div>

//               {/* Filter button */}
//               <button
//                 onClick={() => document.getElementById("tagsModal").showModal()}
//                 className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 relative"
//               >
//                 <Filter size={20} />
//                 {selectedTags.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                     {selectedTags.length}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Applied Filters */}
//           {(searchTerm || selectedTags.length > 0) && (
//             <div className="flex flex-wrap items-center gap-3 mb-6">
//               <span className="text-sm text-gray-500 dark:text-gray-400">
//                 Applied filters:
//               </span>

//               {searchTerm && (
//                 <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
//                   <span>"{searchTerm}"</span>
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="hover:text-blue-800"
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//               )}

//               {selectedTags.map((tag) => (
//                 <div
//                   key={tag}
//                   className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm"
//                 >
//                   <span>{tag}</span>
//                   <button
//                     onClick={() => toggleTag(tag)}
//                     className="hover:text-purple-800"
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>
//               ))}

//               <button
//                 onClick={clearFilters}
//                 className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm underline"
//               >
//                 Clear all
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Projects Grid/List */}
//         {filteredProjects.length > 0 ? (
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className={
//               viewMode === "grid"
//                 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
//                 : "flex flex-col gap-5"
//             }
//           >
//             {filteredProjects.map((project) =>
//               viewMode === "grid" ? (
//                 <ProjectCard key={project.id} project={project} />
//               ) : (
//                 <ProjectListItem key={project.id} project={project} />
//               )
//             )}
//           </motion.div>
//         ) : (
//           <div className="text-center py-12">
//             <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
//               🔍
//             </div>
//             <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
//               No projects found
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400">
//               Try changing your search criteria or filters
//             </p>
//             <button
//               onClick={clearFilters}
//               className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Clear all filters
//             </button>
//           </div>
//         )}
//       </div>

// {/* Tags Filter Modal */}
// <dialog
//   id="tagsModal"
//   className="modal p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl"
// >
//   <div className="flex justify-between items-center mb-6">
//     <h3 className="text-xl font-bold text-gray-800 dark:text-white">
//       Filter by Tags
//     </h3>
//     <button
//       onClick={() => document.getElementById("tagsModal").close()}
//       className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
//     >
//       <X size={24} />
//     </button>
//   </div>

//   <div className="flex flex-wrap gap-3 mb-6">
//     {allTags.map((tag) => (
//       <button
//         key={tag}
//         onClick={() => toggleTag(tag)}
//         className={`
//           px-3 py-1 rounded-full text-sm transition-all cursor-pointer
//           ${
//             selectedTags.includes(tag)
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
//           }
//         `}
//       >
//         {tag}
//       </button>
//     ))}
//   </div>

//   <div className="flex justify-end gap-4">
//     <button
//       onClick={() => setSelectedTags([])}
//       className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
//     >
//       Clear
//     </button>
//     <button
//       onClick={() => document.getElementById("tagsModal").close()}
//       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
//     >
//       Apply
//     </button>
//   </div>
// </dialog>
//     </section>
//   );
// };

// export default Projects;
