# ERIS — Claude Code Instructions

## Architecture
- frontend/ → Next.js 14, port 3000
- backend → Express.js 4, port 3001
- Frontend talks to backend ONLY via frontend/lib/api.ts
- Firebase + Gemini live in backend ONLY, never frontend

## Aesthetic & Design System
**Theme:** Dark editorial — deep navy backgrounds (#0a0f1a) with warm gold accents (#fbbf24)
**Typography:** Playfair Display (headings), Inter (body), JetBrains Mono (data/code)
**Visual Language:** Subtle grid background pattern, glow effects, animated signal indicators
**Signal Colors:** Clarity-green (#10b981), Uncertainty-red (#f43f5e), Engagement-blue (#3b82f6)
**Components:** Cards with hover lift and gold gradient top border, pulsing live status badges

## Non-negotiables
- No inline styles. TailwindCSS only.
- No `any` types.
- All API responses: { success: true/false, data/error }
- All 7 signals must be extracted: clarity, uncertainty, engagement,
  friction_level, expectation_mismatch, alignment_speed, ambiguity_tolerance
- isValidSignals() must validate all 7 before any Firestore write

## Agents
- frontend agent → frontend/ work
- backend agent → backend/ work
- debugger agent → broken things, spans both sides