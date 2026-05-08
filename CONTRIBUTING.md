# Contributing to NexusVision

First off, thank you for considering contributing to NexusVision! It's people like you that make NexusVision such a great tool.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inclusive environment. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/nexus-vision-dashboard.git
   cd nexus-vision-dashboard
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/imadnidalhawara/nexus-vision-dashboard.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```

## 💡 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots)
- **Describe the behavior you observed and expected**
- **Include your environment details** (OS, browser, Node.js version)

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **Include mockups or examples** if applicable

### 🔧 Pull Requests

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** following our style guidelines
3. **Test your changes** thoroughly
4. **Commit your changes** using conventional commit messages
5. **Push to your fork** and submit a pull request

## 🛠️ Development Setup

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build
```

### Project Structure

```
nexus-vision-dashboard/
├── app/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript definitions
│   ├── utils/          # Utility functions
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── public/             # Static assets
└── ...config files
```

## 📝 Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Define explicit types for function parameters and return values
- Use interfaces for object shapes
- Avoid `any` type - use `unknown` if type is truly unknown

```typescript
// ✅ Good
interface DetectionBox {
  id: string;
  type: 'person' | 'vehicle' | 'package';
  confidence: number;
}

function processDetection(box: DetectionBox): string {
  return `${box.type}: ${box.confidence}%`;
}

// ❌ Bad
function processDetection(box: any) {
  return box.type + ': ' + box.confidence + '%';
}
```

### React Components

- Use functional components with hooks
- Use `'use client'` directive only when necessary
- Extract complex logic into custom hooks
- Keep components focused and single-purpose

```typescript
// ✅ Good
'use client';

import { useState, useCallback } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'}
    >
      {label}
    </button>
  );
}
```

### CSS / Tailwind

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use CSS custom properties for theme values
- Keep class lists readable with logical grouping

```tsx
// ✅ Good - Grouped logically
<div className="
  flex items-center justify-between
  p-4 m-2
  bg-slate-900 border border-slate-700 rounded-xl
  hover:bg-slate-800 transition-colors
">

// ❌ Bad - Random order, hard to read
<div className="p-4 flex bg-slate-900 m-2 items-center border rounded-xl justify-between hover:bg-slate-800 border-slate-700 transition-colors">
```

## 📝 Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Examples

```bash
feat(detection): add face recognition support
fix(camera): resolve memory leak in live feed
docs(readme): update installation instructions
style(components): format code with prettier
refactor(hooks): extract detection logic to custom hook
```

## 🔄 Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Add tests** for new features when applicable
3. **Ensure all tests pass** and there are no linting errors
4. **Update the README.md** if needed
5. **Request review** from at least one maintainer
6. **Address review feedback** promptly

### PR Title Format

Follow the same format as commit messages:
```
feat(component): add new detection visualization
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe your testing process

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
```

## 🎉 Recognition

Contributors will be recognized in our README and release notes. Thank you for helping make NexusVision better!

---

Questions? Feel free to open an issue or reach out to the maintainers.