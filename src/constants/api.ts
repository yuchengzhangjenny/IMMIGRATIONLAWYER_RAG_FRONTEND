// API endpoints and configuration constants

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

export const API_ENDPOINTS = {
  SEARCH: "/search",
  HEALTH: "/api/health",
} as const;

export const API_CONFIG = {
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 2000, // 2 seconds
} as const; 