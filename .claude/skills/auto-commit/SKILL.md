---
name: auto-commit
description: "Auto-generate and execute conventional commits. Analyzes changed files, infers scope and type, stages unstaged changes, commits without confirmation. Blocks commits on main/master branches."
---

# Auto-Commit Skill

Automatically analyzes repository changes, generates a conventional commit message, stages any unstaged files, and commits — all without asking for confirmation.

## Trigger

When the user runs `/auto-commit`.

## Execution Steps

Follow these steps **in order**. Do NOT ask the user for confirmation at any point.

### Step 1: Branch Guard

Run `git branch --show-current`. If the result is `main` or `master`:
- **STOP immediately.**
- Output: `⛔ Blocked: you are on the **main** branch. Create a feature branch first.`
- Do **not** proceed to any further step.

### Step 2: Detect Changes

Run the following in parallel:
- `git status --porcelain`
- `git diff --cached --stat`
- `git diff --stat`

If `git status --porcelain` returns empty output:
- Output: `Repo clean. Nothing to commit.`
- Do **not** proceed to any further step.

### Step 3: Auto-Stage

If there are any unstaged changes (lines in `git diff --stat` output, or status lines starting with ` M`, `??`, ` D`, etc.), run:
```
git add .
```
Do this silently — do not announce it or ask permission.

### Step 4: Analyze Changes & Generate Commit Message

Run these in parallel:
- `git diff --cached --stat` — to see what was staged
- `git diff --cached` — to see the actual diff content

Based on the diff analysis, determine:

**Type** (pick exactly one):
| Type | When to use |
|------|-------------|
| `feat` | New feature or significant new functionality |
| `fix` | Bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, whitespace, semicolons — no logic change |
| `refactor` | Code restructuring without behavior change |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build, tooling, dependencies, CI — no production code change |

**Scope** (determine from file paths):
- If changed files are under `backend/agents/`, derive scope from the agent filename:
  - `finance_agent.py` → scope is `finance-agent`
  - `marketplace_agent.py` → scope is `marketplace-agent`
  - Pattern: strip `_agent.py`, replace underscores with hyphens
- If changed files span multiple distinct areas, use the **most significant** area as scope
- If changed files are all under `frontend/`, scope is `frontend`
- If changed files are all under `backend/` (but not a specific agent), scope is `backend`
- If no clear scope, omit the scope parentheses entirely

**Subject**:
- Lowercase
- Imperative mood ("add", "fix", "update", "remove" — not "added", "fixes", "updated")
- No period at the end
- Concise — under 72 characters for the full first line

**Format**:
```
<type>(<scope>): <subject>
```

If no scope applies:
```
<type>: <subject>
```

### Step 5: Execute Commit

Run the commit using a HEREDOC for the message:
```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

Do NOT ask for Y/N confirmation. Execute immediately.

### Step 6: Report Result

After the commit succeeds, run:
- `git log -1 --oneline`

Then output a summary in this exact format:

```
✅ Committed: <type>(<scope>): <subject>
   Hash: <short-hash>
```

If the commit fails (e.g., pre-commit hook rejection), report the error and do NOT retry with `--no-verify`.

## Rules

1. **Never ask for confirmation** — this skill is designed for speed and automation.
2. **Never skip hooks** — if a hook fails, report the error and stop.
3. **Never commit on main/master** — the branch guard exists for a reason.
4. **Never use `--amend`** — always create a new commit.
5. **Subject must be lowercase, imperative mood, no trailing period.**
6. **Scope for agents** is always the agent name with hyphens, not underscores.
7. **If repo is clean**, just say `Repo clean. Nothing to commit.` and stop.
