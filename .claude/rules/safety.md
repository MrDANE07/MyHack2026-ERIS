# Safety Rules

> Always / Ask first / Never

## Absolute Rules

> NEVER run destructive commands without explicit user approval.

**NEVER** run these commands under ANY circumstance without explicit user approval:
- `rm -rf` on any path (including `rm -rf .`, `rm -rf /`, `rm -rf ~`)
- `git clean -f` or `git clean -fd`
- `git reset --hard` 
- `git checkout -- .` or `git checkout -- <file>`
- `git push --force` or `git push -f`
- `git branch -D` (force delete)
- `git stash drop` or `git stash clear`
- Any command with `sudo`
- Any command that modifies `.env` files
- Any command that deletes files outside the current workspace

> ALWAYS ask for approval before modifying `.env`, credentials, or configuration files.

> If uncertain about a command's safety, ASK FIRST before executing.