import express, { Request, Response } from 'express'
import { db } from '../lib/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const { startup_id, mentor_id, compatibility_score } = req.body

    if (!startup_id || !mentor_id || compatibility_score === undefined) {
      return res.status(400).json({
        success: false,
        error: 'All fields (startup_id, mentor_id, compatibility_score) are required'
      })
    }

    const relationship_id = `REL-${Date.now()}`
    
    try {
      const docRef = await addDoc(collection(db, 'relationships'), {
        relationship_id,
        startup_id,
        mentor_id,
        compatibility_score,
        status: 'Created',
        created_at: Timestamp.now()
      })
      
      res.json({ success: true, relationship_id })
    } catch (firebaseError) {
      // If Firebase fails, still return the relationship_id for offline mode
      console.warn('Firestore write failed:', firebaseError)
      res.json({ success: true, relationship_id })
    }
  } catch (error) {
    console.error('Error creating relationship:', error)
    res.status(500).json({ success: false, error: 'Failed to create relationship' })
  }
})

export default router
