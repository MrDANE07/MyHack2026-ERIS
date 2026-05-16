# ERIS — MASTER ENGINEERING SPECIFICATION

# 🎯 PURPOSE OF THIS DOCUMENT

This document is the COMPLETE engineering specification for the ERIS Hackathon MVP.

This document is designed specifically for:
- AI coding agents,
- autonomous scaffolding systems,
- Cursor,
- Claude Code,
- GPT agents,
- and fullstack implementation pipelines.

The objective of this document is to:
- remove ambiguity,
- define exact contracts,
- define exact architecture,
- define exact runtime flows,
- and explicitly separate REAL systems from MOCKED systems.

This is NOT merely a product description.

This is an AI-operable engineering blueprint.

---

# 🧠 CORE PRODUCT CONCEPT

ERIS is an AI-powered Ecosystem Relationship Intelligence System.

The core innovation is:

# "Relationships are treated as first-class intelligence entities"

The system does NOT treat:
- users,
- startups,
- mentors

as the primary intelligence objects.

Instead:
- the RELATIONSHIP itself stores:
  - compatibility data,
  - interaction history,
  - extracted AI signals,
  - lifecycle progression,
  - relationship intelligence summaries.

The MVP ONLY supports:

# Startup ↔ Mentor relationships

The broader ecosystem vision is ONLY for:
- scalability discussion,
- pitch deck expansion,
- future roadmap.

---

# 🚀 MVP DEMO FLOW

```text
1. Open Dashboard
2. View Startup Context
3. Generate Mentor Matches
4. View Match Recommendations
5. Create Relationship Entity
6. Open Relationship Dashboard
7. Submit Interaction Summary
8. Gemini Extracts Signals
9. Dashboard Updates Dynamically
10. Lifecycle Status Changes
```

---

# 🟦 SECTION 1 — SYSTEM TOPOLOGY & TECH STACK

# FRONTEND

Framework:
- Next.js 14 App Router
- TypeScript

Styling:
- TailwindCSS
- shadcn/ui

Charts:
- Recharts

State Management:
- React useState/useEffect ONLY

DO NOT USE:
- Redux
- Zustand
- MobX

---

# BACKEND

Backend Framework:
- Next.js API Routes

Runtime:
- Node.js

AI:
- Gemini 1.5 Flash API

Database:
- Firebase Firestore

Authentication:
- NONE

IMPORTANT:
Authentication is intentionally omitted for hackathon speed.

---

# STORAGE ARCHITECTURE

# STATIC SYNTHETIC DATA

Stored inside:

```text
lib/fakeData.ts
```

Purpose:
- ecosystem simulation
- seeded historical data
- seeded graph history
- synthetic startup + mentor entities

This data is:
- preloaded
- static
- immutable during runtime

---

# RUNTIME STATE DATA

Stored inside:
- Firebase Firestore

Purpose:
- relationship entities
- interaction submissions
- Gemini outputs
- lifecycle state
- runtime dashboard updates

---

# 🟩 SECTION 2 — ENVIRONMENT VARIABLES

# REQUIRED .env.local

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

GEMINI_API_KEY=
```

---

# VARIABLE PURPOSES

| Variable | Purpose |
|---|---|
| NEXT_PUBLIC_FIREBASE_API_KEY | Firebase frontend initialization |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | Firebase project auth domain |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID | Firestore project ID |
| NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | Firebase storage bucket |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | Firebase messaging |
| NEXT_PUBLIC_FIREBASE_APP_ID | Firebase app initialization |
| GEMINI_API_KEY | Gemini API requests |

---

# 🟨 SECTION 3 — PROJECT FOLDER STRUCTURE

```text
app/
│
├── dashboard/
│   └── page.tsx
│
├── matching/
│   └── page.tsx
│
├── relationship/
│   └── [id]/
│       └── page.tsx
│
├── api/
│   ├── match/
│   │   └── route.ts
│   │
│   ├── extract-signals/
│   │   └── route.ts
│   │
│   └── create-relationship/
│       └── route.ts
│
components/
│
├── StartupCard.tsx
├── MentorCard.tsx
├── MatchResultCard.tsx
├── SignalChart.tsx
├── RelationshipOverview.tsx
├── InteractionForm.tsx
├── LifecycleDropdown.tsx
├── EcosystemInsights.tsx
└── RelationshipSummaryCard.tsx

