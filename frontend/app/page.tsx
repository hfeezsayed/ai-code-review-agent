"use client";

import { useState } from "react";

import CodeEditor from "@/components/CodeEditor";
import OutputTabs from "@/components/OutputTabs";
import { analyzeCode } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [code, setCode] = useState(`def divide(a,b):
    return a/b

print(divide(10,0))
`);

  const [language, setLanguage] = useState("python");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any>(null);

  const handleReview = async () => {
    try {
      setLoading(true);

      const data = await analyzeCode(code, language);

      setResult(data);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
              Multi-Agent AI System
            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              AI Code Review & Fix Agent
            </h1>

            <p className="mt-3 max-w-2xl text-zinc-400 dark:text-zinc-100">
              Review, optimize and improve Python and JavaScript code using
              FastAPI, CrewAI, LangChain and OpenAI.
            </p>
          </div>
        </div>
        {/* Controls */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 pr-8 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>

          <button
            onClick={handleReview}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Reviewing...
              </span>
            ) : (
              "Review & Fix"
            )}
          </button>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Left Panel */}
          <CodeEditor code={code} setCode={setCode} language={language} />

          {/* Right Panel */}
          <OutputTabs result={result} />
        </div>
      </div>
    </main>
  );
}
