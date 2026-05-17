# ERIS — MASTER ENGINEERING SPECIFICATION v3
### MyHack 2026 | Build With AI 2026 KL | 16–17 May 2026
> **v3 Changelog:** Project restructured into separate `frontend/` and `backend/` folders. Backend framework changed from Next.js API Routes → Express.js 4.x. Environment variables split into `frontend/.env.local` and `backend/.env`. API base URL updated from `/api/*` → `http://localhost:3001/api/*`. Root-level files (README, JUSTIFICATION, .gitignore, .env.example) remain at project root. All other sections (schemas, components, business logic, ethical AI, DoD) unchanged from v2.

---

## TABLE OF CONTENTS

1. System Topology & Tech Stack Definitions
2. Definitive Database Schemas
3. OpenAPI / Swagger Specifications
4. UI/UX Navigation Matrix & Component System
5. End-to-End Business Logic & State Machines
6. Ethical AI, Guardrails & Coding Standards
7. Verification & Definition of Done (DoD)
8. README Template
9. JUSTIFICATION.md Template

---

# SECTION 1 — SYSTEM TOPOLOGY & TECH STACK DEFINITIONS

## 1.1 Version-Controlled Tech Stack

| Layer | Technology | Explicit Version |
|---|---|---|
| Frontend Framework | Next.js App Router | **16.2.6** |
| Frontend Language | TypeScript | **5.7.3** |
| Styling | TailwindCSS | **4.2.0** |
| Component Library | shadcn/ui | **latest (2024)** |
| Charts | Recharts | **2.15.0** |
| Backend Runtime | Node.js | **20 LTS** |
| Backend Framework | **Express.js** | **4.18.0** |
| Backend Language | TypeScript (ts-node) | **5.4.0** |
| Database | Firebase Firestore | **10.0.0** |
| AI Model | **Gemini 3.1** via Google Cloud | **`gemini-3.1-preview`** **`gemini-2.5-flash`** |
| AI SDK | Google Generative AI | **0.5.0** |
| AI Platform | **Google Cloud/Vertex AI Studio** | aistudio.google.com |
| Package Manager | npm | **10.x** |

> ⚠️ **Model string note:** The handbook requires Gemini 3.1 accessed via Google Cloud. Use `gemini-2.5-flash` as the model string in `backend/lib/gemini.ts`. Verify the exact available model string in Google Cloud at competition time and update accordingly.

---

## 1.1.1 Deployment Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend Hosting | **Vercel** | Hosts Next.js app, CDN, auto-deploys from Git |
| Backend Hosting | **Google Cloud Run** | Serverless container for Express.js API |
| Database | Firebase Firestore | NoSQL database for relationships, users, interactions |
| AI Service | **Google Gemini API** | Signal extraction, match scoring, insights |
| Container Registry | **Google Artifact Registry** | Stores backend Docker images |
| CI/CD | **Google Cloud Build** | Builds and deploys backend on push |

**Backend Deployment Flow:**
1. Push code to repository
2. Google Cloud Build triggers automatically
3. Builds Docker image and pushes to Artifact Registry
4. Deploys latest image to Cloud Run service
5. Cloud Run endpoint becomes `NEXT_PUBLIC_BACKEND_URL` in frontend environment

**Key Points for Cloud Run:**
- Backend listens on `0.0.0.0:${PORT}` (automatically set via `$PORT` env variable)
- CORS origin is configured via `FRONTEND_URL` environment variable (set to Vercel deployment URL)
- All Firebase and Gemini credentials passed via Cloud Run environment variables

> ⚠️ **Ports:** Frontend runs on `http://localhost:3000`. Backend runs on `http://localhost:3001`. Both must be running simultaneously during development.

**Why these Google technologies?**
- **Gemini 3.1 (Google Cloud):** State-of-the-art model with structured JSON output — essential for extracting relationship intelligence signals from free-text interaction summaries. Chosen for strong instruction-following for strict JSON schema compliance.
- **Firebase Firestore:** Serverless, horizontally-scalable NoSQL document store. Zero infrastructure overhead, and a document model that maps directly to ERIS's relationship entity architecture.

---

## 1.2 Environment Variables Blueprint

The project uses **two separate env files** — one for each service.

---

### `frontend/.env.local`

```env
# ─────────────────────────────────────────────
# BACKEND — Express API Base URL
# ─────────────────────────────────────────────

# Development: Express server running locally
# Production: Replace with your deployed backend URL (e.g. Google Cloud Run)
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Example production URL:
# NEXT_PUBLIC_BACKEND_URL=https://eris-backend-xxxxx-uc.a.run.app
```

> The frontend does NOT connect to Firebase directly. All Firestore and Gemini operations are handled server-side by the Express backend. The only env var the frontend needs is the backend URL.

---

### `backend/.env`

