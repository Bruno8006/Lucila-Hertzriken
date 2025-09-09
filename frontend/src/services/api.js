const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://lucila-hertzriken-production.up.railway.app/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('admin_token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('admin_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        this.clearToken();
        throw new Error('Unauthorized');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async login(username, password) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    this.setToken(response.access_token);
    return response;
  }

  logout() {
    this.clearToken();
  }

  // Project methods
  async getProjects() {
    return this.request('/projects');
  }

  async createProject(projectData, imageFile) {
    // Upload com arquivo é obrigatório
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('title', projectData.title);
    formData.append('description', projectData.description);
    formData.append('year', projectData.year);
    formData.append('type', projectData.type);
    formData.append('trailer_url', projectData.trailer_url || '');
    formData.append('order', projectData.order);

    return this.request('/projects', {
      method: 'POST',
      headers: {
        // Não definir Content-Type, deixar o browser definir com boundary
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    });
  }

  async updateProject(projectId, projectData, imageFile) {
    const formData = new FormData();
    
    // Só adiciona imagem se foi selecionada uma nova
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    formData.append('title', projectData.title);
    formData.append('description', projectData.description);
    formData.append('year', projectData.year);
    formData.append('type', projectData.type);
    formData.append('trailer_url', projectData.trailer_url || '');
    formData.append('order', projectData.order);

    return this.request(`/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        // Não definir Content-Type, deixar o browser definir com boundary
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    });
  }

  async deleteProject(projectId) {
    return this.request(`/projects/${projectId}`, {
      method: 'DELETE',
    });
  }

  async reorderProject(projectId, newOrder) {
    return this.request(`/projects/${projectId}/reorder`, {
      method: 'POST',
      body: JSON.stringify({ new_order: newOrder }),
    });
  }
}

export default new ApiService();
