# 📖 ERIS Platform Architecture Blueprint & Implementation Guide
> **Ecosystem Relationship Intelligence System (ERIS)** > Technical specification guide for rapid full-stack implementation during the GDG KL Google Hackathon.

---

## 🛠️ 1. Technical Stack Matrix (Google Ecosystem Focus)

| Layer | Architecture Component | Technology Selection |
| :--- | :--- | :--- |
| **Frontend UI** | Next.js 14 App Router + Tailwind CSS | Deployed on **Firebase App Hosting** or **Vercel** |
| **Backend Engine** | FastAPI (Python 3.11+) | Containerized and deployed on **Google Cloud Run** |
| **Database Datastore**| NoSQL Native Engine | **Google Cloud Firestore** |
| **Storage Infrastructure** | Object Media Repository | **Google Cloud Storage** |
| **Intelligence Engine**| Structured Signal Processing | **Gemini 2.5 Flash via Google GenAI SDK** |
| **Identity Layer** | Token-Based Session Control | **Firebase Authentication** (Google Provider) |

---

## 📂 2. Normalized Project Directory Structure

```text
eris-platform/
├── backend/                  # Google Cloud Run Target Microservice
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py           # FastAPI Core Entrypoint
│   │   ├── config.py         # Google Credentials & Environment Configuration
│   │   ├── routers/          # Structural Engine & Signal Routers
│   │   │   ├── matching.py   # Phase 2: Structural Matching Logic
│   │   │   └── signals.py    # Phase 3 & 4: Gemini Analytics Pipeline
│   │   └── services/
│   │       ├── firebase.py   # Firestore App SDK Singletons
│   │       └── gemini.py     # Vertex AI / Google GenAI Client Wrapper
│   ├── Dockerfile            # Container Blueprint for Cloud Run Deployments
│   ├── requirements.txt      # Python Dependencies (google-genai, firebase-admin)
│   └── service-account.json  # Git-ignored local local dev token
├── frontend/                 # Next.js Frontend Matrix
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Phase 1 Onboarding & Landing View
│   │   ├── dashboard/        # Phase 4 Dashboard Analytics Matrix
│   │   │   └── page.tsx
│   │   └── relationships/    # Phase 5 Lifecycle Visualization Interface
│   │       ├── page.tsx
│   │       └── [id]/page.tsx # Detail view + Reflection Log submission modal
│   ├── components/           # Atomic Shadcn Components
│   ├── lib/
│   │   └── firebase.ts       # Frontend Firebase Client SDK Engine
│   ├── .env.local            # Git-ignored environment mapping
│   └── tailwind.config.js    # Strict Interface Design Rules
├── firestore.rules           # Security Layer Configuration for Firestore
└── storage.rules             # Security Layer Configuration for Cloud Storage