```env
# ─────────────────────────────────────────────
# EXPRESS SERVER
# ─────────────────────────────────────────────

PORT=3001  # Cloud Run automatically sets $PORT; this is the fallback

# ─────────────────────────────────────────────
# CORS CONFIGURATION — Frontend Origin
# ─────────────────────────────────────────────

# Development: http://localhost:3000
# Production: Your Vercel frontend URL (e.g. https://eris.vercel.app)
FRONTEND_URL=http://localhost:3000

# ─────────────────────────────────────────────
# FIREBASE — Server-Side SDK Initialization
# ─────────────────────────────────────────────

# Found in: Firebase Console → Project Settings → General → Your Apps
# NOTE: No NEXT_PUBLIC_ prefix — these are server-side only
FIREBASE_API_KEY=                    # e.g. AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX
FIREBASE_AUTH_DOMAIN=               # e.g. eris-hackathon.firebaseapp.com
FIREBASE_PROJECT_ID=                # e.g. eris-hackathon-2026
FIREBASE_STORAGE_BUCKET=            # e.g. eris-hackathon-2026.appspot.com
FIREBASE_MESSAGING_SENDER_ID=       # e.g. 123456789012
FIREBASE_APP_ID=                    # e.g. 1:123456789012:web:abcdef1234567890

# ─────────────────────────────────────────────
# GOOGLE GEMINI — AI API (via Google Cloud)
# ─────────────────────────────────────────────

# Found in: Google Cloud → API Keys → aistudio.google.com → "Get API key"
GEMINI_API_KEY=                     # e.g. AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

> ⚠️ **NEVER** commit either `.env.local` or `.env` to version control. Both are listed in the root `.gitignore`.
> ⚠️ Firebase and Gemini keys live in `backend/.env` only — they never touch the browser.

---

## 1.3 Folder Structure Architecture (ASCII Tree)

```
eris/                                     ← Git repository root
│
├── .gitignore                            # Ignores: node_modules, .env, .env.local, .next, dist
├── .env.example                          # Documents all required keys (commit this, not the real .env)
├── README.md                             # Project overview, setup, run instructions
├── JUSTIFICATION.md                      # Hackathon questionnaire answers
│
├── frontend/                             # ── NEXT.JS 14 APP (UI ONLY) ──────────────────
│   │
│   ├── package.json                      # Frontend dependencies only
│   ├── next.config.js                    # Next.js config (no API rewrites needed)
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── .env.local                        # NEXT_PUBLIC_BACKEND_URL only
│   │
│   ├── app/                              # Next.js 14 App Router
│   │   ├── layout.tsx                    # Root layout (global font, metadata)
│   │   ├── page.tsx                      # Redirect → /dashboard
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx                  # [ROUTE] Startup context overview
│   │   │
│   │   ├── matching/
│   │   │   └── page.tsx                  # [ROUTE] AI mentor match results
│   │   │
│   │   ├── programmes/
│   │   │   └── page.tsx                  # [ROUTE] Programme & partner overview
│   │   │
│   │   └── relationship/
│   │       └── [id]/
│   │           └── page.tsx              # [ROUTE] Relationship intelligence dashboard
│   │
│   ├── components/
│   │   ├── StartupCard.tsx
│   │   ├── MentorCard.tsx
│   │   ├── MatchResultCard.tsx
│   │   ├── SignalChart.tsx
│   │   ├── RelationshipOverview.tsx
│   │   ├── InteractionForm.tsx
│   │   ├── LifecycleDropdown.tsx
│   │   ├── EcosystemInsights.tsx
│   │   ├── RelationshipSummaryCard.tsx
│   │   ├── ProgrammeCard.tsx
│   │   └── VerificationBadge.tsx
│   │
│   └── lib/
│       ├── api.ts                        # HTTP client — all fetch() calls to backend
│       └── types.ts                      # Shared TypeScript interfaces (frontend copy)
│
└── backend/                              # ── EXPRESS.JS API SERVER ──────────────────────
    │
    ├── package.json                      # Backend dependencies only
    ├── tsconfig.json
    ├── .env                              # Firebase + Gemini keys (never commit)
    │
    ├── server.ts                         # Express app entry point + CORS config
    │
    ├── routes/
    │   ├── match.ts                      # POST /api/match
    │   ├── createRelationship.ts         # POST /api/create-relationship
    │   ├── extractSignals.ts             # POST /api/extract-signals
    │   ├── updateLifecycle.ts            # POST /api/update-lifecycle
    │   └── ecosystemStats.ts             # GET  /api/ecosystem-stats
    │
    └── lib/
        ├── fakeData.ts                   # Static synthetic seed data (immutable)
        ├── scoring.ts                    # Compatibility scoring algorithm
        ├── gemini.ts                     # Gemini 3.1 API client + JSON extraction
        ├── prompts.ts                    # All Gemini prompt templates
        ├── firebase.ts                   # Firestore init + helper functions
        ├── explanations.ts              # Match + relationship summary generators
        └── types.ts                      # Shared TypeScript interfaces (source of truth)
```

---

## 1.4 Key Architecture Decisions

### Why Express.js for the backend?

With the frontend/backend separated into distinct folders, Next.js API Routes no longer make sense — they are a Next.js-specific convention that couples API handlers to the Next.js build process. Express.js is the idiomatic choice for a standalone Node.js API server: explicit routing, clean middleware, and easy CORS configuration between two separate origins.

### CORS Configuration

The Express backend must allow requests from the Next.js frontend. In `backend/server.ts`, the CORS origin is read from the `FRONTEND_URL` environment variable:

```ts
import cors from 'cors'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

app.use(cors({
  origin: FRONTEND_URL,  // Read from env variable
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}))
```

**Local Development:** `FRONTEND_URL=http://localhost:3000`

**Cloud Run Deployment:** Set `FRONTEND_URL` to your Vercel frontend URL (e.g. `https://eris.vercel.app`) via Cloud Run environment variables.

### API Base URL in Frontend

All frontend fetch calls go through `backend/lib/api.ts`. The base URL is read from the environment variable:

```ts
// frontend/lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL  // http://localhost:3001

export async function generateMatches(startupId: string) {
  const res = await fetch(`${BASE_URL}/api/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ startup_id: startupId })
  })
  return res.json()
}
```

This single file is the **only place** fetch URLs are written. Components call `api.ts` functions, never raw `fetch()` with hardcoded URLs.

### Types Ownership

`backend/lib/types.ts` is the **source of truth** for all TypeScript interfaces. `frontend/lib/types.ts` is a copy kept in sync manually. Do not import across the `frontend/` ↔ `backend/` boundary at the module level — they are two separate Node.js projects with separate `package.json` files.

---

## 1.5 Scalability Architecture

**Data Model Scalability**
Firestore's document model means adding new relationship types requires zero schema migrations — new collections are created on first write.

**Matching Algorithm Scalability**
`backend/lib/scoring.ts` is stateless and pure — parallelisable across any number of mentors via Cloud Functions fan-out in production.

**AI API Scalability**
Gemini API is pay-per-token with no fixed infrastructure cost. ~40,000 API calls/month at 10,000 active relationships.

**Cost Model (MVP → Production)**

| Component | MVP (Hackathon) | Production (10k users) |
|---|---|---|
| Firebase Firestore | Free tier | ~$50–200/month |
| Gemini API | Free tier (Google Cloud) | ~$0.15/1M tokens |
| Frontend hosting (Vercel) | Free tier | ~$20/month |
| Backend hosting (Cloud Run) | Free tier (first 2M invocations) | ~$10–50/month |
| Artifact Registry | Free tier (5 GB storage) | ~$0.10 per GB (storage) |
| Cloud Build | Free tier (120 build-minutes/day) | ~$0.003 per build-minute |
| Total | **$0** | **<$300/month** |

**Geographic Scalability**
Firestore supports multi-region replication. The `programmes` collection includes a `country` field by design, enabling cross-geography filtering without architectural changes.

---

# SECTION 2 — DEFINITIVE DATABASE SCHEMAS

## 2.1 ERD Overview

```
startups (backend/lib/fakeData.ts — static)
    │
    │   M:N via relationships (Firestore)
    │
