# Legal Search AI App with RAG

A complete AI-powered legal search application featuring a Next.js frontend and Python Flask backend with RAG (Retrieval Augmented Generation) capabilities for US Immigration Law.

## 🏗️ Architecture

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS (`legal-search-nextjs/`)
- **Backend**: Python Flask with RAG pipeline (root directory)
- **AI Models**: Sentence transformers and language models for legal document search
- **Database**: Vector embeddings for legal document search

## 📁 Project Structure

```
.
├── legal-search-nextjs/          # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/answer/       # API route (proxies to Python backend)
│   │   │   └── page.tsx          # Main application page
│   │   │
│   │   └── package.json
├── app.py                        # Flask backend server
├── rag_pipeline.py               # RAG implementation
├── requirements.txt              # Python dependencies
├── render.yaml                   # Render deployment config
└── data/                         # Legal documents and embeddings
```

## 🚀 Quick Start

### Local Development

1. **Start the Python Backend**:
```bash
pip install -r requirements.txt
python app.py
```
The backend will run on http://localhost:8081

2. **Start the Next.js Frontend**:
```bash
cd legal-search-nextjs
npm install
npm run dev
```
The frontend will run on http://localhost:3000

## 🌐 Deployment Options

### Option 1: Separate Deployments (Recommended)

**Backend (Python) - Deploy on Render.com:**
1. Push this repository to GitHub
2. Create a new Web Service on Render
3. Connect your repository
4. Use these settings:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:create_app()`
   - Environment: Python 3.10

**Frontend (Next.js) - Deploy on Vercel:**
1. Push the `legal-search-nextjs` folder to a separate GitHub repository
2. Connect to Vercel
3. Set environment variable: `PYTHON_BACKEND_URL=https://your-backend-url.onrender.com`
4. Deploy automatically

### Option 2: Render.com for Both Services

Create a `render.yaml` for multiple services:

```yaml
services:
  # Python Backend
  - type: web
    name: legal-search-backend
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn app:create_app()
    
  # Next.js Frontend  
  - type: web
    name: legal-search-frontend
    runtime: node
    buildCommand: cd legal-search-nextjs && npm install && npm run build
    startCommand: cd legal-search-nextjs && npm start
    envVars:
      - key: PYTHON_BACKEND_URL
        fromService:
          type: web
          name: legal-search-backend
          property: host
```

## 🛠️ Environment Variables

### Backend (.env)
```bash
FLASK_ENV=production
```

### Frontend (.env.local)
```bash
PYTHON_BACKEND_URL=http://localhost:8081  # For local development
# PYTHON_BACKEND_URL=https://your-backend-url.com  # For production
```

## 📚 API Endpoints

### Backend API
- `POST /api/answer` - Submit a legal question and get AI-powered answer
- `GET /api/health` - Health check endpoint
- `POST /search` - Alternative search endpoint

### Request Format
```json
{
  "query": "What are the requirements for asylum in the United States?",
  "use_llm": false
}
```

### Response Format
```json
{
  "answer": "To apply for asylum in the United States...",
  "sources": [
    {
      "source_type": "Legal Document",
      "source_file": "asylum_requirements.pdf",
      "similarity": 0.89
    }
  ]
}
```

## 🔧 Development

### Backend Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run development server
python app.py

# Run with gunicorn (production-like)
gunicorn app:create_app()
```

### Frontend Development
```bash
cd legal-search-nextjs

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

## 📋 Features

- **Intelligent Search**: RAG-powered search through US immigration law documents
- **Source Attribution**: Every answer includes relevant source documents
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **Real-time Processing**: Live search with loading states and error handling
- **Example Questions**: Pre-built questions to help users get started
- **Legal Disclaimer**: Appropriate disclaimers for legal information

## 🔒 Legal Disclaimer

This tool provides information based on US immigration laws and regulations, but it is not a substitute for professional legal advice. Users should consult with qualified immigration attorneys for guidance on specific situations.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is for educational purposes. Please ensure compliance with relevant legal and AI usage policies. 