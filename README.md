# Legal Search AI App with RAG

A complete AI-powered legal search application with clean separation between backend and frontend.

## 🏗️ Clean Project Structure

```
.
├── backend/                   # Python Flask API with RAG
│   ├── app.py                # Flask server
│   ├── rag_pipeline.py       # RAG implementation  
│   ├── requirements.txt      # Python dependencies
│   ├── render.yaml          # Deployment config
│   └── data/                # Legal documents
│
├── frontend/                 # Next.js React app
│   ├── src/app/             # Next.js 15 app directory
│   ├── src/components/ui/   # shadcn/ui components
│   ├── package.json         # Node dependencies
│   └── vercel.json         # Frontend deployment config
│
└── README.md               # This file
```

## 🚀 Quick Start

### Backend (Python Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py
# Runs on http://localhost:8081
```

### Frontend (Next.js)
```bash
cd frontend  
npm install
npm run dev
# Runs on http://localhost:3000
```

## 🌐 Deployment

### Option 1: Separate Deployment (Recommended)
- **Backend**: Deploy `backend/` folder on Render.com
- **Frontend**: Deploy `frontend/` folder on Vercel

### Option 2: Single Deployment
- Deploy entire project on Render.com using `backend/render.yaml`

## 📋 Features

- **🤖 AI-Powered Search**: RAG pipeline for US immigration law
- **🎨 Modern UI**: Next.js 15 + shadcn/ui + Tailwind CSS
- **📱 Responsive Design**: Works on all devices
- **⚡ Fast Performance**: Optimized for speed
- **🔍 Source Citations**: Every answer includes legal sources

## 🛠️ Tech Stack

- **Backend**: Python, Flask, sentence-transformers, scikit-learn
- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS, shadcn/ui
- **AI**: Sentence transformers for document embeddings
- **Deployment**: Render.com (backend) + Vercel (frontend)

## 📄 License

Educational use only. Consult qualified immigration attorneys for legal advice.