lib/
│
├── fakeData.ts
├── scoring.ts
├── gemini.ts
├── prompts.ts
├── firebase.ts
├── explanations.ts
└── types.ts
```

---

# 🟥 SECTION 4 — DATABASE CONTRACTS

# FIRESTORE COLLECTION: relationships

# TYPESCRIPT INTERFACE

```ts
export interface Relationship {
  relationship_id: string
  startup_id: string
  mentor_id: string
  compatibility_score: number
  status: "Created" | "Active" | "Completed" | "Failed"
  created_at: string
}
```

---

# MOCK DATA

```json
{
  "relationship_id": "REL-001",
  "startup_id": "startup_1",
  "mentor_id": "mentor_1",
  "compatibility_score": 87,
  "status": "Created",
  "created_at": "2026-05-16T10:00:00Z"
}
```

---

# FIRESTORE COLLECTION: interactions

# TYPESCRIPT INTERFACE

```ts
export interface Interaction {
  interaction_id: string
  relationship_id: string
  summary: string
  clarity: number
  uncertainty: number
  engagement: number
  created_at: string
}
```

---

# MOCK DATA

```json
{
  "interaction_id": "INT-001",
  "relationship_id": "REL-001",
  "summary": "We discussed fundraising strategy.",
  "clarity": 7,
  "uncertainty": 6,
  "engagement": 8,
  "created_at": "2026-05-16T11:00:00Z"
}
```

---

# 🟪 SECTION 5 — STATIC SYNTHETIC DATA

# FILE: lib/fakeData.ts

This file stores:
- synthetic startup entities
- synthetic mentor entities
- seeded historical relationship data
- seeded ecosystem insights

---

# STARTUP DATA

```ts
export const startups = [
  {
    id: "startup_1",
    name: "NeuroFlow AI",
    domain: ["AI", "Healthcare"],
    stage: 2,
    needs: ["Fundraising", "B2B Sales"],
    goals: ["Product-Market Fit"]
  }
]
```

---

# MENTOR DATA

```ts
export const mentors = [
  {
    id: "mentor_1",
    name: "Sarah Lim",
    expertise: ["Fundraising", "Enterprise Sales"],
    preferred_stage: 2,
    availability: "Weekly"
  }
]
```

---

# SEEDED RELATIONSHIP HISTORY

```ts
export const seededRelationshipHistory = [
  {
    week: 1,
    clarity: 3,
    uncertainty: 9,
    engagement: 5
  },
  {
    week: 2,
    clarity: 5,
    uncertainty: 7,
    engagement: 6
  }
]
```

IMPORTANT:
This graph history is intentionally SEEDED.

DO NOT build:
- analytics pipelines
- event sourcing
- time-series infrastructure

---

# 🟦 SECTION 6 — API CONTRACTS

# ENDPOINT: POST /api/match

# PURPOSE

Generate compatibility scores.

---

# REQUEST

```json
{
  "startup_id": "startup_1"
}
```

---

# RESPONSE SUCCESS

```json
{
  "success": true,
  "matches": [
    {
      "mentor_id": "mentor_1",
      "compatibility_score": 87,
      "explanation": "Strong match due to aligned fundraising goals."
    }
  ]
}
```

---

# RESPONSE ERROR

```json
{
  "success": false,
  "error": "Failed to generate matches"
}
```

---

# ENDPOINT: POST /api/create-relationship

# REQUEST

```json
{
  "startup_id": "startup_1",
  "mentor_id": "mentor_1",
  "compatibility_score": 87
}
```

---

# RESPONSE SUCCESS

```json
{
  "success": true,
  "relationship_id": "REL-001"
}
```

---

# ENDPOINT: POST /api/extract-signals

# PURPOSE

Send interaction summary to Gemini.

---

# REQUEST

```json
{
  "relationship_id": "REL-001",
  "summary": "We discussed narrowing target customers and clarified fundraising priorities."
}
```

---

# RESPONSE SUCCESS

```json
{
  "success": true,
  "signals": {
    "clarity": 8,
    "uncertainty": 4,
    "engagement": 8
  },
  "relationship_summary": "Relationship currently demonstrates improving clarity with sustained engagement."
}
```

---

# RESPONSE ERROR

```json
{
  "success": false,
  "error": "Gemini extraction failed"
}
```

---

# 🟩 SECTION 7 — UI ROUTING MATRIX

| Route | Page Purpose | Trigger |
|---|---|---|
| /dashboard | Startup overview | App opens |
| /matching | Match results | Click Generate Matches |
| /relationship/[id] | Relationship intelligence dashboard | Click Create Relationship |

---

# 🟨 SECTION 8 — UI COMPONENT CONTRACTS

# COMPONENT: MatchResultCard

# REQUIRED PROPS

```ts
{
  mentorName: string
  compatibilityScore: number
  explanation: string
  onCreateRelationship: () => void
}
```

---

# COMPONENT: SignalChart

# REQUIRED PROPS

```ts
{
  graphData: {
    week: number
    clarity: number
    uncertainty: number
    engagement: number
  }[]
}
```

---

# COMPONENT: RelationshipSummaryCard

# REQUIRED PROPS

```ts
{
  summary: string
}
```

---

# 🟥 SECTION 9 — BUSINESS LOGIC FLOWS

# FLOW 1 — MATCH GENERATION

```text
1. User clicks Generate Matches
2. Frontend calls POST /api/match
3. Backend loads startup from fakeData.ts
4. Backend compares mentor profiles
5. scoring.ts calculates compatibility
6. explanations.ts generates explanation summary
7. Frontend renders match cards
```

---

# FLOW 2 — RELATIONSHIP CREATION

```text
1. User clicks Create Relationship
2. Frontend calls POST /api/create-relationship
3. Backend creates Firestore relationship document
4. Relationship ID returned
5. Frontend redirects to /relationship/[id]
```

---

# FLOW 3 — SIGNAL EXTRACTION

```text
1. User submits interaction summary
2. Frontend calls POST /api/extract-signals
3. Backend sends summary to Gemini
4. Gemini returns STRICT JSON
5. Backend validates JSON schema
6. Backend stores interaction in Firestore
7. Frontend appends new graph datapoint
8. Dashboard rerenders dynamically
9. Relationship summary updates
```

---

# 🟪 SECTION 10 — STATE MACHINES

# RELATIONSHIP LIFECYCLE

```text
Created
↓
Active
↓
Completed

