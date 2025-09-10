import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ArrowUp, ArrowDown, LogOut, Eye, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import ProjectForm from './ProjectForm';

const AdminPanel = ({ onLogout }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Carregando projetos...');
        setLoading(true);
        const data = await apiService.getProjects();
        console.log('Projetos carregados:', data.length);
        setProjects(data);
      } catch (err) {
        console.error('Erro ao carregar projetos:', err);
        setError('Erro ao carregar projetos');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);


  const handleCreateProject = async (projectData, imageFile) => {
    try {
      console.log('Criando projeto:', projectData);
      const result = await apiService.createProject(projectData, imageFile);
      console.log('Projeto criado com sucesso:', result);
      setShowForm(false);
      // Recarregar projetos
      const data = await apiService.getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Erro ao criar projeto:', err);
      setError(`Erro ao criar projeto: ${err.message}`);
    }
  };

  const handleUpdateProject = async (projectData, imageFile) => {
    try {
      await apiService.updateProject(editingProject.id, projectData, imageFile);
      setEditingProject(null);
      // Recarregar projetos
      const data = await apiService.getProjects();
      setProjects(data);
    } catch (err) {
      setError('Erro ao atualizar projeto');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await apiService.deleteProject(projectId);
        // Recarregar projetos
        const data = await apiService.getProjects();
        setProjects(data);
      } catch (err) {
        setError('Erro ao excluir projeto');
      }
    }
  };

  const handleReorder = async (projectId, direction) => {
    const project = projects.find(p => p.id === projectId);
    const currentIndex = projects.findIndex(p => p.id === projectId);
    
    let newOrder;
    if (direction === 'up' && currentIndex > 0) {
      newOrder = projects[currentIndex - 1].order;
    } else if (direction === 'down' && currentIndex < projects.length - 1) {
      newOrder = projects[currentIndex + 1].order;
    } else {
      return;
    }

    try {
      await apiService.reorderProject(projectId, newOrder);
      // Recarregar projetos
      const data = await apiService.getProjects();
      setProjects(data);
    } catch (err) {
      setError('Erro ao reordenar projeto');
    }
  };

  const handleLogout = () => {
    apiService.logout();
    onLogout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="admin-page min-h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-light tracking-wide text-gray-900">
                Painel Administrativo
              </h1>
              <p className="text-sm text-gray-600">Gerenciar projetos do portfólio</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Projeto
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="admin-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Projects List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Projetos ({projects.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {projects.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-500 mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto encontrado</h3>
                <p className="text-gray-500 mb-4">Comece criando seu primeiro projeto.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Projeto
                </button>
              </div>
            ) : (
              projects.map((project, index) => (
                <div key={project.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                                      <div className="flex-shrink-0">
                    <img
                      src={project.image_url.startsWith('http') ? project.image_url : `https://lucila-hertzriken-backend.onrender.com/images/${project.image_url}`}
                      alt={project.title}
                      className="h-16 w-20 object-cover object-center rounded-lg"
                      onError={(e) => {
                        console.error('Erro ao carregar imagem:', project.image_url);
                        e.target.src = 'https://via.placeholder.com/80x64/cccccc/666666?text=No+Image';
                      }}
                    />
                  </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {project.year} • {project.type}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleReorder(project.id, 'up')}
                      disabled={index === 0}
                      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Mover para cima"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleReorder(project.id, 'down')}
                      disabled={index === projects.length - 1}
                      className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Mover para baixo"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setEditingProject(project)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 text-gray-400 hover:text-red-600"
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Forms */}
      {showForm && (
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingProject && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleUpdateProject}
          onCancel={() => setEditingProject(null)}
        />
      )}
    </div>
  );
};

export default AdminPanel;
