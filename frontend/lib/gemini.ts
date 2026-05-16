// ERIS Gemini API Client

import { SIGNAL_EXTRACTION_PROMPT } from './prompts'
import type { Signals } from './types'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL = 'gemini-2.5-flash'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string
      }>
    }
  }>
  error?: {
    message: string
  }
}

/**
 * Validate extracted signals match expected schema
 */
export function isValidSignals(data: unknown): data is Signals {
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

/**
 * Parse JSON from Gemini response, handling potential formatting issues
 */
function parseGeminiJSON(text: string): unknown {
  // Remove any markdown code fences if present
  let cleaned = text.trim()
  
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7)
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3)
  }
  
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3)
  }
  
  cleaned = cleaned.trim()
  
  return JSON.parse(cleaned)
}

/**
 * Extract signals from an interaction summary using Gemini
 */
export async function extractSignals(summary: string): Promise<Signals> {
  if (!GEMINI_API_KEY) {
    // Fallback to mock signals when API key not available
    console.log('[ERIS] No Gemini API key - using mock signal extraction')
    return generateMockSignals(summary)
  }

  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: SIGNAL_EXTRACTION_PROMPT(summary)
          }]
        }],
        generationConfig: {
          temperature: 0.1, // Low temperature for consistent JSON output
          maxOutputTokens: 100,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const result: GeminiResponse = await response.json()

    if (result.error) {
      throw new Error(result.error.message)
    }

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      throw new Error('No response from Gemini')
    }

    const parsed = parseGeminiJSON(text)

    if (!isValidSignals(parsed)) {
      throw new Error('Invalid signals format from Gemini')
    }

    return parsed
  } catch (error) {
    console.error('[ERIS] Gemini extraction failed:', error)
    // Fallback to mock signals
    return generateMockSignals(summary)
  }
}

/**
 * Generate mock signals based on summary content
 * Used when Gemini API is unavailable
 */
function generateMockSignals(summary: string): Signals {
  const lowerSummary = summary.toLowerCase()
  
  // Simple heuristic-based signal generation
  let clarity = 5
  let uncertainty = 5
  let engagement = 5

  // Positive clarity indicators
  if (lowerSummary.includes('clarified') || lowerSummary.includes('clear') || lowerSummary.includes('agreed')) {
    clarity += 2
  }
  if (lowerSummary.includes('decided') || lowerSummary.includes('confirmed')) {
    clarity += 1
  }

  // Uncertainty indicators
  if (lowerSummary.includes('question') || lowerSummary.includes('uncertain') || lowerSummary.includes('unclear')) {
    uncertainty += 2
  }
  if (lowerSummary.includes('open') || lowerSummary.includes('remain') || lowerSummary.includes('need to')) {
    uncertainty += 1
  }

  // Engagement indicators
  if (lowerSummary.includes('discussed') || lowerSummary.includes('reviewed') || lowerSummary.includes('explored')) {
    engagement += 2
  }
  if (lowerSummary.includes('productive') || lowerSummary.includes('great') || lowerSummary.includes('excellent')) {
    engagement += 1
  }

  // Clamp values to 1-10
  return {
    clarity: Math.max(1, Math.min(10, clarity)),
    uncertainty: Math.max(1, Math.min(10, uncertainty)),
    engagement: Math.max(1, Math.min(10, engagement))
  }
}
