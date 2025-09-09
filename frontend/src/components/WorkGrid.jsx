import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import api from "../services/api";

const WorkGrid = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapeamento de tipos em inglês para português
  const typeMapping = {
    "Feature Film": "Longa-metragem",
    "Documentary": "Documentário", 
    "Short Film": "Curta-metragem",
    "Series": "Série"
  };

  // Função para exibir o tipo em português
  const getDisplayType = (projectType) => {
    return typeMapping[projectType] || projectType;
  };

  // Função para gerar slug do projeto
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };

  // Função para navegar para o projeto
  const handleProjectClick = (project) => {
    const slug = generateSlug(project.title);
    navigate(`/projeto/${slug}`);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projects = await api.getProjects();
        setProjects(projects);
      } catch (err) {
        console.error('Erro ao carregar projetos:', err);
        setError('Erro ao carregar projetos');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-8 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-600">Carregando projetos...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-8 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-red-600">{error}</div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-20 px-8 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl font-light tracking-wide text-gray-800">{t('work.title')}</h2>
                           <button className="px-6 py-2 border border-gray-300 text-sm tracking-wide text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors duration-300 rounded-full">
                   Ver Mais
                 </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full text-center text-gray-600 py-16">
              Nenhum projeto encontrado. <a href="/admin" className="text-blue-600 hover:underline">Adicione alguns projetos</a> no painel admin.
            </div>
          ) : (
            projects.map((project, index) => (
            <div 
              key={index}
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300 max-w-xs mx-auto" style={{ aspectRatio: '3/4' }}>
                <img 
                  src={project.image_url.startsWith('http') ? project.image_url : `https://lucila-hertzriken-production.up.railway.app/images/${project.image_url}`} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                  onError={(e) => {
                    console.error('Erro ao carregar imagem:', project.image_url);
                    e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image';
                  }}
                />
                {/* Overlay com nome do projeto no hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                    {project.title}
                  </h3>
                </div>
              </div>
              
            </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;