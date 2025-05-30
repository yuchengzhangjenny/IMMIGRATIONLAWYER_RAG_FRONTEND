// Common types for the Immigration Lawyer RAG Frontend

export interface SearchResponse {
  query: string;
  answer: string;
  sources: string[];
  confidence?: number;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface SearchRequest {
  query: string;
  use_llm?: boolean;
} 