import { GoogleGenerativeAI } from '@google/generative-ai'

const GENAI_API_KEY = process.env.GEMINI_API_KEY

if (!GENAI_API_KEY) {
  throw new Error('GEMINI_API_KEY is required')
}

const genAI = new GoogleGenerativeAI(GENAI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

export interface ExtractedSignals {
  clarity: number
  uncertainty: number
  engagement: number
  friction_level: number
  expectation_mismatch: number
  alignment_speed: number
  ambiguity_tolerance: number
}

export function isValidSignals(data: unknown): data is ExtractedSignals {
  if (typeof data !== 'object' || data === null) return false
  const d = data as Record<string, unknown>

  const isValidSignal = (val: unknown): boolean =>
    typeof val === 'number' && Number.isInteger(val) && val >= 1 && val <= 10

  return (
    isValidSignal(d.clarity) &&
    isValidSignal(d.uncertainty) &&
    isValidSignal(d.engagement) &&
    isValidSignal(d.friction_level) &&
    isValidSignal(d.expectation_mismatch) &&
    isValidSignal(d.alignment_speed) &&
    isValidSignal(d.ambiguity_tolerance)
  )
}

export async function extractSignals(summary: string): Promise<ExtractedSignals> {
  const { SIGNAL_EXTRACTION_PROMPT } = await import('./prompts.js')
  const prompt = SIGNAL_EXTRACTION_PROMPT(summary)

  const result = await model.generateContent(prompt)
  const text = result.response.text()

  try {
    const parsed = JSON.parse(text)
    if (!isValidSignals(parsed)) {
      throw new Error('Invalid signals structure')
    }
    return parsed
  } catch (error) {
    throw new Error('Failed to parse Gemini response')
  }
}
