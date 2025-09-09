import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ProjectForm = ({ project, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    type: 'Feature Film',
    trailer_url: '',
    order: 0
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        year: project.year || '',
        type: project.type || 'Feature Film',
        trailer_url: project.trailer_url || '',
        order: project.order || 0
      });
      // Se tem imagem, mostrar preview
      if (project.image_url) {
        if (project.image_url.startsWith('http')) {
          setImagePreview(project.image_url);
        } else {
          setImagePreview(`http://localhost:8000/images/${project.image_url}`);
        }
      }
    }
  }, [project]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, imageFile);
  };

  const projectTypes = [
    'Longa-metragem',
    'Documentário',
    'Curta-metragem',
    'Série'
  ];


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-medium text-gray-900">
            {project ? 'Editar Projeto' : 'Novo Projeto'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Ex: Amigos se Divertindo"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              placeholder="Ex: Uma história tocante sobre amizade e conexão"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Ano *
              </label>
              <input
                type="text"
                id="year"
                name="year"
                required
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                placeholder="Ex: 2023"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo *
              </label>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              >
                {projectTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Imagem do Projeto {!project && '*'}
            </label>
            <div className="space-y-4">
              <div>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  required={!project} // Só obrigatório para novos projetos
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {project ? 'Deixe vazio para manter a imagem atual' : 'Formatos aceitos: JPG, PNG, GIF, WebP (máx. 5MB)'}
                </p>
              </div>
              
              {/* Preview da imagem */}
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-32 w-48 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="trailer_url" className="block text-sm font-medium text-gray-700 mb-2">
              Link do Trailer (Opcional)
            </label>
            <input
              type="url"
              id="trailer_url"
              name="trailer_url"
              value={formData.trailer_url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              placeholder="https://youtube.com/watch?v=abc123 ou https://vimeo.com/123456"
            />
            <p className="text-sm text-gray-500 mt-1">
              Suporte a YouTube, Vimeo e outros sites de vídeo
            </p>
          </div>

          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
              Ordem de Exibição
            </label>
            <input
              type="number"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              placeholder="0"
            />
            <p className="text-sm text-gray-500 mt-1">
              Números menores aparecem primeiro
            </p>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
            >
              {project ? 'Atualizar' : 'Criar'} Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
