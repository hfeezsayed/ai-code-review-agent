"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";

interface OutputTabsProps {
  result: any;
}

export default function OutputTabs({ result }: OutputTabsProps) {
  const [activeTab, setActiveTab] = useState("review");
  const [copied, setCopied] = useState(false);

  const getContent = () => {
    if (!result) return null;

    switch (activeTab) {
      case "review":
        return result.review || "No review available";

      case "fixed":
        return result.fixed_code || "No fixed code available";

      case "improvements":
        return result.improvements || "No improvements available";

      default:
        return "";
    }
  };

  const handleCopy = async () => {
    const content = getContent();

    if (!content) return;

    try {
      await navigator.clipboard.writeText(String(content));

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const reviewItems =
    result && activeTab === "review"
      ? String(result.review)
          .split("\n")
          .map((line) =>
            line
              .replace(/^#+\s*/, "")
              .replace(/^-+\s*/, "")
              .trim(),
          )
          .filter(Boolean)
      : [];

  const improvementItems =
    result && activeTab === "improvements"
      ? String(result.improvements)
          .split("\n")
          .map((line) =>
            line
              .replace(/^#+\s*/, "")
              .replace(/^-+\s*/, "")
              .trim(),
          )
          .filter(Boolean)
      : [];

  const getHeadingStyle = (heading: string) => {
    switch (heading) {
      case "Bugs":
        return {
          icon: "🐞",
          className: "border-red-500/40 bg-red-500/10 text-red-400",
        };

      case "Performance Issues":
        return {
          icon: "⚡",
          className: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
        };

      case "Best Practices":
        return {
          icon: "✅",
          className: "border-green-500/40 bg-green-500/10 text-green-400",
        };

      case "Security Issues":
        return {
          icon: "🔒",
          className: "border-purple-500/40 bg-purple-500/10 text-purple-400",
        };

      case "Summary":
        return {
          icon: "📋",
          className: "border-blue-500/40 bg-blue-500/10 text-blue-400",
        };

      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl">
      <h2 className="mb-4 text-xl font-semibold">Analysis Result</h2>

      {/* Tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["review", "fixed", "improvements"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-md"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {tab === "review" && "Review"}
            {tab === "fixed" && "Fixed Code"}
            {tab === "improvements" && "Improvements"}
          </button>
        ))}
      </div>

      {/* Copy Button */}
      <div className="mb-3 flex justify-end">
        <button
          onClick={handleCopy}
          disabled={!result}
          className="flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="h-[500px] overflow-auto rounded-lg border border-zinc-700 bg-zinc-950 p-5">
        {!result ? (
          <p className="text-zinc-400 italic">
            {activeTab === "review" && "Review report will appear here..."}
            {activeTab === "fixed" && "Fixed code will appear here..."}
            {activeTab === "improvements" && "Improvements will appear here..."}
          </p>
        ) : activeTab === "review" ? (
          <div className="space-y-3">
            {reviewItems.map((item, index) => {
              const heading = getHeadingStyle(item);

              if (heading) {
                return (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 font-bold text-lg ${heading.className}`}
                  >
                    {heading.icon} {item}
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition hover:border-blue-500/40 hover:bg-zinc-800"
                >
                  <p className="text-zinc-300 leading-7">{item}</p>
                </div>
              );
            })}
          </div>
        ) : activeTab === "improvements" ? (
          <div className="space-y-3">
            {improvementItems.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 transition hover:border-green-500/40 hover:bg-zinc-800"
              >
                <p className="text-zinc-300 leading-7">{item}</p>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="
              prose
              prose-invert
              max-w-none
              prose-headings:text-white
              prose-p:text-zinc-300
              prose-li:text-zinc-300
              prose-code:text-blue-300
            "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {String(getContent())}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
