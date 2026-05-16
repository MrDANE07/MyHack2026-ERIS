import express, { Request, Response } from 'express'
import { db } from '../lib/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { generateRelationshipSummary } from '../lib/explanations'
import { GoogleGenerativeAI } from '@google/generative-ai'

const router = express.Router()

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null

interface ExtractedSignals {
  clarity: number
  uncertainty: number
  engagement: number
  friction_level?: number
  expectation_mismatch?: number
  alignment_speed?: number
  ambiguity_tolerance?: number
}

async function extractSignalsFromGemini(summary: string): Promise<ExtractedSignals> {
  if (!genAI) {
    // Fallback to mock data if Gemini is not configured
    return {
      clarity: Math.floor(Math.random() * 10) + 1,
      uncertainty: Math.floor(Math.random() * 10) + 1,
      engagement: Math.floor(Math.random() * 10) + 1,
      friction_level: Math.floor(Math.random() * 10) + 1,
      expectation_mismatch: Math.floor(Math.random() * 10) + 1,
      alignment_speed: Math.floor(Math.random() * 10) + 1,
      ambiguity_tolerance: Math.floor(Math.random() * 10) + 1,
    }
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    const prompt = `Extract relationship signal metrics from this interaction summary. Return a JSON object with these fields (1-10 scale):
- clarity: How clear were the discussion topics and next steps?
- uncertainty: How much uncertainty was expressed?
- engagement: How engaged were both parties?
- friction_level: How much friction or disagreement emerged?
- expectation_mismatch: How much were expectations misaligned?
- alignment_speed: How quickly did they reach alignment?
- ambiguity_tolerance: How well did they handle ambiguous situations?

Interaction summary: "${summary}"

Return ONLY valid JSON, no other text.`

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    
    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        clarity: Math.max(1, Math.min(10, parsed.clarity || 5)),
        uncertainty: Math.max(1, Math.min(10, parsed.uncertainty || 5)),
        engagement: Math.max(1, Math.min(10, parsed.engagement || 5)),
        friction_level: Math.max(1, Math.min(10, parsed.friction_level || 5)),
        expectation_mismatch: Math.max(1, Math.min(10, parsed.expectation_mismatch || 5)),
        alignment_speed: Math.max(1, Math.min(10, parsed.alignment_speed || 5)),
        ambiguity_tolerance: Math.max(1, Math.min(10, parsed.ambiguity_tolerance || 5)),
      }
    }

    return {
      clarity: 5,
      uncertainty: 5,
      engagement: 5,
      friction_level: 5,
      expectation_mismatch: 5,
      alignment_speed: 5,
      ambiguity_tolerance: 5,
    }
  } catch (error) {
    console.warn('Gemini extraction failed, using defaults:', error)
    return {
      clarity: 5,
      uncertainty: 5,
      engagement: 5,
      friction_level: 5,
      expectation_mismatch: 5,
      alignment_speed: 5,
      ambiguity_tolerance: 5,
    }
  }
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const { relationship_id, summary } = req.body

    if (!relationship_id || !summary) {
      return res.status(400).json({ success: false, error: 'relationship_id and summary are required' })
    }

    if (summary.length < 10) {
      return res.status(400).json({ success: false, error: 'summary must be at least 10 characters' })
    }

    const signals = await extractSignalsFromGemini(summary)
    const relationshipSummary = generateRelationshipSummary({
      clarity: signals.clarity,
      uncertainty: signals.uncertainty,
      engagement: signals.engagement
    })

    // Respond immediately — don't block on Firestore
    res.json({
      success: true,
      signals,
      relationship_summary: relationshipSummary
    })

    // Write to Firestore in the background
    addDoc(collection(db, 'interactions'), {
      interaction_id: `INT-${Date.now()}`,
      relationship_id,
      summary,
      ...signals,
      created_at: Timestamp.now()
    }).catch((firebaseError: unknown) => {
      console.warn('Failed to save interaction to Firestore:', firebaseError)
    })
  } catch (error) {
    console.error('Error extracting signals:', error)
    res.status(500).json({ success: false, error: 'Failed to extract signals' })
  }
})

export default router
