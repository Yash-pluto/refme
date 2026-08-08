// src/lib/mdx.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type DocHeading = {
  id: string;
  title: string;
  depth: number;
};

// This safely resolves the 'content' directory at the root of your Next.js app
const contentDir = path.join(process.cwd(), "content");

export function extractHeadings(content: string): DocHeading[] {
  return content
    .split("\n")
    .reduce<DocHeading[]>((acc, line) => {
      const match = line.match(/^(##|###)\s+(.+)$/);

      if (!match) return acc;

      const depth = match[1].length === 2 ? 2 : 3;
      const title = match[2]
        .trim()
        .replace(/[*_`>#]/g, "")
        .replace(/\s+/g, " ");
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      if (!id) return acc;

      acc.push({ id, title, depth });
      return acc;
    }, []);
}

export function getTopicBySlug(slug: string) {
  const fullPath = path.join(contentDir, `${slug}.mdx`);

  // If the file doesn't exist, return null (this triggers the 404)
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { frontmatter: data, content, headings: extractHeadings(content) };
}

export function getAllTopics() {
  if (!fs.existsSync(contentDir)) return [];

  const fileNames = fs.readdirSync(contentDir);
  const topics = fileNames
    .filter((fileName) => fileName.endsWith(".mdx")) // Only get MDX files
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(contentDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContents);

      return {
        id,
        ...data,
      };
    });

  return topics;
}
