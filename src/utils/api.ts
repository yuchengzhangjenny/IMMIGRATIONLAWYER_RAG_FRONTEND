// API utility functions

import { API_BASE_URL, API_ENDPOINTS, API_CONFIG } from "@/constants/api";
import type { SearchRequest, SearchResponse } from "@/types";

/**
 * Makes a search request to the backend API
 */
export async function searchAPI(request: SearchRequest): Promise<SearchResponse> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SEARCH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Checks if the backend API is healthy
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.HEALTH}`, {
      method: "GET",
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Implements retry logic for API calls
 */
export async function withRetry<T>(
  apiCall: () => Promise<T>,
  maxAttempts: number = API_CONFIG.RETRY_ATTEMPTS
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxAttempts) {
        throw lastError;
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
    }
  }

  throw lastError!;
} 