const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Servir arquivos estáticos (imagens)
app.use('/images', express.static(path.join(__dirname, '..', 'frontend', 'public', 'images')));

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'frontend', 'public', 'images');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limite
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas (JPEG, JPG, PNG, GIF, WebP)'));
    }
  }
});

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

// Função para deletar imagem
async function deleteImage(imageUrl) {
  try {
    if (imageUrl && !imageUrl.startsWith('http')) {
      const imagePath = path.join(__dirname, '..', 'frontend', 'public', 'images', imageUrl);
      await fs.unlink(imagePath);
      console.log('Imagem deletada:', imageUrl);
    }
  } catch (error) {
    console.log('Erro ao deletar imagem (pode não existir):', error.message);
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

app.post('/api/projects', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, description, year, type, trailer_url, order } = req.body;
    
    // Upload de imagem é obrigatório
    if (!req.file) {
      return res.status(400).json({ error: 'Imagem é obrigatória' });
    }
    
    const newProject = {
      id: Date.now().toString(),
      title,
      description,
      year,
      type,
      image_url: req.file.filename,
      trailer_url: trailer_url || null,
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
    console.error('Erro ao criar projeto:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

app.put('/api/projects/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, year, type, trailer_url, order } = req.body;
    
    const projects = await loadProjects();
    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    // Se foi enviada uma nova imagem, deletar a antiga
    if (req.file) {
      await deleteImage(projects[projectIndex].image_url);
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      title,
      description,
      year,
      type,
      trailer_url: trailer_url || null,
      order: order || 0,
      // Manter imagem atual se não foi enviada nova
      image_url: req.file ? req.file.filename : projects[projectIndex].image_url,
      updated_at: new Date().toISOString()
    };

    if (await saveProjects(projects)) {
      res.json(projects[projectIndex]);
    } else {
      res.status(500).json({ error: 'Erro ao atualizar projeto' });
    }
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const projects = await loadProjects();
    const projectToDelete = projects.find(p => p.id === id);
    
    if (!projectToDelete) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    // Deletar a imagem do projeto
    await deleteImage(projectToDelete.image_url);

    const filteredProjects = projects.filter(p => p.id !== id);

    if (await saveProjects(filteredProjects)) {
      res.json({ message: 'Projeto excluído com sucesso' });
    } else {
      res.status(500).json({ error: 'Erro ao excluir projeto' });
    }
  } catch (error) {
    console.error('Erro ao excluir projeto:', error);
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