OR

Created
↓
Active
↓
Failed
```

---

# STATE TRANSITIONS

| Current State | Allowed Next State |
|---|---|
| Created | Active |
| Active | Completed |
| Active | Failed |

---

# UI IMPLEMENTATION

Lifecycle state changes are:
- manual
- dropdown-based

NO automation required.

---

# 🟦 SECTION 11 — EXPLANATION SYSTEMS

# MATCH EXPLANATION

Generated using:
- compatibility score breakdown
- mentor expertise overlap
- startup needs

Example:

```text
Strong match due to aligned fundraising goals and compatible startup stage.
```

---

# RELATIONSHIP SUMMARY

Generated using:
- Gemini signals
- trend comparisons
- lightweight conditional logic

Example:

```text
Relationship currently demonstrates improving clarity with sustained engagement.
```

---

# 🟩 SECTION 12 — DYNAMIC DASHBOARD LOGIC

# IMPORTANT CONCEPT

The dashboard MUST visually appear:
- evolving
- adaptive
- intelligent

This is accomplished using:
- seeded graph history
- new Gemini datapoints

---

# IMPLEMENTATION FLOW

```text
1. Load seededRelationshipHistory
2. Store graphData in frontend state
3. Gemini returns new signals
4. Append new datapoint to graphData
5. Recharts rerenders automatically
```

---

# EXAMPLE GRAPH UPDATE

BEFORE:

| Week | Clarity | Uncertainty | Engagement |
|---|---|---|---|
| 1 | 3 | 9 | 5 |
| 2 | 5 | 7 | 6 |

AFTER GEMINI EXTRACTION:

| Week | Clarity | Uncertainty | Engagement |
|---|---|---|---|
| 1 | 3 | 9 | 5 |
| 2 | 5 | 7 | 6 |
| 3 | 8 | 4 | 8 |

This creates the illusion of:
- evolving relationship intelligence.

---

# 🟨 SECTION 13 — MOCKED VS REAL SYSTEMS

# MUST BE REAL

✅ compatibility scoring
✅ Gemini extraction
✅ Firestore relationship creation
✅ interaction submission
✅ graph updates
✅ explanation summaries
✅ lifecycle state changes

---

# MUST BE MOCKED / SEEDED

🟨 historical graphs
🟨 ecosystem insights
🟨 previous relationship history
🟨 outlier examples
🟨 ecosystem observations

---

# MUST NOT BE BUILT

❌ machine learning pipelines
❌ vector databases
❌ graph databases
❌ websocket infrastructure
❌ enterprise auth
❌ autonomous learning systems
❌ probabilistic recommendation systems
❌ real-time communication systems
❌ microservices

---

# 🟥 SECTION 14 — CODE STANDARDS & GUARDRAILS

# FRONTEND RULES

- Use TailwindCSS ONLY
- No inline styles
- Use functional React components ONLY
- Use async/await ONLY
- No .then() promise chains

---

# BACKEND RULES

All API responses MUST follow:

# SUCCESS

```json
{
  "success": true,
  "data": {}
}
```

# ERROR

```json
{
  "success": false,
  "error": "Error message"
}
```

---

# GEMINI RULES

Gemini MUST:
- output strict JSON
- never output markdown
- never output commentary
- never output nested explanations

---

# 🟪 SECTION 15 — DEFINITION OF DONE (DoD)

A successful MVP implementation means:

✅ User opens dashboard
✅ User sees startup context
✅ User clicks Generate Matches
✅ Match cards render dynamically
✅ User creates relationship
✅ Relationship saved to Firestore
✅ Relationship dashboard opens
✅ User submits interaction summary
✅ Gemini extracts structured signals
✅ Graph updates dynamically
✅ Relationship summary updates
✅ Lifecycle state changes successfully

---

# 🚀 FINAL IMPLEMENTATION PHILOSOPHY

The app should feel:

# "Convincingly Intelligent"

NOT:

# "Technically Overbuilt"

The priorities are:

1. coherent workflow
2. polished UI
3. believable intelligence
4. relationship-centric architecture
5. implementation simplicity

The objective is:
- clarity
- polish
- explainability
- memorable demo flow

NOT backend complexity.
