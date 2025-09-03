import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-light tracking-wide text-gray-800 mb-16">about</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616c7e27934?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Camila Groch"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-8">
              <p className="text-lg leading-relaxed text-gray-700">
                Camila Groch is a seasoned executive in the filmmaking industry, renowned for her strategic vision, creative sensibility, and extensive experience in delivering high-impact projects.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700">
                Over the past 25 years, she has built a solid career in the audiovisual sector, working with renowned talents and companies across Brazil, Argentina, the United States, and Europe.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700">
                Her portfolio includes producing films and series of various formats, genres, and scales, always balancing artistic purpose, financial efficiency, and market strategy.
              </p>
              
              <div className="border-l-4 border-gray-300 pl-6 py-4">
                <p className="text-lg leading-relaxed text-gray-700 italic">
                "In 2010, I founded Groch Filmes, a boutique production company focused on co-producing auteur-driven projects and providing services to the international and visual arts markets."
                </p>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-700">
                From 2020 to 2022, she served as a production executive at Netflix, leading scripted originals in Brazil—a role that broadened her corporate experience and expertise in managing complex projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;