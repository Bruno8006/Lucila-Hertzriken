import os
from dotenv import load_dotenv

load_dotenv()

# Database
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'lucila_portfolio')

# Authentication
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-super-secret-key-here-change-this-in-production')
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'lucila')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')

# CORS
CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:3000').split(',')
