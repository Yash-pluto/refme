# Contributing MDX Content

Welcome to RefMe! This guide explains how to write and structure MDX files for the project. Whether you're adding a new cheatsheet or improving existing content, these guidelines will help you maintain consistency across the project.

## Table of Contents

- [What is MDX?](#what-is-mdx)
- [File Structure](#file-structure)
- [Frontmatter](#frontmatter)
- [Content Structure](#content-structure)
- [Writing Guidelines](#writing-guidelines)
- [Code Examples](#code-examples)
- [Quick Checklist](#quick-checklist)

---

## What is MDX?

MDX is Markdown with JSX. It allows you to use Markdown syntax for text content while embedding code and dynamic components. For RefMe, we use MDX to create rich, interactive cheatsheets.

**Learn more:** [MDX Documentation](https://mdxjs.com/)

---

## File Structure

### Location

All MDX content files are stored in the `content/` directory at the root of the `frontend` folder:

```
frontend/
├── content/
│   ├── javascript.mdx
│   ├── python.mdx          (example - add similar files)
│   └── typescript.mdx      (example)
├── app/
├── src/
└── ...
```

### Naming Convention

- **File names** should be lowercase and kebab-case (hyphen-separated)
- **File extension** must be `.mdx`
- Examples: `javascript.mdx`, `html-css.mdx`, `react-hooks.mdx`

---

## Frontmatter

Every MDX file must start with YAML frontmatter enclosed in triple dashes (`---`). This metadata is parsed by `gray-matter` and used throughout the application.

### Required Fields

```yaml
---
title: "Language or Technology Name"
description: "A brief, engaging description of the content. This appears in listings and SEO."
category: "Category Name (e.g., 'Core Programming', 'Web Development', 'Frameworks')"
---
```

### Example

```yaml
---
title: "JavaScript"
description: "The universal language of the web. Core syntax, ES6+ features, and modern asynchronous patterns."
category: "Core Programming"
---
```

### Field Guidelines

| Field         | Purpose                                          | Example                                                         |
| ------------- | ------------------------------------------------ | --------------------------------------------------------------- |
| `title`       | The main subject of the cheatsheet               | `"React Hooks"`                                                 |
| `description` | Concise explanation; appears in previews and SEO | `"Modern patterns for functional React components with hooks."` |
| `category`    | Broad topic area for organization                | `"Frameworks"`, `"Core Programming"`, `"DevOps"`                |

---

## Content Structure

After the frontmatter, organize your content into logical sections using Markdown headers.

### Recommended Structure

````markdown
---
title: "Your Topic"
description: "Your description"
category: "Category"
---

## Getting Started

Introduction section explaining the basics and key concepts.

### Subsection Title

More detailed information about a specific aspect.

`code block`

## Core Concepts

Another main section covering fundamental ideas.

## Advanced Topics

More complex patterns and edge cases.

---

## Best Practices

Tips, warnings, and common pitfalls.
````

### Section Levels

- **Level 2 (`##`)** - Main sections (e.g., "Getting Started", "Core Concepts")
- **Level 3 (`###`)** - Subsections for breaking up large topics
- **Avoid Level 1 (`#`)** - Reserved for page titles (not needed in MDX, the title is from frontmatter)

---

## Writing Guidelines

### Tone

- **Clear and concise** - Use simple language; avoid unnecessary jargon
- **Practical** - Focus on real-world usage patterns
- **Supportive** - Remember that readers may be beginners
- **Consistent** - Match the style of existing cheatsheets like `javascript.mdx`

### Formatting

- Use **bold** (`**text**`) for key terms and important concepts
- Use `inline code` for function names, variables, and keywords
- Use bullet points (`-`) for lists of related items
- Use numbered lists (`1.`) for steps or sequences

### Example

```markdown
## Variables & Declarations

Modern JavaScript relies strictly on **block-scoped declarations** to prevent
memory leaks and unintended global mutations.

- `const` prevents reassignment (use by default)
- `let` allows reassignment but maintains block scope
- `var` is function-scoped (legacy, avoid in modern code)
```

---

## Code Examples

Code examples are essential to a good cheatsheet. Use fenced code blocks with language syntax highlighting.

### Syntax

````markdown
```language
code here
```
````

### Supported Languages

- `javascript` or `js`
- `typescript` or `ts`
- `python`
- `html`
- `css`
- `sql`
- `bash` or `shell`
- `json`
- `jsx`
- `tsx`
- And many more...

### Example

````markdown
### Arrow Functions

Arrow functions provide concise syntax and inherit `this` from the enclosing scope.

```javascript
// Standard function declaration
function add(a, b) {
  return a + b;
}

// Arrow function with implicit return
const multiply = (a, b) => a * b;

// Single parameter (parentheses optional)
const square = (x) => x * x;
```
````

### Best Practices for Code

- **Realistic examples** - Show actual use cases, not contrived scenarios
- **Brevity** - Keep examples focused; use comments to explain context
- **Progressive complexity** - Start simple, then show advanced patterns
- **Consistency** - Match the style and conventions of your language/framework
- **Comments** - Add comments for non-obvious lines:

  ```javascript
  // ✅ Good: Explains WHY, not what
  const timeout = 0 ?? 3000; // Nullish coalescing prevents 0 from being falsy

  // ❌ Avoid: Obvious comments waste space
  const timeout = 0 ?? 3000; // Set timeout to 3000 if 0
  ```

---

## Quick Checklist

Before submitting your MDX file:

- [ ] File is in `content/` directory with `.mdx` extension
- [ ] File name is lowercase and kebab-case (e.g., `my-topic.mdx`)
- [ ] Frontmatter is present and valid (title, description, category)
- [ ] Frontmatter fields are not empty
- [ ] All code examples have a language specified
- [ ] Content uses level 2 (`##`) headers for main sections
- [ ] Content is clear, concise, and practical
- [ ] Grammar and spelling are correct
- [ ] Links (if any) use proper Markdown syntax: `[text](url)`
- [ ] No broken references or incomplete sections

---

## Example: Complete MDX File

Here's a minimal but complete example to get started:

````yaml
---
title: "Markdown"
description: "Syntax for writing formatted text. Essential for documentation and README files."
category: "Writing & Documentation"
---

## Getting Started

Markdown is a lightweight markup language designed for readability and simplicity.

```markdown
# This is a heading
## This is a subheading

This is a paragraph with **bold** and *italic* text.

- Bullet point 1
- Bullet point 2
````

## Headers

Headers are denoted by `#` symbols. More `#` symbols create deeper nesting.

```markdown
# Level 1

## Level 2

### Level 3

#### Level 4
```

## Emphasis

Use asterisks or underscores to make text **bold** or _italic_.

```markdown
**bold text** or **bold text**
_italic text_ or _italic text_
```

## Lists

Both ordered and unordered lists are supported.

```markdown
- Unordered item 1
- Unordered item 2
  - Nested item

1. Ordered item 1
2. Ordered item 2
```

```

---

## Need Help?

- Review [javascript.mdx](./content/javascript.mdx) for a real-world example
- Check the [MDX documentation](https://mdxjs.com/)
- Look at existing content for style and structure patterns
- Open an issue or discussion if you have questions!

---

## Contributing a New Cheatsheet

1. Create a new `.mdx` file in the `content/` directory
2. Add frontmatter with title, description, and category
3. Write clear, practical sections with code examples
4. Use this guide for formatting and structure
5. Test locally if possible (see [frontend README](./README.md))
6. Submit a pull request with a descriptive title and message

Thank you for contributing to RefMe! 🚀
```
