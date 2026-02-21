# Contributing to ~/blog

First off, thanks for taking the time to contribute!

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Set up the development environment
4. Create a branch for your changes
5. Make your changes
6. Submit a pull request

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs what actually happened
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)

### Suggesting Features

Feature suggestions are welcome! Please include:

- **Clear description** of the feature
- **Use case** - why would this be useful?
- **Possible implementation** if you have ideas

### Pull Requests

We love pull requests! Here's how to contribute code:

1. Fork and clone the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests: `yarn lint && yarn typecheck && yarn build`
5. Commit with a clear message
6. Push and open a PR

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/blog.git
cd blog

# Install dependencies
yarn install

# Start development server
yarn dev

# Run checks before committing
yarn lint
yarn typecheck
yarn build
```

## Pull Request Process

1. **Update documentation** if needed
2. **Follow the style guide** below
3. **Ensure all checks pass** (lint, typecheck, build)
4. **Write a clear PR description** explaining your changes
5. **Link related issues** using keywords like "Fixes #123"

### PR Title Format

Use conventional commit format:

```
feat: add dark mode toggle
fix: resolve hydration error
docs: update README
style: format code
refactor: simplify theme provider
```

## Style Guide

### TypeScript

- Use TypeScript for all new files
- Define proper types, avoid `any`
- Use interfaces for object shapes

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types

### CSS

- Use Tailwind CSS utilities
- Follow the terminal theme aesthetic
- Use CSS variables for colors

### Git Commits

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Keep commits atomic and focused

### File Naming

- React components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- MDX posts: `kebab-case.mdx`

---

## Questions?

Feel free to open an issue or reach out. Happy coding!
