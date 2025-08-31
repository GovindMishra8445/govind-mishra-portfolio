// components/HomeProjects.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import ProjectCard from './project/ProjectCard';
import { projectsData } from '../data/projectsData';

const HomeProjects = () => {
  // Get only the first 3 projects for the homepage
  const featuredProjects = projectsData.slice(0, 3);
  
  return (
    <section id="featured-projects" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6 md:px-12">
        <SectionTitle title="Featured Projects" subtitle="Some of my best work" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link 
            to="/projects" 
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeProjects;