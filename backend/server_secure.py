from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
import json
import os
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Auth configuration with environment variables
SECRET_KEY = os.getenv("SECRET_KEY", "your-super-secret-key-here-change-this-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Admin credentials from environment (SECURE!)
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "lucila")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH", pwd_context.hash("admin123"))

# Create the main app
app = FastAPI(title="Lucila Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# File-based storage (FREE and SECURE!)
PROJECTS_FILE = "projects.json"

# Define Models
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    year: str
    type: str
    image_url: str
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    year: str
    type: str
    image_url: str
    order: int = 0

class ProjectUpdate(BaseModel):
    title: str = None
    description: str = None
    year: str = None
    type: str = None
    image_url: str = None
    order: int = None

class LoginRequest(BaseModel):
    username: str
    password: str

class AuthResponse(BaseModel):
    access_token: str
    token_type: str

# File operations (FREE storage!)
def load_projects():
    """Load projects from JSON file"""
    if os.path.exists(PROJECTS_FILE):
        try:
            with open(PROJECTS_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return [Project(**project) for project in data]
        except Exception as e:
            print(f"Error loading projects: {e}")
            return []
    return []

def save_projects(projects):
    """Save projects to JSON file"""
    try:
        with open(PROJECTS_FILE, 'w', encoding='utf-8') as f:
            # Convert to dict and handle datetime serialization
            data = []
            for project in projects:
                project_dict = project.dict()
                project_dict['created_at'] = project.created_at.isoformat()
                project_dict['updated_at'] = project.updated_at.isoformat()
                data.append(project_dict)
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"Error saving projects: {e}")
        return False

def verify_password(plain_password, hashed_password):
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

# Auth functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return username
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Routes
@api_router.get("/")
async def root():
    return {
        "message": "Lucila Portfolio API - SECURE VERSION!",
        "version": "1.0.0",
        "status": "running",
        "storage": "JSON file (FREE!)"
    }

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "projects_count": len(load_projects())
    }

# Auth endpoints
@api_router.post("/login", response_model=AuthResponse)
async def login(login_data: LoginRequest):
    # Verify username and password
    if (login_data.username == ADMIN_USERNAME and 
        verify_password(login_data.password, ADMIN_PASSWORD_HASH)):
        
        access_token = create_access_token(data={"sub": login_data.username})
        return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Project endpoints
@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    projects = load_projects()
    return sorted(projects, key=lambda x: x.order)

@api_router.post("/projects", response_model=Project)
async def create_project(project_data: ProjectCreate, current_user: str = Depends(verify_token)):
    projects = load_projects()
    
    project_dict = project_data.dict()
    project_dict["created_at"] = datetime.utcnow()
    project_dict["updated_at"] = datetime.utcnow()
    
    project = Project(**project_dict)
    projects.append(project)
    
    if save_projects(projects):
        return project
    else:
        raise HTTPException(status_code=500, detail="Failed to save project")

@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project_data: ProjectUpdate, current_user: str = Depends(verify_token)):
    projects = load_projects()
    
    project_index = None
    for i, project in enumerate(projects):
        if project.id == project_id:
            project_index = i
            break
    
    if project_index is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = {k: v for k, v in project_data.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    # Update the project
    current_project = projects[project_index]
    updated_project = current_project.copy(update=update_data)
    projects[project_index] = updated_project
    
    if save_projects(projects):
        return updated_project
    else:
        raise HTTPException(status_code=500, detail="Failed to update project")

@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str, current_user: str = Depends(verify_token)):
    projects = load_projects()
    
    project_index = None
    for i, project in enumerate(projects):
        if project.id == project_id:
            project_index = i
            break
    
    if project_index is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    projects.pop(project_index)
    
    if save_projects(projects):
        return {"message": "Project deleted successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to delete project")

@api_router.post("/projects/{project_id}/reorder")
async def reorder_project(project_id: str, new_order: int, current_user: str = Depends(verify_token)):
    projects = load_projects()
    
    project_index = None
    for i, project in enumerate(projects):
        if project.id == project_id:
            project_index = i
            break
    
    if project_index is None:
        raise HTTPException(status_code=404, detail="Project not found")
    
    current_project = projects[project_index]
    updated_project = current_project.copy(update={"order": new_order, "updated_at": datetime.utcnow()})
    projects[project_index] = updated_project
    
    if save_projects(projects):
        return {"message": "Project order updated successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to reorder project")

# Include the router in the main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    print("🔒 Starting SECURE server on http://localhost:8000")
    print("💰 Zero database costs!")
    print("📁 Data stored in projects.json")
    print("🛡️ Password hashed with bcrypt")
    print("🔑 Using environment variables for security")
    uvicorn.run(app, host="0.0.0.0", port=8000)
