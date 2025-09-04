from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World - TESTE!"}

@app.get("/api/")
def read_api():
    return {"message": "API funcionando!", "status": "ok"}

if __name__ == "__main__":
    import uvicorn
    print("🚀 Iniciando servidor de teste...")
    uvicorn.run(app, host="127.0.0.1", port=8000)

