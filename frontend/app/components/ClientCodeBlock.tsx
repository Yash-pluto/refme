"use client";
import { useTheme } from "../../src/context/ThemeContext";
import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

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

  const pitchBlackModernStyle = {
    'code[class*="language-"]': {
      background: '#050505',
      color: '#FFFFFF',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    'pre[class*="language-"]': {
      background: '#050505',
      color: '#FFFFFF',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    comment: { color: '#8B8B8B', fontStyle: 'italic' },
    keyword: { color: '#A0A0A0', fontWeight: 600 },
    selector: { color: '#FFFFFF' },
    punctuation: { color: '#A0A0A0' },
    string: { color: '#99FFE4' },
    number: { color: '#99FFE4' },
    function: { color: '#FFFFFF' },
    className: { color: '#FFFFFF' },
    tag: { color: '#FFFFFF' },
    attrName: { color: '#99FFE4' },
    attrValue: { color: '#99FFE4' },
    operator: { color: '#A0A0A0' },
    boolean: { color: '#E580FF' },
    builtin: { color: '#99FFE4' },
    parameter: { color: '#FFFFFF' },
    property: { color: '#FFFFFF' },
    variable: { color: '#FFFFFF' },
    regex: { color: '#99FFE4' },
    deleted: { color: '#E580FF' },
    inserted: { color: '#99FFE4' },
    important: { color: '#E580FF' },
    maybeClassName: { color: '#C699FF' },
    plain: { color: '#FFFFFF' },
    default: { color: '#FFFFFF' },
    symbol: { color: '#99FFE4' },
    class: { color: '#C699FF' },
    title: { color: '#C699FF' },
    constant: { color: '#C699FF' },
    type: { color: '#C699FF' },
    namespace: { color: '#C699FF' },
    char: { color: '#99FFE4' },
    url: { color: '#99FFE4' },
    atrule: { color: '#C699FF' },
    selectorClass: { color: '#C699FF' },
    selectorId: { color: '#C699FF' },
    attribute: { color: '#C699FF' },
    literal: { color: '#99FFE4' },
    hexcode: { color: '#99FFE4' },
    'template-string': { color: '#99FFE4' },
    'attr-value': { color: '#99FFE4' },
    'attr-name': { color: '#99FFE4' },
    'class-name': { color: '#C699FF' },
    'function-name': { color: '#FFFFFF' },
    'tag-name': { color: '#C699FF' },
    'pseudo-class': { color: '#C699FF' },
    'pseudo-element': { color: '#C699FF' },
    'html-tag': { color: '#C699FF' },
    'json-key': { color: '#99FFE4' },
    'error': { color: '#E580FF' },
    invalid: { color: '#E580FF' },
    deletedCode: { color: '#E580FF' },
    insert: { background: '#050505' },
    delete: { background: '#050505' },
  };

  const softLightModernStyle = {
    'code[class*="language-"]': {
      background: '#F4F4F0',
      color: '#111111',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    'pre[class*="language-"]': {
      background: '#F4F4F0',
      color: '#111111',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    comment: { color: '#6F7780', fontStyle: 'italic' },
    keyword: { color: '#6D4DD8', fontWeight: 600 },
    selector: { color: '#111111' },
    punctuation: { color: '#4B5563' },
    string: { color: '#0C7C6B' },
    number: { color: '#0C7C6B' },
    function: { color: '#111111' },
    className: { color: '#111111' },
    tag: { color: '#111111' },
    attrName: { color: '#0C7C6B' },
    attrValue: { color: '#0C7C6B' },
    operator: { color: '#4B5563' },
    boolean: { color: '#B33EE5' },
    builtin: { color: '#0C7C6B' },
    parameter: { color: '#111111' },
    property: { color: '#111111' },
    variable: { color: '#111111' },
    regex: { color: '#0C7C6B' },
    deleted: { color: '#B33EE5' },
    inserted: { color: '#0C7C6B' },
    important: { color: '#B33EE5' },
    maybeClassName: { color: '#7A4FD4' },
    plain: { color: '#111111' },
    default: { color: '#111111' },
    symbol: { color: '#0C7C6B' },
    class: { color: '#7A4FD4' },
    title: { color: '#7A4FD4' },
    constant: { color: '#7A4FD4' },
    type: { color: '#7A4FD4' },
    namespace: { color: '#7A4FD4' },
    char: { color: '#0C7C6B' },
    url: { color: '#0C7C6B' },
    atrule: { color: '#7A4FD4' },
    selectorClass: { color: '#7A4FD4' },
    selectorId: { color: '#7A4FD4' },
    attribute: { color: '#7A4FD4' },
    literal: { color: '#0C7C6B' },
    hexcode: { color: '#0C7C6B' },
    'template-string': { color: '#0C7C6B' },
    'attr-value': { color: '#0C7C6B' },
    'attr-name': { color: '#0C7C6B' },
    'class-name': { color: '#7A4FD4' },
    'function-name': { color: '#111111' },
    'tag-name': { color: '#7A4FD4' },
    'pseudo-class': { color: '#7A4FD4' },
    'pseudo-element': { color: '#7A4FD4' },
    'html-tag': { color: '#7A4FD4' },
    'json-key': { color: '#0C7C6B' },
    'error': { color: '#B33EE5' },
    invalid: { color: '#B33EE5' },
    deletedCode: { color: '#B33EE5' },
    insert: { background: '#F4F4F0' },
    delete: { background: '#F4F4F0' },
  };

  const theme = {
    border: darkMode ? "border-[#222222]" : "border-[#D1D1D1]",
    headerBg: darkMode ? "bg-[#050505]" : "bg-[#EAEAEA]",
    codeBg: darkMode ? "bg-[#050505]" : "bg-[#F4F4F0]",
    text: darkMode ? "text-zinc-200" : "text-zinc-700",
    iconHover: darkMode ? "hover:text-zinc-100" : "hover:text-indigo-600",
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
          style={darkMode ? pitchBlackModernStyle : softLightModernStyle}
          customStyle={{
            background: "transparent",
            padding: 0,
            margin: 0,
            fontSize: "0.9rem",
            lineHeight: "1.7",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
