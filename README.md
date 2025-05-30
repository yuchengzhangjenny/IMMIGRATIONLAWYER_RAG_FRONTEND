# 🏛️ Immigration Lawyer RAG Frontend

A Next.js frontend application for the Immigration Lawyer RAG system, providing an intuitive interface for legal document search and question answering.

## 🚀 **Quick Start**

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 **Project Structure**

```
├── 📁 docs/                          # Documentation files
│   ├── DEPLOY_TO_RENDER.md          # Deployment guide
│   ├── RENDER_TROUBLESHOOTING.md    # Troubleshooting guide
│   └── TESTING_GUIDE.md             # Testing instructions
├── 📁 public/                        # Static assets
│   └── favicon.ico                   # Site favicon
├── 📁 scripts/                       # Utility scripts
│   └── test-backend-connection.js    # Backend connectivity test
├── 📁 src/                           # Source code
│   ├── 📁 app/                       # Next.js App Router
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   ├── 📁 components/                # Reusable components
│   │   └── 📁 ui/                    # UI components (shadcn/ui)
│   ├── 📁 constants/                 # App constants
│   ├── 📁 hooks/                     # Custom React hooks
│   ├── 📁 lib/                       # Utility libraries
│   ├── 📁 types/                     # TypeScript type definitions
│   └── 📁 utils/                     # Utility functions
├── .nvmrc                            # Node.js version specification
├── components.json                   # shadcn/ui configuration
├── next.config.ts                    # Next.js configuration
├── package.json                      # Dependencies and scripts
├── render.yaml                       # Render deployment config
├── tailwind.config.js                # Tailwind CSS configuration
└── tsconfig.json                     # TypeScript configuration
```

## 🔧 **Environment Setup**

### **Environment Variables**

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_URL=https://immigration-lawyer-rag-backend.onrender.com
```

### **Node.js Version**

This project uses Node.js `22.12.0` as specified in `.nvmrc`. Make sure to use the correct version:

```bash
# If using nvm
nvm use

# Or manually check version
node --version  # Should be v22.12.0
```

## 🧪 **Testing**

```bash
# Test backend connectivity
npm run test-backend

# Run linting
npm run lint
```

## 🚀 **Deployment**

### **Render.com Deployment**

1. **Automatic**: Use the `render.yaml` file for automatic deployment
2. **Manual**: Follow the guide in `docs/DEPLOY_TO_RENDER.md`

### **Other Platforms**

- **Vercel**: Ready for deployment (includes `vercel.json`)
- **Netlify**: Compatible with standard Next.js deployment

## 🛠️ **Tech Stack**

- **Framework**: Next.js 15.3.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Runtime**: Node.js 22.12.0

## 📚 **Documentation**

- **Deployment**: [`docs/DEPLOY_TO_RENDER.md`](docs/DEPLOY_TO_RENDER.md)
- **Troubleshooting**: [`docs/RENDER_TROUBLESHOOTING.md`](docs/RENDER_TROUBLESHOOTING.md)
- **Testing**: [`docs/TESTING_GUIDE.md`](docs/TESTING_GUIDE.md)

## 🤝 **Development Guidelines**

### **Code Organization**

- **Components**: Place reusable components in `src/components/`
- **Pages**: Use App Router in `src/app/`
- **Utilities**: Add helper functions to `src/utils/`
- **Types**: Define TypeScript types in `src/types/`
- **Constants**: Store app constants in `src/constants/`

### **Naming Conventions**

- **Files**: Use kebab-case for file names (`my-component.tsx`)
- **Components**: Use PascalCase for React components (`MyComponent`)
- **Functions**: Use camelCase for functions (`myFunction`)
- **Constants**: Use UPPER_SNAKE_CASE (`MY_CONSTANT`)

## 🐛 **Troubleshooting**

For deployment and runtime issues, check:
1. [`docs/RENDER_TROUBLESHOOTING.md`](docs/RENDER_TROUBLESHOOTING.md) - Render-specific issues
2. [`docs/TESTING_GUIDE.md`](docs/TESTING_GUIDE.md) - Backend connectivity testing

## 📄 **License**

This project is for educational/demonstration purposes.

---

**Backend Repository**: [Immigration Lawyer RAG Backend](https://github.com/yuchengzhangjenny/IMMIGRATIONLAWYER_RAG_BACKEND)  
**Live Demo**: [Frontend URL](https://immigration-lawyer-frontend.onrender.com) | [Backend URL](https://immigration-lawyer-rag-backend.onrender.com)
