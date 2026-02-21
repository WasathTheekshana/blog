# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of ~/blog
- Terminal-themed dark/light mode
- MDX blog post support
- About page with dynamic data
- CI/CD pipeline with GitHub Actions
- Vercel deployment integration
- Responsive design

### Technical
- Next.js 16 with App Router
- TypeScript 5
- Tailwind CSS 4
- ESLint configuration

---

## How to Update This Changelog

When making changes, add entries under `[Unreleased]` in these categories:

- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Vulnerability fixes

When releasing a new version:

1. Replace `[Unreleased]` with the version number and date
2. Add a new `[Unreleased]` section at the top
3. Update version in `package.json`
4. Create a git tag
