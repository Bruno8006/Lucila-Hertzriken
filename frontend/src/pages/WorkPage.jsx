import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import api from "../services/api";

const WorkPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [filter, setFilter] = useState("todos");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const filters = [
    { key: "todos", label: t('work.filters.all') },
    { key: "Longa-metragem", label: t('work.filters.featureFilm') },
    { key: "Documentário", label: t('work.filters.documentary') },
    { key: "Curta-metragem", label: t('work.filters.shortFilm') },
    { key: "Série", label: t('work.filters.series') }
  ];
  
  // Mapeamento de tipos em português para inglês (para compatibilidade com o backend)
  const typeMapping = {
    "Longa-metragem": "Feature Film",
    "Documentário": "Documentary", 
    "Curta-metragem": "Short Film",
    "Série": "Series"
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projects = await api.getProjects();
        setProjects(projects);
      } catch (err) {
        console.error('Erro ao carregar projetos:', err);
        setError(t('work.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  
  // Função para exibir o tipo traduzido
  const getDisplayType = (projectType) => {
    // Se já está em português, retorna direto
    if (filters.some(f => f.key === projectType)) {
      return projectType;
    }
    // Se está em inglês, converte para português
    const portugueseType = Object.keys(typeMapping).find(key => typeMapping[key] === projectType);
    return portugueseType || projectType;
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

  const filteredProjects = filter === "todos" 
    ? projects 
    : projects.filter(project => {
        // Se o projeto tem tipo em português, compara diretamente
        if (filters.some(f => f.key === project.type)) {
          return project.type === filter;
        }
        // Se o projeto tem tipo em inglês, usa o mapeamento
        const englishType = typeMapping[filter];
        return project.type === englishType;
      });

  if (loading) {
    return (
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-0 py-16">
          <h1 className="text-6xl font-light tracking-wide text-gray-800 mb-16">{t('work.title')}</h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-600">{t('work.loading')}</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-0 py-16">
          <h1 className="text-6xl font-light tracking-wide text-gray-800 mb-16">{t('work.title')}</h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24" style={{background: 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 50%, rgb(247, 239, 255) 100%)'}}>
      <div className="container mx-auto py-16">
        <div className="px-4">
          <h1 className="text-6xl font-light tracking-wide text-gray-800 mb-16">{t('work.title')}</h1>
          
        <div className="flex flex-wrap gap-4 mb-12">
          {filters.map((filterType) => (
            <button
              key={filterType.key}
              onClick={() => setFilter(filterType.key)}
              className={`px-6 py-2 text-sm tracking-wide transition-colors duration-300 rounded-full ${
                filter === filterType.key
                  ? 'bg-gray-800 text-white'
                  : 'border border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400'
              }`}
            >
              {filterType.label}
            </button>
          ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                           {filteredProjects.length === 0 ? (
                   <div className="col-span-full text-center text-gray-600 py-16">
                     {filter === "todos" 
                       ? t('work.noProjects')
                       : `${t('work.noProjectsFilter')} "${filter}".`
                     }
                   </div>
          ) : (
            filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300" style={{ aspectRatio: '2/3' }}>
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
                  <h3 className="text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-0">
                    {project.title}
                  </h3>
                </div>
              </div>
              
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkPage;