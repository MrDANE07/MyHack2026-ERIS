import express, { Request, Response } from 'express'
import { db } from '../lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { mentors } from '../lib/fakeData'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    let totalRelationships = 0
    let activeRelationships = 0
    let totalInteractions = 0
    let totalMentors = 0
    let totalStartups = 0
    let programmes = 0
    const mentorDomainsCount: Record<string, number> = {}

    try {
      // Get relationships stats
      const relsSnapshot = await getDocs(collection(db, 'relationships'))
      totalRelationships = relsSnapshot.size
      
      relsSnapshot.forEach(doc => {
        if (doc.data().status === 'Active') {
          activeRelationships++
        }
      })

      // Get interactions stats
      const interSnapshot = await getDocs(collection(db, 'interactions'))
      totalInteractions = interSnapshot.size

      // Get mentor stats
      const mentorsSnapshot = await getDocs(collection(db, 'mentors'))
      totalMentors = mentorsSnapshot.size

      // Get startup stats
      const startupsSnapshot = await getDocs(collection(db, 'startups'))
      totalStartups = startupsSnapshot.size

      // Get programme stats
      const programsSnapshot = await getDocs(collection(db, 'programmes'))
      programmes = programsSnapshot.size
    } catch (firebaseError) {
      console.warn('Firestore query failed, using defaults:', firebaseError)
      // Fall back to fake data length
      totalMentors = mentors.length
    }

    // Calculate top mentor domains from static data
    mentors.forEach(mentor => {
      mentor.expertise.forEach(domain => {
        mentorDomainsCount[domain] = (mentorDomainsCount[domain] || 0) + 1
      })
    })

    const topMentorDomains = Object.entries(mentorDomainsCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([domain]) => domain)

    res.json({
      success: true,
      data: {
        total_relationships: totalRelationships,
        active_relationships: activeRelationships,
        total_interactions: totalInteractions,
        top_mentor_domains: topMentorDomains,
        totalMentors,
        totalStartups,
        programmes
      }
    })
  } catch (error) {
    console.error('Error fetching ecosystem stats:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch ecosystem stats' })
  }
})

export default router