mentors (backend/lib/fakeData.ts — static)
    │
    └── relationships (Firestore — runtime)
            │
            └── interactions (Firestore — runtime)

programmes (backend/lib/fakeData.ts — seeded)
    │
    └── company_programme (Firestore — runtime)

partners (backend/lib/fakeData.ts — seeded)
service_providers (backend/lib/fakeData.ts — seeded)
```

---

## 2.2 Collection: `relationships`

### TypeScript Interface (`backend/lib/types.ts`)

```ts
export interface Relationship {
  relationship_id: string        // Primary key. Format: "REL-{timestamp}"
  startup_id: string             // Foreign key → startups[].id
  mentor_id: string              // Foreign key → mentors[].id
  compatibility_score: number    // 0–100, integer, NOT NULL
  status: "Created" | "Active" | "Completed" | "Failed"
  created_at: string             // ISO 8601 timestamp
}
```

### Firestore Field Definitions

| Field | Type | Nullable | Index | Constraints |
|---|---|---|---|---|
| `relationship_id` | `string` | No | Yes (primary) | Format: `REL-{timestamp}` |
| `startup_id` | `string` | No | Yes | Must exist in `fakeData.startups` |
| `mentor_id` | `string` | No | Yes | Must exist in `fakeData.mentors` |
| `compatibility_score` | `number` | No | No | Integer, 0–100 |
| `status` | `string` | No | Yes | Enum: Created / Active / Completed / Failed |
| `created_at` | `string` | No | Yes | ISO 8601 format |

### Mock Data (2 Valid Rows)

```json
[
  {
    "relationship_id": "REL-001",
    "startup_id": "startup_1",
    "mentor_id": "mentor_1",
    "compatibility_score": 87,
    "status": "Active",
    "created_at": "2026-05-14T10:00:00Z"
  },
  {
    "relationship_id": "REL-002",
    "startup_id": "startup_1",
    "mentor_id": "mentor_2",
    "compatibility_score": 72,
    "status": "Created",
    "created_at": "2026-05-15T09:30:00Z"
  }
]
```

---

## 2.3 Collection: `interactions`

### TypeScript Interface (`backend/lib/types.ts`)

```ts
export interface Interaction {
  interaction_id: string         // Primary key. Format: "INT-{timestamp}"
  relationship_id: string        // Foreign key → relationships.relationship_id
  summary: string                // User-submitted free-text, min 10 chars
  clarity: number                // Gemini signal: 1–10 integer
  uncertainty: number            // Gemini signal: 1–10 integer
  engagement: number             // Gemini signal: 1–10 integer
  created_at: string             // ISO 8601 timestamp
}
```

### Firestore Field Definitions

| Field | Type | Nullable | Index | Constraints |
|---|---|---|---|---|
| `interaction_id` | `string` | No | Yes (primary) | Format: `INT-{timestamp}` |
| `relationship_id` | `string` | No | Yes (foreign) | Must exist in `relationships` |
| `summary` | `string` | No | No | Min 10 chars. **Must not contain PII.** |
| `clarity` | `number` | No | No | Integer 1–10 |
| `uncertainty` | `number` | No | No | Integer 1–10 |
| `engagement` | `number` | No | No | Integer 1–10 |
| `created_at` | `string` | No | Yes | ISO 8601 format |

> **Privacy note:** The `summary` field stores free-text. Users should not include personal identifiers. In production, Firestore security rules restrict read access to relationship participants only.

### Mock Data (2 Valid Rows)

```json
[
  {
    "interaction_id": "INT-001",
    "relationship_id": "REL-001",
    "summary": "Discussed narrowing customer focus and clarified Series A fundraising priorities.",
    "clarity": 8,
    "uncertainty": 4,
    "engagement": 8,
    "created_at": "2026-05-14T11:00:00Z"
  },
  {
    "interaction_id": "INT-002",
    "relationship_id": "REL-001",
    "summary": "Reviewed pitch deck structure. Several open questions remain on market sizing.",
    "clarity": 5,
    "uncertainty": 7,
    "engagement": 6,
    "created_at": "2026-05-15T14:30:00Z"
  }
]
```

---

## 2.4 Collection: `company_programme`

### TypeScript Interface (`backend/lib/types.ts`)

```ts
export interface CompanyProgramme {
  assignment_id: string          // Primary key. Format: "ASSIGN-{timestamp}"
  startup_id: string             // Foreign key → startups[].id
  programme_id: string           // Foreign key → programmes[].id
  assigned_at: string            // ISO 8601 timestamp
  status: "Active" | "Completed" | "Withdrawn"
}
```

### Mock Data (2 Valid Rows)

```json
[
  {
    "assignment_id": "ASSIGN-001",
    "startup_id": "startup_1",
    "programme_id": "prog_1",
    "assigned_at": "2026-03-01T00:00:00Z",
    "status": "Active"
  },
  {
    "assignment_id": "ASSIGN-002",
    "startup_id": "startup_1",
    "programme_id": "prog_2",
    "assigned_at": "2025-11-01T00:00:00Z",
    "status": "Completed"
  }
]
```

---

## 2.5 Static Synthetic Data: `backend/lib/fakeData.ts`

### Startup Schema

```ts
export interface Startup {
  id: string
  name: string
  domain: string[]
  stage: number
  needs: string[]
  goals: string[]
  verified: boolean
}

export const startups: Startup[] = [
  {
    id: "startup_1",
    name: "NeuroFlow AI",
    domain: ["AI", "Healthcare"],
    stage: 2,
    needs: ["Fundraising", "B2B Sales"],
    goals: ["Product-Market Fit"],
    verified: true
  }
]
```

### Mentor Schema

```ts
export interface Mentor {
  id: string
  name: string
  expertise: string[]
  preferred_stage: number
  availability: "Weekly" | "Bi-Weekly" | "Monthly"
  verified: boolean
}

