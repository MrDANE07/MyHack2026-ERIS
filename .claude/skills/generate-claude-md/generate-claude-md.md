---
name: generate-claude-md
description: Generate a standard CLAUDE.md file with project rules and structure
---

# Generate CLAUDE.md

## Trigger
When user says: "Generate CLAUDE.md" or "Create standard CLAUDE.md"

## What to Do

Create a file called `CLAUDE.md` in the project root with this standard template:

```markdown
# Project Guide

## Safety Rules (CRITICAL)
- NEVER delete or modify .env files
- NEVER run git clean or git reset --hard
- NEVER run rm -rf without explicit approval
- ALWAYS ask before modifying package.json or requirements files

## Project Structure
[Run: tree -L 2 -I 'node_modules|__pycache__|.git' and paste output here]

## Key Commands
[Detect package.json: list npm scripts]
[Detect Makefile: list common targets]
[Detect Python: list common commands like pytest, uvicorn]

## Environment Variables
[List variables from .env.example or .env if they exist]

## AI Behavior
- Load safety rules from this file
- Use auto-mode for approved operations
- Ask before destructive commands