import React from "react";
import { mockProjects } from "../data/mockData";

const WorkGrid = () => {
  return (
    <section className="py-20 px-8 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl font-light tracking-wide text-gray-800">work</h2>
          <button className="px-6 py-2 border border-gray-300 text-sm tracking-wide text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors duration-300 rounded-full">
            MAIS
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProjects.map((project, index) => (
            <div 
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-4 aspect-[4/3]">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
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
    </section>
  );
};

export default WorkGrid;