export const mentors: Mentor[] = [
  {
    id: "mentor_1",
    name: "Sarah Lim",
    expertise: ["Fundraising", "Enterprise Sales"],
    preferred_stage: 2,
    availability: "Weekly",
    verified: true
  },
  {
    id: "mentor_2",
    name: "David Tan",
    expertise: ["Product Strategy", "B2B Sales"],
    preferred_stage: 2,
    availability: "Bi-Weekly",
    verified: true
  }
]
```

### Programme Schema

```ts
export interface Programme {
  id: string
  name: string
  country: string
  focus_areas: string[]
  status: "Active" | "Completed" | "Upcoming"
  cohort_size: number
}

export const programmes: Programme[] = [
  {
    id: "prog_1",
    name: "Cradle CIP Accelerate 2026 — Malaysia",
    country: "Malaysia",
    focus_areas: ["AI", "Healthcare", "FinTech"],
    status: "Active",
    cohort_size: 12
  },
  {
    id: "prog_2",
    name: "Cradle GENESIS 2025 — Singapore",
    country: "Singapore",
    focus_areas: ["SaaS", "B2B", "Enterprise"],
    status: "Completed",
    cohort_size: 8
  }
]
```

### Partner Schema

```ts
export interface Partner {
  id: string
  name: string
  type: "Corporate" | "Government" | "Academic" | "NGO"
  initiatives: string[]
  country: string
}

export const partners: Partner[] = [
  {
    id: "partner_1",
    name: "Sunway Group",
    type: "Corporate",
    initiatives: ["Sunway iLabs Cohort 2026"],
    country: "Malaysia"
  },
  {
    id: "partner_2",
    name: "MDEC",
    type: "Government",
    initiatives: ["MyDIGITAL Accelerator"],
    country: "Malaysia"
  }
]
```

### Service Provider Schema

```ts
export interface ServiceProvider {
  id: string
  name: string
  services: string[]
  verified: boolean
}

export const serviceProviders: ServiceProvider[] = [
  {
    id: "sp_1",
    name: "LegalEase MY",
    services: ["Company Incorporation", "IP Filing"],
    verified: true
  },
  {
    id: "sp_2",
    name: "CloudScale Asia",
    services: ["Cloud Infrastructure", "DevOps"],
    verified: true
  }
]
```

### Seeded Graph History

```ts
export interface GraphDataPoint {
  week: number
  clarity: number       // 1–10
  uncertainty: number   // 1–10
  engagement: number    // 1–10
}

export const seededRelationshipHistory: GraphDataPoint[] = [
  { week: 1, clarity: 3, uncertainty: 9, engagement: 5 },
  { week: 2, clarity: 5, uncertainty: 7, engagement: 6 }
]
```

---

# SECTION 3 — OPENAPI / SWAGGER SPECIFICATIONS

> **Base URL:** All API calls from the frontend target `http://localhost:3001` (development) or the deployed backend URL (production), read from `NEXT_PUBLIC_BACKEND_URL`.
> **Auth Guard:** All endpoints are public (no auth) for this MVP.
> **CORS:** Backend allows requests from `http://localhost:3000` only.

---

## 3.1 `POST /api/match`

**File:** `backend/routes/match.ts`
**Purpose:** Generate AI compatibility scores between a startup and all mentors.

### Request

```json
{ "startup_id": "startup_1" }
```

| Field | Type | Required | Validation |
|---|---|---|---|
| `startup_id` | `string` | Yes | Must match `fakeData.startups[].id` |

### Response 200 — Success

```json
{
  "success": true,
  "matches": [
    {
      "mentor_id": "mentor_1",
      "compatibility_score": 87,
      "explanation": "Strong match due to aligned fundraising goals and compatible startup stage."
    }
  ]
}
```

### Response 400 — Validation Error

```json
{ "success": false, "error": "startup_id is required" }
```

### Response 500 — Server Error

```json
{ "success": false, "error": "Failed to generate matches" }
```

---

## 3.2 `POST /api/create-relationship`

**File:** `backend/routes/createRelationship.ts`
**Purpose:** Persist a new relationship entity to Firestore.

### Request

```json
{
  "startup_id": "startup_1",
  "mentor_id": "mentor_1",
  "compatibility_score": 87
}
```

### Response 200 — Success

```json
{ "success": true, "relationship_id": "REL-1747389600000" }
```

### Response 400 — Validation Error

```json
{ "success": false, "error": "All fields (startup_id, mentor_id, compatibility_score) are required" }
```

### Response 500 — Server Error

```json
{ "success": false, "error": "Failed to create relationship in Firestore" }
```

---

## 3.3 `POST /api/extract-signals`

**File:** `backend/routes/extractSignals.ts`
**Purpose:** Send interaction summary to Gemini 3.1 and extract 3 structured signals.

### Request

```json
{
  "relationship_id": "REL-001",
  "summary": "We discussed narrowing target customers and clarified fundraising priorities."
}
```

| Field | Type | Required | Validation |
|---|---|---|---|
| `relationship_id` | `string` | Yes | Must exist in Firestore |
| `summary` | `string` | Yes | Min 10 characters |

### Response 200 — Success

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

### Response 400 — Validation Error

```json
{ "success": false, "error": "summary must be at least 10 characters" }
```

### Response 500 — Gemini Error

```json
{ "success": false, "error": "Gemini extraction failed" }
```

---

## 3.4 `POST /api/update-lifecycle`

**File:** `backend/routes/updateLifecycle.ts`
**Purpose:** Update relationship lifecycle status in Firestore.

### Request

```json
{
  "relationship_id": "REL-001",
  "new_status": "Active"
}
```

### Response 200 — Success

```json
{ "success": true, "updated_status": "Active" }
```

### Response 400 — Invalid Transition

```json
{ "success": false, "error": "Invalid transition: Completed → Active is not allowed" }
```

---

## 3.5 `GET /api/ecosystem-stats`

