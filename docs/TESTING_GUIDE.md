# 🧪 Testing Guide: Separated Backend & Frontend

## 🏗️ Architecture Overview
- **Frontend Repository**: This repo (Next.js)
- **Backend Repository**: Separate repo (Python Flask)
- **Communication**: Frontend calls backend API via HTTP

## 🔧 Testing Approaches

### 1. **Local Development Testing**

#### Step 1: Start Your Backend (In Backend Repo)
```bash
# In your backend repository
cd path/to/your/backend-repo
pip install -r requirements.txt
python app.py
# Should run on http://localhost:8081
```

#### Step 2: Start Your Frontend (This Repo)
```bash
# In this repository
npm install
npm run dev
# Will run on http://localhost:3000
```

#### Step 3: Test the Connection
- Open http://localhost:3000
- Try asking a question like "What are the requirements for H1B visa?"
- Check browser DevTools Network tab for API calls

### 2. **Production Testing**

#### Frontend Environment Variables
Create different `.env` files for different environments:

```bash
# .env.local (local development)
NEXT_PUBLIC_API_URL=http://localhost:8081

# .env.production (production deployment)
NEXT_PUBLIC_API_URL=https://your-backend-app.render.com

# .env.staging (staging environment)
NEXT_PUBLIC_API_URL=https://your-backend-staging.render.com
```

### 3. **Cross-Repository Testing Workflow**

#### Option A: Manual Testing
1. Deploy backend to Render/Heroku
2. Update `NEXT_PUBLIC_API_URL` in frontend
3. Deploy frontend to Vercel
4. Test end-to-end functionality

#### Option B: Local Backend + Deployed Frontend
1. Deploy frontend with `NEXT_PUBLIC_API_URL=http://localhost:8081`
2. Start backend locally
3. Test deployed frontend against local backend
4. ⚠️ **Note**: CORS issues may occur - add frontend domain to backend CORS settings

#### Option C: Deployed Backend + Local Frontend
1. Deploy backend to Render
2. Update `.env.local` with deployed backend URL
3. Test local frontend against deployed backend

### 4. **API Testing Tools**

#### Using curl to test backend directly:
```bash
# Test backend health
curl http://localhost:8081/health

# Test search endpoint
curl -X POST http://localhost:8081/api/answer \
  -H "Content-Type: application/json" \
  -d '{"query": "H1B visa requirements", "use_llm": false}'
```

#### Using Postman:
1. Create collection for your backend API
2. Test all endpoints independently
3. Share collection with team

### 5. **CORS Configuration**

Make sure your backend allows requests from your frontend domain:

```python
# In your backend app.py
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:3000",  # Local development
    "https://your-frontend-app.vercel.app"  # Production
])
```

### 6. **Testing Checklist**

#### ✅ **Backend Tests**
- [ ] Backend starts without errors
- [ ] API endpoints respond correctly
- [ ] Database/vector store connections work
- [ ] CORS headers are set correctly

#### ✅ **Frontend Tests**
- [ ] Frontend starts without errors
- [ ] Environment variables are loaded
- [ ] API calls are made to correct endpoints
- [ ] Error handling works (backend down scenarios)
- [ ] UI renders responses correctly

#### ✅ **Integration Tests**
- [ ] Frontend can successfully call backend APIs
- [ ] Search functionality works end-to-end
- [ ] Error states are handled gracefully
- [ ] Loading states work correctly

### 7. **Debugging Tips**

#### Frontend Debugging:
```bash
# Check environment variables are loaded
console.log(process.env.NEXT_PUBLIC_API_URL)

# Monitor network requests in browser DevTools
# Look for failed API calls, CORS errors, etc.
```

#### Backend Debugging:
```bash
# Add logging to see incoming requests
import logging
logging.basicConfig(level=logging.DEBUG)

# Enable Flask debug mode
app.run(debug=True)
```

### 8. **Automated Testing Setup**

#### Frontend Tests:
```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Test API integration with mock backend
# Test component rendering
# Test error handling
```

#### Backend Tests:
```bash
# In backend repo
pip install pytest pytest-flask

# Test API endpoints
# Test RAG pipeline
# Test database operations
```

### 9. **CI/CD Pipeline**

```yaml
# Example GitHub Actions for frontend
name: Frontend CI/CD
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}
```

## 🚀 **Quick Start Commands**

```bash
# 1. Start backend (in backend repo)
cd ../your-backend-repo && python app.py

# 2. Start frontend (in this repo)
npm run dev

# 3. Test integration
curl -X POST http://localhost:8081/api/answer \
  -H "Content-Type: application/json" \
  -d '{"query": "test", "use_llm": false}'
```

## 🔍 **Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| CORS errors | Add frontend domain to backend CORS settings |
| API calls failing | Check backend URL in environment variables |
| Network errors | Ensure backend is running and accessible |
| 404 on API calls | Verify API endpoint paths match between frontend/backend |
| Environment variables not loading | Restart Next.js dev server after changing .env files |

## 📚 **Additional Resources**

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Flask CORS Documentation](https://flask-cors.readthedocs.io/)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Render Deployment Guide](https://render.com/docs) 