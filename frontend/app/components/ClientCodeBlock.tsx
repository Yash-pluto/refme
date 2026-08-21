"use client";

/**
 * @fileoverview Reusable Client-side Code Block component with syntax highlighting.
 * Applies a custom "Pitch Black" textmate theme mapping, and enforces strict flex 
 * boundaries to prevent mobile viewport overflow.
 *
 * @author Yash Vardhan
 */

import { useTheme } from "../../src/context/ThemeContext";
import { useState } from "react";
import { Copy, Check, FileCode2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {Skeleton} from "../../app/components/Skeleton";

export interface ClientCodeBlockProps {
  /** The raw code string to be highlighted */
  code: string;
  /** The programming language for syntax tokenization (e.g., 'typescript', 'cpp') */
  language: string;
  /** Optional file name displayed in the header */
  filename?: string;
  /** Array of 1-indexed line numbers to apply a highlight overlay to */
  highlightLines?: number[];
}

export default function ClientCodeBlock({
  code,
  language,
  filename,
  highlightLines = [],
}: ClientCodeBlockProps) {
  // Grab `mounted` to defer the Javascript-heavy SyntaxHighlighter
  const { darkMode, mounted } = useTheme();
  const [copied, setCopied] = useState(false);

  /**
   * Writes the active code block to the system clipboard.
   * Temporarily toggles the copied state for visual feedback.
   */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code to clipboard", err);
    }
  };

  /**
   * Pitch Black Theme Mapping
   */
  const pitchBlackModernStyle = {
    'code[class*="language-"]': {
      background: '#101010',
      color: '#FFF',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    'pre[class*="language-"]': {
      background: '#101010',
      color: '#FFF',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    comment: { color: '#8b8b8b94', fontStyle: 'italic' },
    keyword: { color: '#A0A0A0' },
    selector: { color: '#C699FF' },
    punctuation: { color: '#A0A0A0' },
    string: { color: '#99FFE4' },
    number: { color: '#C699FF' },
    function: { color: '#C699FF' },
    className: { color: '#C699FF' },
    tag: { color: '#C699FF' },
    attrName: { color: '#C699FF' },
    attrValue: { color: '#99FFE4' },
    operator: { color: '#A0A0A0' },
    boolean: { color: '#C699FF' },
    builtin: { color: '#C699FF' },
    parameter: { color: '#FFF' },
    property: { color: '#FFF' },
    variable: { color: '#FFF' },
    regex: { color: '#A0A0A0' },
    deleted: { color: '#E580FF' },
    inserted: { color: '#99FFE4' },
    important: { color: '#FFF', fontWeight: 'bold' },
    plain: { color: '#FFF' },
    default: { color: '#FFF' },
    class: { color: '#C699FF' },
    constant: { color: '#C699FF' },
    type: { color: '#C699FF' },
    'template-string': { color: '#99FFE4' },
    'attr-value': { color: '#99FFE4' },
    'attr-name': { color: '#C699FF' },
    'class-name': { color: '#C699FF' },
    'function-name': { color: '#C699FF' },
    'tag-name': { color: '#C699FF' },
    'pseudo-class': { color: '#99FFE4' },
    'pseudo-element': { color: '#99FFE4' },
    'json-key': { color: '#C699FF' },
    invalid: { color: '#E580FF' },
    insert: { background: '#99FFE415' },
    delete: { background: '#E580FF15' }, 
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

  return (
    <div
      suppressHydrationWarning
      className="w-full min-w-0 border border-[#D1D1D1] dark:border-[#232323] flex flex-col mb-8 mt-4 rounded-md overflow-hidden transition-colors duration-200"
    >
      <div className="w-full flex items-center justify-between px-4 py-2.5 border-b border-[#D1D1D1] dark:border-[#232323] bg-[#EAEAEA] dark:bg-[#101010] transition-colors duration-200">
        <div className="flex items-center gap-2">
          {filename ? (
            <>
              <FileCode2 size={14} className="opacity-60 text-[#A0A0A0]" />
              <span className="font-mono text-xs font-medium text-zinc-700 dark:text-[#FFF]">
                {filename}
              </span>
            </>
          ) : (
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-70 text-zinc-700 dark:text-[#FFF]">
              {language}
            </span>
          )}
        </div>
        
        <button
          onClick={copyToClipboard}
          className="opacity-50 hover:text-indigo-600 dark:hover:text-[#C699FF] transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check size={15} className="text-emerald-600 dark:text-[#99FFE4]" />
          ) : (
            <Copy size={15} />
          )}
        </button>
      </div>

      <div className="w-full py-4 overflow-x-auto bg-[#F4F4F0] dark:bg-[#101010] transition-colors duration-200">
        {/* Render a height-preserving invisible block before hydration, overlaid with Skeleton lines, then swap to real highlighter */}
        {!mounted ? (
          <div className="relative w-full">
            <div 
              className="absolute inset-0 flex flex-col gap-[10.5px] pl-[13px] pr-[16px] pt-[2px] overflow-hidden pointer-events-none" 
              aria-hidden="true"
            >
              {Array.from({ length: Math.min(code.split('\n').length, 30) }).map((_, i) => {
                // cycle through varied widths to mock natural code lines
                const widths = ['w-3/4', 'w-1/2', 'w-5/6', 'w-2/3', 'w-1/3', 'w-4/5', 'w-[90%]', 'w-2/5', 'w-3/5', 'w-1/4'];
                return (
                  <Skeleton 
                    key={i} 
                    variant="text" 
                    className={`h-[14px] rounded-sm ${widths[i % widths.length]}`} 
                  />
                );
              })}
            </div>
            <pre className="m-0 p-0 text-[0.9rem] leading-[1.7] opacity-0" aria-hidden="true">
              <code>{code}</code>
            </pre>
          </div>
        ) : (
          <SyntaxHighlighter
            language={language}
            style={darkMode ? pitchBlackModernStyle : softLightModernStyle}
            wrapLines={true}
            lineProps={(lineNumber) => {
              const isHighlighted = highlightLines.includes(lineNumber);
              return {
                style: {
                  display: "block",
                  minWidth: "fit-content",
                  backgroundColor: isHighlighted 
                    ? (darkMode ? "rgba(198, 153, 255, 0.1)" : "rgba(111, 69, 214, 0.1)") 
                    : "transparent",
                  borderLeft: isHighlighted 
                    ? (darkMode ? "3px solid #C699FF" : "3px solid #6f45d6") 
                    : "3px solid transparent",
                  paddingLeft: "13px",
                  paddingRight: "16px",
                }
              };
            }}
            customStyle={{
              background: "transparent",
              padding: 0,
              margin: 0,
              fontSize: "0.9rem",
              lineHeight: "1.7",
              overflowX: "auto", 
            }}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}