**File:** `backend/routes/ecosystemStats.ts`
**Purpose:** Return live Firestore-derived stats for the EcosystemInsights component.

### Response 200 — Success

```json
{
  "success": true,
  "stats": {
    "total_relationships": 14,
    "active_relationships": 9,
    "total_interactions": 37,
    "top_mentor_domains": ["Fundraising", "B2B Sales", "Product Strategy"]
  }
}
```

---

# SECTION 4 — UI/UX NAVIGATION MATRIX & COMPONENT SYSTEM

## 4.1 Route Routing Table

| Path | Page | Entry Trigger | Allowed Actions |
|---|---|---|---|
| `/dashboard` | Startup Dashboard | App open / root redirect | View startup context → click "Generate Matches" → `/matching` |
| `/matching` | Mentor Match Results | Click "Generate Matches" | View match cards → click "Create Relationship" → POST `/api/create-relationship` → `/relationship/[id]` |
| `/programmes` | Programme Overview | Nav link on dashboard | View all programmes, partners, service providers |
| `/relationship/[id]` | Relationship Intelligence | Relationship created | Submit interaction → view chart → change lifecycle |

---

## 4.2 Component Wireframe Specs

All components live in `frontend/components/`. All fetch calls go through `frontend/lib/api.ts`.

### `StartupCard.tsx`

```ts
interface StartupCardProps {
  id: string
  name: string
  domain: string[]
  stage: number
  needs: string[]
  goals: string[]
  verified: boolean
}
```

---

### `MentorCard.tsx`

```ts
interface MentorCardProps {
  id: string
  name: string
  expertise: string[]
  preferred_stage: number
  availability: string
  verified: boolean
}
```

---

### `MatchResultCard.tsx`

```ts
interface MatchResultCardProps {
  mentorName: string
  compatibilityScore: number
  explanation: string
  onCreateRelationship: () => void
}
```

**Score color coding:** ≥80 → green | 60–79 → yellow | <60 → red

---

### `SignalChart.tsx`

```ts
interface SignalChartProps {
  graphData: {
    week: number
    clarity: number
    uncertainty: number
    engagement: number
  }[]
}
```

**Lines:** Clarity (blue) | Uncertainty (red) | Engagement (green). X-axis: Week. Y-axis: 1–10.

---

### `RelationshipOverview.tsx`

```ts
interface RelationshipOverviewProps {
  startupName: string
  mentorName: string
  compatibilityScore: number
  status: "Created" | "Active" | "Completed" | "Failed"
  createdAt: string
}
```

---

### `InteractionForm.tsx`

```ts
interface InteractionFormProps {
  relationshipId: string
  onSubmitSuccess: (
    signals: { clarity: number; uncertainty: number; engagement: number },
    summary: string
  ) => void
}
```

**Renders:** Textarea (min 10 chars), submit button, loading state, privacy hint: *"Do not include personal names or contact details in your summary."*

---

### `LifecycleDropdown.tsx`

```ts
interface LifecycleDropdownProps {
  currentStatus: "Created" | "Active" | "Completed" | "Failed"
  relationshipId: string
  onStatusChange: (newStatus: string) => void
}
```

**Valid transitions:** Created → Active | Active → Completed | Active → Failed. Terminal states show disabled dropdown.

---

### `RelationshipSummaryCard.tsx`

```ts
interface RelationshipSummaryCardProps {
  summary: string
}
```

---

### `EcosystemInsights.tsx`

```ts
interface EcosystemInsightsProps {
  liveStats?: {
    total_relationships: number
    active_relationships: number
    total_interactions: number
    top_mentor_domains: string[]
  }
  staticInsights: string[]
}
```

---

### `ProgrammeCard.tsx`

```ts
interface ProgrammeCardProps {
  id: string
  name: string
  country: string
  focus_areas: string[]
  status: "Active" | "Completed" | "Upcoming"
  cohort_size: number
}
```

---

### `VerificationBadge.tsx`

```ts
interface VerificationBadgeProps {
  verified: boolean
}
```

---

# SECTION 5 — END-TO-END BUSINESS LOGIC & STATE MACHINES

## 5.1 Flow 1 — Match Generation

```
1. User clicks "Generate Matches" on /dashboard
2. frontend/lib/api.ts calls POST http://localhost:3001/api/match { startup_id }
3. backend/routes/match.ts receives request
4. Loads startup from backend/lib/fakeData.ts
5. Iterates over all mentors in fakeData.ts
6. backend/lib/scoring.ts calculates compatibility per mentor:

   score =
     (domainOverlap    * 40)   → % of startup.domain matching mentor.expertise
   + (stageAlignment   * 20)   → 1.0 if stages match, 0.5 if ±1, 0.0 otherwise
   + (capabilityMatch  * 30)   → % of startup.needs matching mentor.expertise
   + (availabilityMatch * 10)  → 1.0 Weekly / 0.7 Bi-Weekly / 0.4 Monthly

   Weights are named constants — configurable without code changes.

7. backend/lib/explanations.ts generates explanation per match
8. Results sorted by score descending, returned to frontend
9. Frontend renders one MatchResultCard per match
```

---

## 5.2 Flow 2 — Relationship Creation

```
1. User clicks "Create Relationship" on MatchResultCard
2. frontend/lib/api.ts calls POST http://localhost:3001/api/create-relationship
3. backend/routes/createRelationship.ts receives request
4. Generates relationship_id = "REL-" + Date.now()
5. Writes Relationship document to Firestore (via backend/lib/firebase.ts)
6. Returns { success: true, relationship_id }
7. Frontend navigates to /relationship/[relationship_id]
8. Relationship page preloads graphData from seededRelationshipHistory
```

---

## 5.3 Flow 3 — Signal Extraction (Gemini 3.1)

```
1. User types interaction summary in InteractionForm
2. User clicks "Submit Interaction"
3. Frontend validates: summary.length >= 10 chars
4. frontend/lib/api.ts calls POST http://localhost:3001/api/extract-signals
5. backend/routes/extractSignals.ts receives request
6. Sends summary to Gemini 3.1 (gemini-2.5-flash) via backend/lib/gemini.ts
   using strict JSON extraction prompt from backend/lib/prompts.ts
7. Gemini returns STRICT JSON:
   { "clarity": 8, "uncertainty": 4, "engagement": 8 }
8. backend validates response with isValidSignals() (see Section 6.3)
9. Writes Interaction document to Firestore
10. backend/lib/explanations.ts generates relationship_summary
11. Returns { success, signals, relationship_summary } to frontend
12. Frontend appends { week: graphData.length + 1, ...signals } to graphData state
13. Recharts rerenders — chart updates dynamically
14. RelationshipSummaryCard updates with new summary
```

