import React, { useState } from "react";
import { mockProjects } from "../data/mockData";

const WorkPage = () => {
  const [filter, setFilter] = useState("all");
  
  const filters = ["all", "Feature Film", "Documentary", "Short Film", "Series"];
  
  const filteredProjects = filter === "all" 
    ? mockProjects 
    : mockProjects.filter(project => project.type === filter);

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-8 py-16">
        <h1 className="text-6xl font-light tracking-wide text-gray-800 mb-16">work</h1>
        
        <div className="flex flex-wrap gap-4 mb-12">
          {filters.map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-6 py-2 text-sm tracking-wide transition-colors duration-300 rounded-full ${
                filter === filterType
                  ? 'bg-gray-800 text-white'
                  : 'border border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden mb-4 aspect-[4/3]">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 px-4 py-2 rounded-full">
                    <span className="text-sm text-gray-800 tracking-wide">View Project</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-light tracking-wide text-gray-800 group-hover:text-gray-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {project.description}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {project.year} • {project.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkPage;