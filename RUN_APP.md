# 🚀 ERIS App — Run Instructions

## ✅ What's Been Fixed

### Frontend (Next.js 14)
- ✅ Added `'use client'` directives to layout.tsx and dashboard/page.tsx
- ✅ Fixed all component exports with proper default exports
- ✅ Added missing Tailwind utilities (fade-up animations, font-heading)
- ✅ **Frontend now builds successfully without errors**

### Backend (Express.js)
- ✅ Implemented `/api/match` — AI mentor matching with scoring algorithm
- ✅ Implemented `/api/create-relationship` — Create relationships with Firestore fallback
- ✅ Implemented `/api/extract-signals` — Gemini AI signal extraction (with mock fallback)
- ✅ Implemented `/api/update-lifecycle` — Lifecycle status transitions with validation
- ✅ Implemented `/api/ecosystem-stats` — Live ecosystem statistics
- ✅ **Backend compiles successfully**

---

## 🎯 How to Run Locally

### Prerequisites
- Node.js 20+ LTS installed
- `npm install` already run in both frontend/ and backend/

### Step 1: Set up Backend Credentials (OPTIONAL)
If you want to use real Gemini AI and Firebase, add credentials to `backend/.env`:

```env
PORT=3001

# Firebase (optional for local testing)
FIREBASE_API_KEY=YOUR_KEY
FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
FIREBASE_PROJECT_ID=YOUR_PROJECT
FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
FIREBASE_MESSAGING_SENDER_ID=YOUR_ID
FIREBASE_APP_ID=YOUR_APP_ID

# Gemini (optional for local testing)
GEMINI_API_KEY=YOUR_GEMINI_KEY
```

**Without credentials:** App works with mock data and mock Gemini responses.

### Step 2: Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```
✅ Server runs on `http://localhost:3001`

### Step 3: Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
✅ App opens on `http://localhost:3000`

---

## 📋 What You Can Do Now

### Dashboard (`/dashboard`)
- View startup profile (NeuroFlow AI)
- Click "Generate Matches" → calls backend matching algorithm

### Matching (`/matching`)
- View AI-generated mentor matches with compatibility scores
- See explanations for each match
- Click "Create Relationship" → generates new relationship

### Relationship (`/relationship/[id]`)
- View relationship details with live startup-mentor pairing
- Submit interactions to extract AI signals
- Change relationship lifecycle (Created → Active → Completed/Failed)
- View signal chart of clarity, uncertainty, engagement

### Programmes (`/programmes`)
- View available programmes and partners

---

## 🛠️ Troubleshooting

### Frontend won't start?
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend won't start?
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run build
npm run dev
```

### CORS errors?
Make sure **both servers are running**:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Firebase/Gemini not working?
This is expected without credentials. The app falls back to:
- Mock relationship data
- Mock signal values (random 1–10 for each signal)
- Mock explanations

---

## 📊 API Health Check

Visit `http://localhost:3001/health` — should return:
```json
{ "status": "ok", "timestamp": "2026-05-16T..." }
```

---

## 🎨 Architecture

```
Frontend (Next.js 14, port 3000)
    ↓ (HTTP via frontend/lib/api.ts)
Backend (Express.js 4, port 3001)
    ↓ (Firestore SDK + Gemini API)
Firebase Firestore (optional)
Google Gemini API (optional)
```

**All API responses follow the pattern:**
```json
{ "success": true/false, "data": {...} OR "error": "..." }
```

---

## ✨ Next Steps

1. **Add Firebase credentials** → Persist data to Firestore
2. **Add Gemini API key** → Real AI signal extraction
3. **Deploy:**
   - Frontend → Vercel (free tier)
   - Backend → Railway / Render (free tier)

---

**Happy hacking!** 🚀
