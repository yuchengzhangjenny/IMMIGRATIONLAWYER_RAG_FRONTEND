#!/usr/bin/env node

/**
 * Simple script to test backend connection
 * Run with: node test-backend-connection.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length) {
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value;
      }
    });
  }
}

// Load .env.local first
loadEnvFile();

// Get backend URL from environment or default
const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081';
const url = new URL(`${backendUrl}/search`);

console.log(`🧪 Testing backend connection to: ${backendUrl}`);
console.log('---');

// Test data
const testQuery = {
  query: "What are the requirements for H1B visa?",
  use_llm: false
};

const postData = JSON.stringify(testQuery);

const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  },
  timeout: 60000 // 60 second timeout for Render cold starts
};

console.log(`📡 Making POST request to ${url.href}`);
console.log(`📋 Payload:`, testQuery);
console.log('💡 Note: First request might take 30-60 seconds if backend is sleeping...');
console.log('---');

// Choose http or https based on protocol
const client = url.protocol === 'https:' ? https : http;

const req = client.request(options, (res) => {
  console.log(`✅ Status Code: ${res.statusCode}`);
  console.log(`📄 Headers:`, res.headers);
  console.log('---');

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const jsonData = JSON.parse(data);
      console.log('✅ Response received successfully!');
      console.log('📋 Response data:');
      console.log(JSON.stringify(jsonData, null, 2));
      
      if (jsonData.answer) {
        console.log('\n🎉 Backend is working correctly!');
        console.log(`📝 Answer preview: ${jsonData.answer.substring(0, 100)}...`);
      }
    } catch (error) {
      console.log('❌ Failed to parse JSON response');
      console.log('📄 Raw response:', data);
      
      if (res.statusCode === 200) {
        console.log('💡 Backend responded but with non-JSON content');
      }
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Connection failed!');
  console.log('🔍 Error details:', error.message);
  console.log('');
  console.log('🛠️  Troubleshooting:');
  console.log('   1. Make sure your backend is running and accessible');
  console.log('   2. Check the backend URL in your .env.local file');
  console.log('   3. If using Render free tier, backend might be sleeping (wait 30-60 seconds)');
  console.log('   4. Verify CORS settings in your backend');
  console.log('   5. Check backend logs on Render dashboard');
});

req.on('timeout', () => {
  console.log('⏰ Request timed out');
  console.log('💡 This might happen if:');
  console.log('   - Backend is cold starting (Render free tier)');
  console.log('   - Backend is overloaded');
  console.log('   - Network connectivity issues');
  req.destroy();
});

req.write(postData);
req.end();

console.log('⏳ Waiting for response (timeout: 60 seconds)...'); 