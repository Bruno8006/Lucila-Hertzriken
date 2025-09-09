import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import api from '../services/api';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para converter URL de vídeo em embed
  const getEmbedUrl = (url) => {
    if (!url) return '';
    
    // YouTube
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Vimeo
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    // Se já é uma URL de embed, retorna direto
    if (url.includes('embed') || url.includes('player')) {
      return url;
    }
    
    return url;
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const projects = await api.getProjects();
        const foundProject = projects.find(p => 
          p.title.toLowerCase().replace(/\s+/g, '-') === slug
        );
        
        if (foundProject) {
          setProject(foundProject);
        } else {
          setError(t('project.notFound'));
        }
      } catch (err) {
        setError(t('project.error'));
        console.error('Erro ao buscar projeto:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('project.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('project.notFound')}</h1>
          <p className="text-gray-600 mb-6">{t('project.notFound')}</p>
          <button
            onClick={() => navigate('/trabalhos')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('project.backToWork')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{background: 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 50%,rgb(247, 239, 255) 100%)'}}>
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
          <button
            onClick={() => navigate('/trabalhos')}
            className="flex items-center text-gray-300 hover:text-white transition-colors mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
{t('project.backToWork')}
          </button>
          
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{project.title}</h1>
            <p className="text-xl text-gray-300">{project.type}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <img
                src={project.image_url.startsWith('http') ? project.image_url : `https://lucila-hertzriken-production.up.railway.app/images/${project.image_url}`}
                alt={project.title}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{t('project.aboutProject')}</h2>
              <p className="text-gray-700 leading-relaxed">
                {project.description || t('project.noDescription')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{t('project.type')}</h3>
                <p className="text-gray-600">{project.type}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{t('project.year')}</h3>
                <p className="text-gray-600">{project.year || t('project.noYear')}</p>
              </div>
            </div>

            {project.trailer_url && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">{t('project.trailer')}</h3>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={getEmbedUrl(project.trailer_url)}
                      title={`Trailer de ${project.title}`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
