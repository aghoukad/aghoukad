# CLAUDE.md

This file provides context for AI assistants working with this repository.

## Repository Overview

This is a **GitHub profile repository** for Saif-Eddine Aghoukad (`aghoukad/aghoukad`). It contains a single `README.md` that serves as a GitHub profile page, displaying a professional introduction, skills, and contact information. It is not an application codebase.

## Repository Structure

```
.
├── CLAUDE.md       # AI assistant guidance (this file)
└── README.md       # GitHub profile page content
```

## What This Repository Does

The `README.md` is rendered on the owner's GitHub profile at `github.com/aghoukad`. It showcases:

- Professional bio (Full Stack Web Developer, MERN stack focus)
- Social/contact links (LinkedIn, Twitter, personal website, email)
- Technical skills organized by category (Frontend, Backend, Tools)

Skills are displayed using `shields.io` badge images.

## Technology Context

While this repo has no code, the developer's advertised stack is:

- **Frontend:** React, JavaScript, HTML5, CSS3
- **Backend:** Node.js, Express.js, NestJS, MongoDB, SQL/PostgreSQL
- **Tools:** Git, Docker, VS Code
- **Currently learning:** Advanced TypeScript, AWS

## Build / Test / Lint

There is no build system, test suite, or linting configuration. This repo contains only Markdown.

## Conventions

- The README uses GitHub-flavored Markdown with shield.io badge syntax for visual skill tags.
- Badge format: `![Label](https://img.shields.io/badge/-Label-HexColor?logo=name&logoColor=white&style=flat-square)`
- Links use standard Markdown link syntax with optional badge images.
- Skills are grouped under `**Frontend**`, `**Backend**`, and `**Tools**` subheadings.

## Git Workflow

- **Default branch:** `main`
- The repository has minimal commit history (initial commit + README update).
- No CI/CD, GitHub Actions, branch protection rules, or PR workflows are configured.

## Making Changes

When modifying this repository:

1. Edits will almost always be to `README.md`.
2. Keep the existing section structure (About Me, Connect with Me, Skills).
3. Use the same `shields.io` badge pattern when adding new skills.
4. Verify badge URLs render correctly (logo names must match https://simpleicons.org/).
5. No build step is required -- changes are visible once pushed.
