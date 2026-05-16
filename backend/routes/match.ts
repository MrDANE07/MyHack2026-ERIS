import express, { Request, Response } from 'express'
import { startups, mentors } from '../lib/fakeData'
import { calculateCompatibility } from '../lib/scoring'
import { generateMatchExplanation } from '../lib/explanations'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { startup_id } = req.body

    if (!startup_id) {
      return res.status(400).json({ success: false, error: 'startup_id is required' })
    }

    const startup = startups.find(s => s.id === startup_id)
    if (!startup) {
      return res.status(400).json({ success: false, error: 'Startup not found' })
    }

    const matches = mentors.map(mentor => {
      const score = calculateCompatibility(startup, mentor)
      const explanation = generateMatchExplanation(startup, mentor, score)
      return {
        mentor_id: mentor.id,
        mentor_name: mentor.name,
        mentor_expertise: mentor.expertise,
        compatibility_score: score,
        explanation
      }
    }).sort((a, b) => b.compatibility_score - a.compatibility_score)

    res.json({ success: true, data: { matches } })
  } catch (error) {
    console.error('Error generating matches:', error)
    res.status(500).json({ success: false, error: 'Failed to generate matches' })
  }
})

export default router
