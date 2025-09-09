import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import api from "../services/api";

const HomeWorkGrid = () => {
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
        const allProjects = await api.getProjects();
        // Pegar os 7 primeiros projetos (1 destaque + 6 menores)
        const recentProjects = allProjects.slice(0, 7);
        setProjects(recentProjects);
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
      <section className="py-20 px-4 bg-white">
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
          <button 
            onClick={() => navigate('/trabalhos')}
            className="px-6 py-2 border border-gray-300 text-sm tracking-wide text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors duration-300 rounded-full"
          >
            🚀 Ver Todos os Projetos
          </button>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center text-gray-600 py-16">
            Nenhum projeto encontrado. <a href="/admin" className="text-blue-600 hover:underline">Adicione alguns projetos</a> no painel admin.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projeto Principal - Destaque */}
            {projects.length > 0 && (
              <div className="lg:col-span-1">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Destaque</h3>
                </div>
                <div 
                  className="group cursor-pointer"
                  onClick={() => handleProjectClick(projects[0])}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300 aspect-[3/5]">
                    <img 
                      src={projects[0].image_url.startsWith('http') ? projects[0].image_url : `https://lucila-hertzriken-backend.onrender.com/images/${projects[0].image_url}`} 
                      alt={projects[0].title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        console.error('Erro ao carregar imagem:', projects[0].image_url);
                        e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image';
                      }}
                    />
                    {/* Overlay com nome do projeto no hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center">
                      <h3 className="text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                        {projects[0].title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid de 6 Projetos Menores (7 total) */}
            {projects.length > 1 && (
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Outros Projetos</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {projects.slice(1, 8).map((project, index) => (
                    <div 
                      key={index}
                      className="group cursor-pointer"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="relative overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300 aspect-[4/5]">
                        <img 
                          src={project.image_url.startsWith('http') ? project.image_url : `https://lucila-hertzriken-backend.onrender.com/images/${project.image_url}`} 
                          alt={project.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            console.error('Erro ao carregar imagem:', project.image_url);
                            e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image';
                          }}
                        />
                        {/* Overlay com nome do projeto no hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300 flex items-center justify-center">
                          <h3 className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeWorkGrid;
