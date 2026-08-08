// src/data/cheatsheets.ts
import { Terminal, Database, Code2 } from "lucide-react";

export interface ContentItem {
  type: "paragraph" | "code" | "subsectionTitle";
  content: string; // The text or the code snippet itself
  label?: string; // Optional label for code cards, e.g., "INTRODUCTION"
  language?: string; // e.g., 'javascript', used for modern syntax highlighting (assumed plugin)
}

export interface Section {
  id: string; // Used as the anchor point for the right-side nav (e.g., #getting-started)
  title: string;
  items: ContentItem[];
}

export interface CheatsheetData {
  slug: string; // URL parameter
  title: string; // Main title (e.g., JavaScript)
  subtitle: string; // Secondary text (e.g., cheatsheet)
  description: string;
  sections: Section[];
}

// ----------------------------------------------------
// MANUAL USE DATABASE: ADD NEW CHEATSHEETS HERE
// ----------------------------------------------------
export const cheatsheetLibrary: Record<string, CheatsheetData> = {
  // Model based exactly on image_11.png layout
  javascript: {
    slug: "javascript",
    title: "JavaScript",
    subtitle: "cheatsheet",
    description:
      "A comprehensive guide to modern JavaScript patterns and syntax.",
    sections: [
      {
        id: "getting-started",
        title: "GETTING STARTED",
        items: [
          { type: "subsectionTitle", content: "OVERVIEW" },
          {
            type: "paragraph",
            content:
              "JavaScript is a lightweight, interpreted, object-oriented language with first-class functions, most well-known as the scripting language for Web pages.",
          },
          {
            type: "code",
            label: "INTRODUCTION",
            language: "javascript",
            content:
              "// JavaScript is a lightweight, interpreted lan\n// This line used to cause a scrollbar but now wraps professionally.",
          },
          {
            type: "code",
            label: "CONSOLE",
            language: "javascript",
            content: "console.log('Hello World!');\nconsole.warn('Warning');",
          },
        ],
      },
      {
        id: "variables",
        title: "VARIABLES",
        items: [
          {
            type: "code",
            label: "DECLARATION",
            language: "javascript",
            content: "let x = 10;\nconst y = 'RefMe';",
          },
          {
            type: "paragraph",
            content:
              "Use 'let' for reassignable variables, 'const' for constants, and avoid 'var' in modern development.",
          },
        ],
      },
      // Demonstrate scalability by adding another new section
      {
        id: "functions",
        title: "FUNCTIONS",
        items: [
          {
            type: "paragraph",
            content: "Functions are the basic building blocks in JS.",
          },
          {
            type: "code",
            label: "ARROW FUNCTION",
            language: "javascript",
            content:
              "const add = (a, b) => a + b;\nconsole.log(add(5, 3)); // Outputs 8",
          },
        ],
      },
    ],
  },

  // A second cheatsheet to demonstrate reuse of the dynamic template
  python: {
    slug: "python",
    title: "Python",
    subtitle: "reference",
    description: "Core syntax and common data structures for Python 3.x.",
    sections: [
      {
        id: "basics",
        title: "BASICS",
        items: [
          { type: "subsectionTitle", content: "PRINTING" },
          {
            type: "code",
            label: "HELLO WORLD",
            language: "python",
            content: "print('Hello, RefMe Engineers')",
          },
        ],
      },
    ],
  },
};
