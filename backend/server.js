const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Configuração de segurança
const SECRET_KEY = process.env.SECRET_KEY || 'your-super-secret-key-here';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'lucila';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Arquivo de dados (GRATUITO!)
const PROJECTS_FILE = path.join(__dirname, 'projects.json');

// Funções para gerenciar dados
async function loadProjects() {
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Criando arquivo de projetos...');
    await saveProjects([]);
    return [];
  }
}

async function saveProjects(projects) {
  try {
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
    return true;
  } catch (error) {
    console.error('Erro ao salvar projetos:', error);
    return false;
  }
}

// Middleware de autenticação
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso necessário' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
}

// Rotas
app.get('/', (req, res) => {
  res.json({ 
    message: 'Lucila Portfolio API - NODE.JS VERSION!',
    version: '1.0.0',
    status: 'running',
    storage: 'JSON file (FREE!)'
  });
});

app.get('/api/', (req, res) => {
  res.json({ 
    message: 'API funcionando perfeitamente!',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', async (req, res) => {
  try {
    const projects = await loadProjects();
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      projects_count: projects.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { sub: username },
        SECRET_KEY,
        { expiresIn: '30m' }
      );

      res.json({
        access_token: token,
        token_type: 'bearer'
      });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Projetos
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await loadProjects();
    const sortedProjects = projects.sort((a, b) => a.order - b.order);
    res.json(sortedProjects);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar projetos' });
  }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  try {
    const { title, description, year, type, image_url, order } = req.body;
    
    const newProject = {
      id: Date.now().toString(),
      title,
      description,
      year,
      type,
      image_url,
      order: order || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const projects = await loadProjects();
    projects.push(newProject);
    
    if (await saveProjects(projects)) {
      res.json(newProject);
    } else {
      res.status(500).json({ error: 'Erro ao salvar projeto' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const projects = await loadProjects();
    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...updates,
      updated_at: new Date().toISOString()
    };

    if (await saveProjects(projects)) {
      res.json(projects[projectIndex]);
    } else {
      res.status(500).json({ error: 'Erro ao atualizar projeto' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const projects = await loadProjects();
    const filteredProjects = projects.filter(p => p.id !== id);
    
    if (projects.length === filteredProjects.length) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    if (await saveProjects(filteredProjects)) {
      res.json({ message: 'Projeto excluído com sucesso' });
    } else {
      res.status(500).json({ error: 'Erro ao excluir projeto' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

app.post('/api/projects/:id/reorder', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { new_order } = req.body;
    
    const projects = await loadProjects();
    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    projects[projectIndex].order = new_order;
    projects[projectIndex].updated_at = new Date().toISOString();

    if (await saveProjects(projects)) {
      res.json({ message: 'Ordem do projeto atualizada com sucesso' });
    } else {
      res.status(500).json({ error: 'Erro ao reordenar projeto' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 Servidor Node.js iniciado!');
  console.log(`💰 Zero custos de banco de dados!`);
  console.log(`📁 Dados salvos em: ${PROJECTS_FILE}`);
  console.log(`🔒 Autenticação JWT ativa`);
  console.log(`🌐 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📊 API disponível em: http://localhost:${PORT}/api/`);
});