---

## 5.4 Flow 4 — Programme View

```
1. User clicks "Programmes" nav link from /dashboard
2. Frontend navigates to /programmes
3. frontend/lib/api.ts calls GET http://localhost:3001/api/ecosystem-stats
4. backend/routes/ecosystemStats.ts reads Firestore relationship + interaction counts
5. Returns live stats to frontend
6. Frontend also displays seeded programmes, partners, service_providers
   (fetched via GET /api/programmes — or loaded from a static JSON endpoint)
7. Page renders: ProgrammeCards + Partner list + ServiceProvider list + live stats
```

---

## 5.5 State Machine — Relationship Lifecycle

```
┌─────────┐
│ Created │
└─────────┘
     │  (dropdown: "Set Active")
     ▼
┌────────┐
│ Active │
└────────┘
     │
     ├──► (dropdown: "Mark Completed") ──► ┌───────────┐
     │                                     │ Completed │ ← TERMINAL
     │                                     └───────────┘
     └──► (dropdown: "Mark Failed") ──► ┌────────┐
                                        │ Failed │ ← TERMINAL
                                        └────────┘
```

### Valid State Transitions

| Current State | Allowed Next States | Blocked |
|---|---|---|
| `Created` | `Active` | `Completed`, `Failed` |
| `Active` | `Completed`, `Failed` | `Created` |
| `Completed` | _(terminal)_ | All |
| `Failed` | _(terminal)_ | All |

Backend enforces valid transitions in `backend/routes/updateLifecycle.ts`. Invalid transitions return HTTP 400.

---

# SECTION 6 — ETHICAL AI, GUARDRAILS & CODING STANDARDS

## 6.1 Ethical AI Considerations

### Bias

**Risk:** The scoring algorithm in `backend/lib/scoring.ts` could disadvantage mentors with non-tech-adjacent expertise if weights are poorly calibrated.

**Mitigation:** Scoring weights are named constants at the top of `scoring.ts` (e.g. `DOMAIN_WEIGHT = 40`). They are auditable, configurable without a code deploy, and the formula is fully deterministic and inspectable.

### Hallucination Mitigation

**Risk:** Gemini 3.1 could return malformed or fabricated signal values.

**Mitigation:** All Gemini responses are validated against `isValidSignals()` before storage. Responses failing validation are rejected — the interaction is not stored and the user receives an error. Prompts explicitly instruct: *"Respond ONLY with a JSON object. No markdown. No explanation."*

### Privacy

**Risk:** `interactions.summary` could contain PII.

**Mitigation:** `InteractionForm` displays a privacy hint. The field is documented as PII-risk. Data is scoped to `relationship_id` and never surfaced in aggregate public views.

### Transparency

**Risk:** Users may not understand how scores or signals were derived.

**Mitigation:** Every `MatchResultCard` displays a natural-language `explanation` field. Every `RelationshipSummaryCard` displays a natural-language interpretation of signals. The scoring algorithm is deterministic and documented here.

---

## 6.2 Code Styling Constraints

### Frontend Rules (`frontend/`)

```
✅ TailwindCSS classes exclusively — no inline styles
✅ Functional React components only
✅ async/await only — no .then() chains
✅ All API calls go through frontend/lib/api.ts — no raw fetch() in components
✅ TypeScript strict mode — no 'any'
❌ No Redux, Zustand, MobX
❌ No direct Firebase SDK calls from frontend
❌ No hardcoded backend URLs in components
```

### Backend Rules (`backend/`)

```
✅ All routes: Express Router handlers with async/await
✅ All responses follow { success, data/error } envelope
✅ try/catch on ALL async operations
✅ CORS enabled for frontend origin only
✅ GEMINI_API_KEY and Firebase keys loaded from process.env only
❌ Never log API keys or secrets
❌ Never return raw Firestore documents without mapping to typed interfaces
```

---

## 6.3 Error Handling Blueprint

### API Response Envelope

```json
{ "success": true, "data": {} }
{ "success": false, "error": "Human-readable message" }
```

### HTTP Status Code Rules

| Scenario | HTTP Status |
|---|---|
| Success | `200` |
| Missing/invalid fields | `400` |
| Invalid lifecycle transition | `400` |
| Resource not found | `404` |
| Gemini API failure | `500` |
| Firestore write failure | `500` |

### Gemini JSON Validation (`backend/lib/gemini.ts`)

```ts
function isValidSignals(data: unknown): data is {
  clarity: number
  uncertainty: number
  engagement: number
} {
  if (typeof data !== 'object' || data === null) return false
  const d = data as Record<string, unknown>

  const isValidSignal = (val: unknown): boolean =>
    typeof val === 'number' && Number.isInteger(val) && val >= 1 && val <= 10

  return (
    isValidSignal(d.clarity) &&
    isValidSignal(d.uncertainty) &&
    isValidSignal(d.engagement)
  )
}
```

---

## 6.4 Gemini Prompt (`backend/lib/prompts.ts`)

```ts
export const SIGNAL_EXTRACTION_PROMPT = (summary: string) => `
You are an expert relationship analyst. Analyse the following mentor-startup interaction
summary and extract 3 relationship intelligence signals.

Interaction summary:
"${summary}"

Signal definitions:
- clarity (1–10): How much shared understanding was established. 10 = fully clear.
- uncertainty (1–10): How much uncertainty or open questions remain. 10 = highly uncertain.
- engagement (1–10): How actively engaged both parties were. 10 = highly engaged.

Respond ONLY with a JSON object. No markdown. No explanation. No commentary. No code fences.

{
  "clarity": <integer 1-10>,
  "uncertainty": <integer 1-10>,
  "engagement": <integer 1-10>
}
`
```

---

## 6.5 "Must Not Build" List

