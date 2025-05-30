# 🔧 Render Deployment Troubleshooting Guide

## 🎯 **Issue Identified: Backend Sleeping (502 Error)**

Your frontend code is **perfect** ✅ - the issue was that your **backend service was sleeping** on Render's free tier.

## 🧠 **Why This Happens:**

### **Render Free Tier Limitations:**
- Services **sleep after 15 minutes** of inactivity
- **Cold start time**: 30-90 seconds to wake up
- During cold start: Returns **502 Bad Gateway** errors
- Once awake: Works perfectly

## 🛠️ **Solutions:**

### **Option 1: Quick Fix (Keep Backend Awake)**
```bash
# Ping your backend every 14 minutes to keep it awake
# (You can use a service like cron-job.org for this)
curl https://immigration-lawyer-rag-backend.onrender.com/api/health
```

### **Option 2: Frontend Enhancement (Handle Cold Starts)**
Add retry logic to your frontend to handle 502 errors:

```javascript
// In your page.tsx, enhance the handleSearch function:
const handleSearch = async () => {
  if (!query.trim()) return;
  
  setLoading(true);
  setError("");
  setResult(null);

  const maxRetries = 3;
  const retryDelay = 2000; // 2 seconds

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
      const response = await fetch(`${apiUrl}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          use_llm: false
        }),
      });

      if (response.status === 502 && attempt < maxRetries) {
        // Backend is sleeping, wait and retry
        setError(`Backend is starting up... (Attempt ${attempt}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setError(""); // Clear any retry messages
      break; // Success, exit loop

    } catch (err) {
      if (attempt === maxRetries) {
        setError(`Failed to search: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }
  }
  
  setLoading(false);
};
```

### **Option 3: Upgrade to Render Paid Plan**
- **$7/month**: No sleeping, instant responses
- **Always-on**: 24/7 availability
- **Better performance**: Faster response times

## ✅ **Deployment Checklist for Render:**

### **Frontend Deployment:**
1. **Environment Variables in Render:**
   - Set `NEXT_PUBLIC_API_URL=https://immigration-lawyer-rag-backend.onrender.com`
   - Set `NODE_ENV=production`

2. **Build Settings:**
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: Use same as local (check with `node --version`)

3. **Common Issues & Fixes:**
   ```yaml
   # In render.yaml (optional)
   services:
     - type: web
       name: immigration-lawyer-frontend
       runtime: node
       buildCommand: npm install && npm run build
       startCommand: npm start
       envVars:
         - key: NEXT_PUBLIC_API_URL
           value: https://immigration-lawyer-rag-backend.onrender.com
         - key: NODE_ENV
           value: production
   ```

## 🧪 **Testing Your Deployment:**

### **Test Backend Health:**
```bash
# Test if backend is awake
curl https://immigration-lawyer-rag-backend.onrender.com/api/health

# If you get 502, wait 60 seconds and try again
curl https://immigration-lawyer-rag-backend.onrender.com/
```

### **Test Frontend Connection:**
```bash
# Test your deployed frontend
curl https://your-frontend-url.onrender.com
```

## 🚨 **Emergency Debugging:**

If your frontend still doesn't work on Render:

1. **Check Render Logs:**
   - Go to Render Dashboard → Your Service → Logs
   - Look for build/runtime errors

2. **Check Browser Console:**
   - Open your deployed app in browser
   - Press F12 → Console tab
   - Look for API call errors

3. **Check Network Tab:**
   - F12 → Network tab
   - Try a search, see what happens to the API call

## 💡 **Pro Tips:**

- **Keep backend warm** during development with automated pings
- **Add loading states** for cold start delays
- **Use environment variables** properly in Render
- **Monitor logs** regularly for issues
- **Test both local and deployed** versions frequently

## 🎯 **Next Steps:**

1. Deploy your frontend to Render using the guide
2. Set the environment variable in Render Dashboard
3. Test the deployed app
4. If 502 errors occur, wait 60 seconds and try again
5. Consider implementing retry logic for better UX 