
// components/ProjectDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching project details
    setTimeout(() => {
      // This would normally come from an API
      const projectData = {
        id: parseInt(id),
        title: 'Project Title',
        description: 'This is a detailed description of the project, explaining the problem it solves, the technologies used, and the approach taken.',
        image: '/api/placeholder/1200/600',
        category: 'web',
        tags: ['React', 'Redux', 'Node.js', 'MongoDB'],
        demoLink: '#',
        codeLink: '#',
        features: [
          'Responsive design for all device sizes',
          'Dark mode support',
          'User authentication and authorization',
          'Real-time data with WebSockets',
          'Offline support with service workers',
          'Comprehensive test coverage'
        ],
        technologies: [
          { name: 'React', description: 'Frontend UI library' },
          { name: 'Redux', description: 'State management' },
          { name: 'Node.js', description: 'Backend runtime' },
          { name: 'Express', description: 'Web framework' },
          { name: 'MongoDB', description: 'Database' },
          { name: 'Tailwind CSS', description: 'Styling' }
        ],
        images: [
          '/api/placeholder/800/450',
          '/api/placeholder/800/450',
          '/api/placeholder/800/450'
        ],
        challenges: 'One of the main challenges was implementing real-time features while maintaining performance. We used WebSockets for live updates and implemented efficient data structures to minimize payload size.',
        outcome: 'The project was completed on time and exceeded client expectations. It resulted in a 25% increase in user engagement and positive feedback from the community.'
      };
      
      setProject(projectData);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Project not found</h2>
          <Link 
            to="/" 
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium mb-8"
        >
          <ArrowLeft size={18} />
          <span>Back to home</span>
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-80 object-cover object-center"
          />
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 md:mb-0">
                {project.title}
              </h1>
              
              <div className="flex space-x-4">
                <a 
                  href={project.demoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink size={18} />
                  <span>Live Demo</span>
                </a>
                <a 
                  href={project.codeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Github size={18} />
                  <span>View Code</span>
                </a>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="prose dark:prose-invert max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Features</h2>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Technologies</h2>
                <div className="grid grid-cols-2 gap-4">
                  {project.technologies.map((tech, index) => (
                    <div 
                      key={index} 
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <h3 className="font-bold text-gray-800 dark:text-white">{tech.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt={`${project.title} screenshot ${index + 1}`} 
                    className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full h-48 object-cover"
                  />
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Challenges</h2>
                <p className="text-gray-700 dark:text-gray-300">{project.challenges}</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Outcome</h2>
                <p className="text-gray-700 dark:text-gray-300">{project.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;