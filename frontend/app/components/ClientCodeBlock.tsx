"use client";
import { useTheme } from "../../src/context/ThemeContext";
import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ClientCodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Safely mount on the client to avoid Hydration Mismatches
  useEffect(() => setMounted(true), []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const theme = {
    border: darkMode ? "border-[#222222]" : "border-[#D1D1D1]",
    headerBg: darkMode ? "bg-[#050505]" : "bg-[#EAEAEA]",
    codeBg: darkMode ? "bg-[#111111]" : "bg-[#F4F4F0]",
    text: darkMode ? "text-amber-500" : "text-amber-700",
    iconHover: darkMode ? "hover:text-cyan-400" : "hover:text-indigo-600",
  };

  // Render a seamless skeleton placeholder while server is syncing with client
  if (!mounted) {
    return (
      <div
        className={`h-48 w-full animate-pulse rounded-md mb-8 mt-4 border ${darkMode ? "bg-[#111111] border-[#222222]" : "bg-[#EAEAEA] border-[#D1D1D1]"}`}
      ></div>
    );
  }

  return (
    <div
      className={`border ${theme.border} flex flex-col mb-8 mt-4 rounded-md overflow-hidden transition-colors duration-200`}
    >
      {/* Code Header Bar */}
      <div
        className={`flex items-center justify-between px-4 py-2 border-b ${theme.border} ${theme.headerBg} transition-colors duration-200`}
      >
        <span
          className={`font-mono text-[10px] font-bold uppercase tracking-widest ${theme.text}`}
        >
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className={`opacity-50 ${theme.iconHover} transition-colors`}
          aria-label='Copy code'
        >
          {copied ? (
            <Check
              size={16}
              className={darkMode ? "text-emerald-500" : "text-emerald-600"}
            />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>

      {/* Code Area */}
      <div
        className={`p-4 overflow-x-auto ${theme.codeBg} transition-colors duration-200`}
      >
        <SyntaxHighlighter
          language={language}
          style={darkMode ? vscDarkPlus : oneLight}
          customStyle={{
            background: "transparent",
            padding: 0,
            margin: 0,
            fontSize: "0.9rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