```
❌ Machine learning pipelines
❌ Vector databases / embedding systems
❌ Graph databases
❌ WebSocket / real-time infrastructure
❌ Enterprise authentication (OAuth, SSO, JWT)
❌ Autonomous learning systems
❌ Microservices
❌ Direct Firebase SDK calls from the frontend
❌ Hardcoded backend URLs in frontend components
```

---

# SECTION 7 — VERIFICATION & DEFINITION OF DONE (DoD)

## 7.1 End-to-End Test Script

> Both `frontend/` and `backend/` servers must be running before executing this script.
> Terminal 1: `cd backend && npm run dev` → starts Express on port 3001
> Terminal 2: `cd frontend && npm run dev` → starts Next.js on port 3000

---

**Step 1 — Open Dashboard**
User opens `http://localhost:3000`.
Expected: Redirected to `/dashboard`.
Expected: `StartupCard` renders NeuroFlow AI with verified badge.
Expected: `EcosystemInsights` renders live stats from `GET http://localhost:3001/api/ecosystem-stats`.

---

**Step 2 — View Programme Overview**
User clicks "Programmes" nav link.
Expected: Navigates to `/programmes`.
Expected: Two `ProgrammeCard` components render (Malaysia + Singapore).
Expected: Partner list and service provider list render with verification badges.

---

**Step 3 — Generate Mentor Matches**
User returns to `/dashboard`, clicks "Generate Matches".
Expected: `POST http://localhost:3001/api/match` called.
Expected: Navigates to `/matching` with at least one `MatchResultCard`.

---

**Step 4 — Create Relationship**
User clicks "Create Relationship" on a `MatchResultCard`.
Expected: `POST http://localhost:3001/api/create-relationship` returns `{ success: true, relationship_id }`.
Expected: Firestore `relationships` collection contains the new document.
Expected: Browser navigates to `/relationship/[relationship_id]`.

---

**Step 5 — View Relationship Dashboard**
Expected: `RelationshipOverview` shows startup + mentor names, score, status "Created".
Expected: `SignalChart` renders with 2 seeded data points.
Expected: `LifecycleDropdown` shows "Created" with only "Set Active" available.

---

**Step 6 — Submit Interaction Summary**
User types: *"We discussed narrowing target customers and clarified Series A fundraising priorities."*
User clicks "Submit Interaction".
Expected: `POST http://localhost:3001/api/extract-signals` returns 3 signals + summary.
Expected: Firestore `interactions` collection contains the new document.
Expected: `SignalChart` appends a new Week 3 data point — all 3 lines update.
Expected: `RelationshipSummaryCard` updates with AI-generated summary.

---

**Step 7 — Update Lifecycle Status**
User opens `LifecycleDropdown`, selects "Active".
Expected: `POST http://localhost:3001/api/update-lifecycle` succeeds.
Expected: Firestore `relationships` document `status` → "Active".
Expected: `RelationshipOverview` badge updates without page reload.

---

## 7.2 Definition of Done Checklist

```
✅ backend/ starts cleanly on port 3001 with npm run dev
✅ frontend/ starts cleanly on port 3000 with npm run dev
✅ CORS allows requests from localhost:3000 → localhost:3001
✅ All frontend API calls go through frontend/lib/api.ts
✅ Dashboard renders startup context with verified badge
✅ Programmes page renders multi-country cards + partners + service providers
✅ Mentor match cards render with scores and explanations
✅ Relationship created and saved to Firestore
✅ Relationship dashboard loads with seeded graph history
✅ Gemini 3.1 extracts 3 signals (clarity, uncertainty, engagement)
✅ isValidSignals() validates all 3 fields before Firestore write
✅ SignalChart updates dynamically with new data point
✅ Relationship summary updates after Gemini extraction
✅ Lifecycle status changes with transition enforcement
✅ EcosystemInsights renders live Firestore stat count
✅ All API responses follow { success, data/error } envelope
✅ No hardcoded URLs in frontend components
✅ No Firebase/Gemini keys in frontend/.env.local
✅ README.md in repo root with dual-server setup instructions
✅ .gitignore covers both backend/.env and frontend/.env.local
```

---

## 7.3 Rubric Alignment Summary

| Rubric Criterion | How ERIS Addresses It |
|---|---|
| **Google Technology Integration (15pts)** | Gemini 3.1 via Google Cloud (backend) for signal extraction; Firebase Firestore (backend) for runtime state. Both integral — remove either and the core product fails. |
| **AI Implementation Quality (10pts)** | AI is the intelligence core. Ethical AI: bias → configurable scoring weights; hallucination → isValidSignals() schema validation; privacy → PII guidance + scoped Firestore; transparency → natural-language explanations on every score and signal. |
| **Working Demo & UI/UX (10pts)** | Full 7-step demo flow above. shadcn/ui + Tailwind for polished UI. Dual-server architecture is invisible to the demo judge. |
| **AI Model Performance (5pts)** | Strict prompt in `backend/lib/prompts.ts` enforces JSON-only output. Schema validation rejects malformed responses. Gemini 3.1 chosen for strong instruction-following. |
| **Originality & Creativity (10pts)** | Relationships-as-first-class-entities. Not a CRM, not a marketplace — a relationship intelligence layer. |
| **Problem–Solution Fit (15pts)** | Companies, mentors, partners, service providers, and programmes all modelled. Cross-geography via Malaysia + Singapore seeded programmes. Participant verification included. |
| **Scalability (10pts)** | Firestore horizontal scale; Gemini pay-per-token; scoring stateless. Express backend deployable to Railway/Render/Fly.io; frontend to Vercel. $0 MVP → <$300/month at 10k users. |
| **Deployment Readiness (5pts)** | Frontend → Vercel (one click). Backend → Railway/Render (one click). README provides dual-server setup. JUSTIFICATION.md prepares questionnaire answers. |

---

# SECTION 8 — README TEMPLATE

> Claude Code should generate this file at the **repository root** (`README.md`), not inside `frontend/` or `backend/`.

