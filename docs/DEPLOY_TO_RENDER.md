# 🚀 Deploy Frontend to Render

## 📋 **Prerequisites**
- ✅ Your backend is already deployed at `https://immigration-lawyer-rag-backend.onrender.com`
- ✅ Your frontend code is ready
- ✅ You have a Render account

## 🔧 **Step 1: Prepare Your Frontend for Deployment**

### Update Environment Variables for Production
Your `.env.local` file won't be deployed, so we need to set the backend URL in Render's environment variables.

### Verify your frontend configuration
```bash
# Your frontend should already have the correct API endpoint
cat src/app/page.tsx | grep "NEXT_PUBLIC_API_URL"
```

## 🌐 **Step 2: Deploy to Render**

### Option A: Deploy via GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare frontend for Render deployment"
   git push origin main
   ```

2. **Create a new Web Service on Render:**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select this frontend repository

3. **Configure the deployment:**
   ```
   Name: immigration-lawyer-frontend
   Region: Oregon (US West) - same as your backend
   Branch: main
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Set Environment Variables:**
   - Go to "Environment" tab
   - Add: `NEXT_PUBLIC_API_URL` = `https://immigration-lawyer-rag-backend.onrender.com`

### Option B: Deploy via Render CLI

1. **Install Render CLI:**
   ```bash
   npm install -g @render/cli
   ```

2. **Login to Render:**
   ```bash
   render login
   ```

3. **Deploy using render.yaml:**
   ```bash
   render deploy
   ```

### Option C: One-Click Deploy with render.yaml

The `render.yaml` file in your project root is pre-configured for deployment:

```yaml
services:
  - type: web
    name: immigration-lawyer-frontend
    runtime: node
    plan: free
    region: oregon
    branch: main
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NEXT_PUBLIC_API_URL
        value: https://immigration-lawyer-rag-backend.onrender.com
      - key: NODE_ENV
        value: production
```

## 🔧 **Step 3: Deployment Settings**

### Build Settings
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Node Version:** Latest LTS (auto-detected from package.json)

### Environment Variables (Set in Render Dashboard)
```
NEXT_PUBLIC_API_URL=https://immigration-lawyer-rag-backend.onrender.com
NODE_ENV=production
```

## 🌍 **Step 4: After Deployment**

### Your deployed frontend will be available at:
```
https://immigration-lawyer-frontend.onrender.com
```

### Test the connection:
1. Visit your deployed frontend URL
2. Try asking a question like "What are H1B requirements?"
3. The frontend should connect to your backend automatically

## 🐛 **Troubleshooting**

### Common Issues:

1. **Build Fails:**
   ```bash
   # Check your package.json scripts
   npm run build
   ```

2. **API Connection Issues:**
   - Verify `NEXT_PUBLIC_API_URL` environment variable
   - Check backend is responding: `curl https://immigration-lawyer-rag-backend.onrender.com/`

3. **Cold Start Issues:**
   - Both services sleep after 15 minutes on free tier
   - First request may take 30-60 seconds

### Logs and Monitoring:
- View deployment logs in Render dashboard
- Check "Events" tab for build/deployment status
- Monitor performance in "Metrics" tab

## 🚀 **Quick Deploy Steps**

If you want to deploy right now:

1. **Make sure your code is committed:**
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

2. **Go to Render Dashboard:**
   - https://dashboard.render.com
   - New → Web Service
   - Connect this repository
   - Use the settings above

3. **Set environment variable:**
   - `NEXT_PUBLIC_API_URL` = `https://immigration-lawyer-rag-backend.onrender.com`

4. **Deploy!** 🎉

## 📱 **Free Tier Limitations**
- Services sleep after 15 minutes of inactivity
- 750 build hours per month
- 500GB bandwidth per month
- Cold start delays (30-60 seconds)

For production use, consider upgrading to a paid plan for:
- No sleeping
- Faster builds
- Custom domains
- Better performance