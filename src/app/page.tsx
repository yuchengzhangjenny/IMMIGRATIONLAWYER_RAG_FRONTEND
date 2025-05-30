"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchResult {
  answer: string;
  sources: Array<{
    title: string;
    chunk: string;
    similarity: number;
  }>;
  query: string;
}

export default function LegalSearchAI() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const exampleQuestions = [
    "What are the requirements for H1B visa?",
    "How long can I stay in the US with a tourist visa?",
    "What is the process for applying for asylum in the United States?",
    "What documents are needed for naturalization?",
    "What are the eligibility criteria for DACA?"
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError("");
    setResult(null);

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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(`Failed to search: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setQuery(example);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Legal Search AI
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered search for US Immigration Law
          </p>
        </div>

        {/* Search Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Ask Your Legal Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter your immigration law question here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[120px] text-base"
            />
            <Button 
              onClick={handleSearch} 
              disabled={loading || !query.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Searching..." : "Search Legal Database"}
            </Button>
          </CardContent>
        </Card>

        {/* Example Questions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Example Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {exampleQuestions.map((example, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 p-2 text-sm"
                  onClick={() => handleExampleClick(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="shadow-lg border-red-200">
            <CardContent className="pt-6">
              <div className="text-red-600 text-center">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-4">
            {/* Answer */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-green-700">Answer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {result.answer}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sources */}
            {result.sources && result.sources.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Legal Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="max-h-96">
                    <div className="space-y-4">
                      {result.sources.map((source, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {source.title}
                            </h4>
                            <Badge variant="outline">
                              {Math.round(source.similarity * 100)}% match
                            </Badge>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {source.chunk}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-6 text-gray-600">
          <p className="text-sm">
            ⚠️ This tool provides general information only. Consult qualified immigration attorneys for legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}