```markdown
# ERIS — Ecosystem Relationship Intelligence System

> MyHack 2026 | Build With AI KL | Hackathon MVP

ERIS is an AI-powered platform that treats ecosystem relationships as first-class,
programmable, reusable entities — enabling automated mentor matching, interaction
intelligence extraction, and lifecycle tracking across programmes and geographies.

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, TailwindCSS, shadcn/ui, Recharts (port 3000)
- **Backend:** Express.js 4, TypeScript, Node.js 20 (port 3001)
- **Database:** Firebase Firestore
- **AI:** Gemini 3.1 via Google Cloud

## Project Structure

```
eris/
├── frontend/    ← Next.js 14 UI (pages + components)
├── backend/     ← Express.js API (routes + Firebase + Gemini)
├── README.md
└── JUSTIFICATION.md
```

## Prerequisites

- Node.js 20+
- npm 10+
- Firebase project (Firestore enabled)
- Google Cloud API key (aistudio.google.com)

## Setup

### 1. Clone the repository

git clone https://github.com/your-team/eris.git
cd eris

### 2. Set up the backend

cd backend
npm install
cp ../.env.example .env
# Fill in all Firebase and Gemini values in backend/.env

### 3. Set up the frontend

cd ../frontend
npm install
# Create frontend/.env.local with:
# NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

### 4. Run both servers (two terminals)

Terminal 1 — Backend:
cd backend && npm run dev
→ Express API running on http://localhost:3001

Terminal 2 — Frontend:
cd frontend && npm run dev
→ Next.js running on http://localhost:3000

## Demo Flow

1. Open http://localhost:3000 — view startup dashboard
2. Click "Generate Matches" — view AI-scored mentor recommendations
3. Click "Create Relationship" — entity saved to Firestore
4. Submit an interaction summary — Gemini 3.1 extracts 3 signals
5. Watch the relationship intelligence chart update dynamically
6. Update lifecycle status via the dropdown

## Prototype

GitHub: https://github.com/your-team/eris
```

---

# SECTION 9 — JUSTIFICATION.MD TEMPLATE

> Claude Code should generate this file at the **repository root** (`JUSTIFICATION.md`), not inside `frontend/` or `backend/`.

```markdown
# ERIS — Hackathon Questionnaire Answers

## Elevator Pitch

ERIS is an AI-powered Ecosystem Relationship Intelligence System that transforms how
innovation ecosystems manage mentor-company relationships. Instead of treating connections
as one-off assignments, ERIS makes every relationship a persistent, trackable, evolving
intelligence entity — automatically matched by Gemini 3.1, enriched by interaction
signals, and reusable across programmes and geographies.

## Google Technologies Used

**Gemini 3.1 (via Google Cloud)**
Used for: Extracting structured relationship intelligence signals (clarity, uncertainty,
engagement) from free-text interaction summaries submitted by mentors and startup founders.

Why Gemini 3.1: Its instruction-following capability for strict JSON output is essential
for ERIS's signal extraction pipeline. The model reliably returns structured data without
hallucinated fields, enabling downstream schema validation and chart updates.

How it enhances the solution: Without Gemini, the interaction submission form is a
dead-end text box. With Gemini, every submitted summary generates three quantified signals
that update a live relationship health chart — turning qualitative notes into quantifiable
ecosystem intelligence.

**Firebase Firestore**
Used for: Storing relationship entities, interaction logs, and lifecycle state in the
Express backend.

Why Firestore: Zero-infrastructure, serverless, and horizontally scalable. Its document
model maps directly to ERIS's relationship entity architecture.

## AI Components and Ethical Considerations

**Model:** Gemini 3.1 (`gemini-2.5-flash` via Google Cloud API, called server-side
from the Express backend)

**Why it's essential:** Gemini is the intelligence core of ERIS. The product's primary
value proposition — extracting relationship health signals from free-text — only works
with a capable LLM. The entire relationship graph is powered by Gemini's structured outputs.

**Ethical considerations:**
- Bias: Scoring weights are configurable named constants, auditable without a code deploy.
- Hallucination: All Gemini responses validated against strict JSON schema before storage.
- Privacy: Summaries scoped to relationship IDs; users guided not to include PII.
- Transparency: Every score and signal has a natural-language explanation.

## Tech Stack and Deployment

**Stack:** Next.js 14 (frontend), Express.js 4 (backend), Firebase Firestore, Gemini 3.1
via Google Cloud. Frontend and backend are separate services in one repository.

**Deployment:** Frontend → Vercel. Backend → Railway or Render. Both are one-click deploys
with zero DevOps infrastructure required. Update NEXT_PUBLIC_BACKEND_URL to the deployed
backend URL on Vercel.

**Infrastructure cost:** ~$0 at MVP, <$300/month at 10,000 active users.

## Problem Statement Alignment

**Targeted issue:** Ecosystem relationships are managed as one-off, unstructured
assignments with no intelligence extraction, no memory, and no reuse.

**How ERIS differs:** Every relationship is a first-class data entity with its own
lifecycle, interaction history, and AI-extracted intelligence signals. Relationships
persist across programmes and carry their history.

**Measurable improvements:**
- Relationship health visible at a glance (clarity, uncertainty, engagement scores).
- Matching automated and explainable — replaces spreadsheet coordination.
- Interaction intelligence accumulated and queryable, not lost after each session.

## Business Aspects

**Core features:** AI mentor matching, relationship entity creation, Gemini signal
extraction, dynamic relationship health dashboard, lifecycle tracking, programme overview.

**Primary stakeholders:** Programme administrators (Cradle, MDEC), mentors, startup
founders, corporate partners.

**Revenue model:** SaaS for ecosystem operators. Free (1 programme), Pro ($500/month,
5 programmes), Enterprise (custom, unlimited).

**From prototype to production:**
1. Add Firebase Authentication for participant login.
2. Add Firestore security rules scoping data to authenticated participants.
3. Deploy backend to Railway/Render with production env vars.
4. Deploy frontend to Vercel with NEXT_PUBLIC_BACKEND_URL pointing to production backend.
5. Add email notifications for lifecycle state changes.
```

---

*ERIS — Ecosystem Relationship Intelligence System*
*Engineering Specification v3.0 — 16 May 2026*
*v3: Frontend (Next.js 14, port 3000) + Backend (Express.js 4, port 3001) separated into distinct folders. Root-level: .gitignore, README.md, JUSTIFICATION.md, .env.example.*
