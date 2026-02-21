# ~/blog

<div align="center">

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ██████╗ ██╗      ██████╗  ██████╗                         │
│   ██╔══██╗██║     ██╔═══██╗██╔════╝                         │
│   ██████╔╝██║     ██║   ██║██║  ███╗                        │
│   ██╔══██╗██║     ██║   ██║██║   ██║                        │
│   ██████╔╝███████╗╚██████╔╝╚██████╔╝                        │
│   ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝                         │
│                                                              │
│   A terminal-themed personal blog built with Next.js        │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

[![CI/CD](https://github.com/WasathTheekshana/blog/actions/workflows/ci.yml/badge.svg)](https://github.com/WasathTheekshana/blog/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](https://blog.wasath.site) | [Report Bug](https://github.com/WasathTheekshana/blog/issues)

</div>

---

## Features

```bash
$ ls -la ./features
```

- **Terminal Aesthetic** - Dark/light theme with terminal-inspired UI
- **MDX Support** - Write blog posts in MDX with custom components
- **Syntax Highlighting** - Code blocks styled like terminal output
- **Responsive Design** - Works on all devices
- **SEO Optimized** - Meta tags and structured data
- **Fast Performance** - Static generation with Next.js
- **CI/CD Pipeline** - Automated testing and deployment

---

## Tech Stack

```bash
$ cat ./stack.json
```

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Content | MDX |
| Deployment | Vercel |
| CI/CD | GitHub Actions |

---

## Getting Started

### Prerequisites

```bash
$ node --version
v20.x.x

$ yarn --version
1.22.x
```

### Installation

```bash
# Clone the repository
$ git clone https://github.com/WasathTheekshana/blog.git

# Navigate to project directory
$ cd blog

# Install dependencies
$ yarn install

# Start development server
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

---

## Project Structure

```bash
$ tree -L 2
```

```
blog/
├── app/                    # Next.js app router pages
│   ├── about/              # About page
│   ├── blog/               # Blog listing & posts
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── blog/               # Blog-specific components
│   ├── layout/             # Header, Footer
│   └── ThemeProvider.tsx   # Dark/light theme
├── content/
│   └── posts/              # MDX blog posts
├── data/
│   └── aboutme.json        # Personal information
├── lib/                    # Utility functions
├── types/                  # TypeScript types
└── public/                 # Static assets
```

---

## Writing Blog Posts

Create a new `.mdx` file in `content/posts/`:

```bash
$ touch content/posts/my-new-post.mdx
```

Add frontmatter and content:

```mdx
---
title: "My New Post"
description: "A brief description"
date: "2024-02-21"
tags: ["devops", "terraform"]
published: true
author: "Wasath Theekshana"
---

Your content here...
```

---

## Customization

### Personal Information

Edit `data/aboutme.json` to update your profile:

```bash
$ vim data/aboutme.json
```

### Theme Colors

Modify CSS variables in `app/globals.css`:

```css
/* Dark theme */
[data-theme="dark"] {
  --terminal-green: #3fb950;
  --terminal-cyan: #58a6ff;
  /* ... */
}

/* Light theme */
[data-theme="light"] {
  --terminal-green: #1a7f37;
  --terminal-cyan: #0969da;
  /* ... */
}
```

---

## Available Scripts

```bash
$ yarn dev          # Start development server
$ yarn build        # Build for production
$ yarn start        # Start production server
$ yarn lint         # Run ESLint
$ yarn typecheck    # Run TypeScript checks
```

---

## Deployment

### Vercel (Recommended)

The project includes a CI/CD pipeline that automatically deploys to Vercel.

**Required Secrets:**

```bash
VERCEL_TOKEN       # Vercel API token
VERCEL_ORG_ID      # Organization ID
VERCEL_PROJECT_ID  # Project ID
```

Get these by running:

```bash
$ vercel link
$ cat .vercel/project.json
```

---

## License

```bash
$ cat LICENSE
```

MIT License - feel free to use this for your own blog!

---

<div align="center">

```
┌─────────────────────────────────────┐
│  Made with ♥ by Wasath Theekshana  │
│                                     │
│  $ echo "Happy coding!"            │
└─────────────────────────────────────┘
```

</div>
