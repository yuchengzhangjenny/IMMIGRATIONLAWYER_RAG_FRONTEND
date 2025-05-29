'use client'

import React, { useState } from 'react'

const EXAMPLE_QUESTIONS = [
  "What are the requirements for a green card through marriage?",
  "How do I apply for asylum in the United States?",
  "What is the difference between an immigrant visa and a nonimmigrant visa?",
  "What are the eligibility requirements for naturalization?",
  "How long can I stay in the US with a B1/B2 visa?"
]

interface Source {
  source_type: string
  source_file: string
  similarity: number
}

interface ApiResponse {
  answer: string
  sources: Source[]
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState<ApiResponse | null>(null)

  const handleSubmit = async () => {
    if (!query.trim()) {
      alert('Please enter a question.')
      return
    }

    setLoading(true)
    setAnswer(null)

    try {
      const response = await fetch('/api/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: query.trim() })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data: ApiResponse = await response.json()
      setAnswer(data)
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while processing your question. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleExampleClick = (question: string) => {
    setQuery(question)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-8 mb-8 border-b-4 border-blue-700">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold mb-2">US Immigration Law Assistant</h1>
          <p className="text-xl opacity-90">Ask questions about US immigration laws and get accurate, sourced answers</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4">
        {/* Question Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
          <p className="mb-4 text-gray-600">Enter your question about US immigration laws, policies, or procedures below:</p>
          
          <div className="mb-4">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="e.g., What are the requirements for asylum in the United States?"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Processing...' : 'Get Answer'}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center mb-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Searching through immigration laws and regulations...</p>
          </div>
        )}

        {/* Answer */}
        {answer && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">Answer</h3>
            <div className="whitespace-pre-line leading-relaxed mb-6 text-gray-800">
              {answer.answer}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-lg font-semibold mb-3">Sources</h4>
              <div className="space-y-2">
                {answer.sources && answer.sources.length > 0 ? (
                  answer.sources.map((source, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      <strong>{index + 1}.</strong> {source.source_type} - {source.source_file} (Relevance: {(source.similarity * 100).toFixed(1)}%)
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No specific sources found.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Example Questions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Example Questions</h3>
          <p className="mb-4 text-gray-600">Not sure what to ask? Try one of these example questions:</p>
          <div className="space-y-3">
            {EXAMPLE_QUESTIONS.map((question, index) => (
              <div
                key={index}
                onClick={() => handleExampleClick(question)}
                className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {question}
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-sm bg-gray-100 p-4 rounded-lg border-l-4 border-red-500">
          <strong>Disclaimer:</strong> This tool provides information based on US immigration laws and regulations, but it is not a substitute for professional legal advice. The information provided should not be construed as legal advice, and you should consult with a qualified immigration attorney for guidance on your specific situation.
        </div>
      </div>
    </div>
  )
} 