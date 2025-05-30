# 🚀 **Step-by-Step: Deploy Frontend to Render**

## ✅ **Prerequisites Complete:**
- ✅ Code pushed to GitHub: `https://github.com/yuchengzhangjenny/IMMIGRATIONLAWYER_RAG_FRONTEND.git`
- ✅ Backend deployed: `https://immigration-lawyer-rag-backend.onrender.com`
- ✅ Frontend builds successfully
- ✅ Node.js version: `22.12.0` (Render-compatible)
- ✅ Node version fixed: Added `.nvmrc` and `engines` in package.json

## 🌐 **Deploy to Render - Exact Steps:**

### **Step 1: Go to Render Dashboard**
1. Open: https://dashboard.render.com
2. Sign in to your account
3. Click **"New +"** button
4. Select **"Web Service"**

### **Step 2: Connect Your Repository**
1. **Repository**: Select "Build and deploy from a Git repository"
2. **Connect repository**: `https://github.com/yuchengzhangjenny/IMMIGRATIONLAWYER_RAG_FRONTEND.git`
3. Click **"Connect"**

### **Step 3: Configure Service Settings**

#### **Basic Settings:**
- **Name**: `immigration-lawyer-frontend` (or your preferred name)
- **Region**: `Oregon (US West)` (recommended - same as backend)
- **Branch**: `main`
- **Runtime**: `Node`
- **Root Directory**: Leave blank or set to `./` (NOT `src`)

#### **Build & Deploy Settings:**
- **Build Command**: 
  ```bash
  npm install && npm run build
  ```
- **Start Command**: 
  ```bash
  npm start
  ```

#### **Advanced Settings:**
- **Node Version**: `22.12.0` (automatically detected from .nvmrc file)
- **Plan**: `Free` (or `Starter $7/month` for no sleeping)

### **Step 4: Environment Variables**
Click **"Advanced"** and add these environment variables:

| **Key** | **Value** |
|---------|-----------|
| `NEXT_PUBLIC_API_URL` | `https://immigration-lawyer-rag-backend.onrender.com` |
| `NODE_ENV` | `production` |

**Note**: You **don't need** to set `NODE_VERSION` manually - Render will automatically use `22.12.0` from your `.nvmrc` file!

### **Step 5: Deploy**
1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. Watch the build logs for any errors

## 🎯 **Expected Results:**

### **Successful Deployment:**
- ✅ Build completes without errors
- ✅ Service starts successfully
- ✅ You get a URL like: `https://immigration-lawyer-frontend-xyz.onrender.com`

### **Test Your Deployed App:**
1. Open your Render URL in browser
2. Try searching: "H1B visa requirements"
3. **First search might take 60+ seconds** (backend cold start)
4. Subsequent searches should be fast

## 🚨 **Troubleshooting:**

### **If Build Fails:**
```bash
# Check these in the build logs:
- Node version compatibility
- NPM install errors
- Build command issues
```

### **If App Doesn't Load:**
```bash
# Check these:
- Start command is correct: npm start
- Environment variables are set correctly
- Port is not hardcoded (Render assigns port automatically)
```

### **If API Calls Fail:**
1. **502 Errors**: Backend is sleeping, wait 60 seconds
2. **404 Errors**: Check `NEXT_PUBLIC_API_URL` environment variable
3. **CORS Errors**: Backend needs to allow your Render domain

## ⚡ **Quick Fix Commands:**

If you need to update your deployment:

```bash
# Push changes to trigger new deployment
git add .
git commit -m "Update deployment configuration"
git push origin main
```

## 🎉 **Success Checklist:**

- [ ] Service deployed successfully
- [ ] Build logs show no errors
- [ ] App loads in browser
- [ ] Search functionality works
- [ ] Backend connection established
- [ ] No console errors in browser

## 📞 **Get Your Deployment URL:**

After successful deployment, you'll get a URL like:
`https://immigration-lawyer-frontend-[random].onrender.com`

Save this URL - this is your live application!

---

## 🔗 **Your Deployment URLs:**
- **Frontend**: `[Your Render URL will appear here]`
- **Backend**: `https://immigration-lawyer-rag-backend.onrender.com`
- **GitHub**: `https://github.com/yuchengzhangjenny/IMMIGRATIONLAWYER_RAG_FRONTEND.git`

## 🚨 **IMPORTANT: Fix Root Directory Issue**

If you get the error: `Could not read package.json: Error: ENOENT: no such file or directory, open '/opt/render/project/src/package.json'`

**This means Render is looking in the wrong directory. Fix it by:**

1. **In Render Dashboard**: 
   - Go to your service settings
   - Find **"Root Directory"** setting
   - Make sure it's set to `./` (root) or leave it blank
   - **NOT** set to `src`

2. **Or use our render.yaml file** (already configured correctly) 