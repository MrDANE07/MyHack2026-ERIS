import express, { Request, Response } from 'express'
import { db } from '../lib/firebase'
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore'

const router = express.Router()

const validTransitions: Record<string, string[]> = {
  'Created': ['Active'],
  'Active': ['Completed', 'Failed'],
  'Completed': [],
  'Failed': []
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const { relationship_id, new_status } = req.body

    if (!relationship_id || !new_status) {
      return res.status(400).json({ success: false, error: 'All fields are required' })
    }

    if (!['Created', 'Active', 'Completed', 'Failed'].includes(new_status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' })
    }

    // Respond immediately — don't block on Firestore
    res.json({ success: true, updated_status: new_status })

    // Update Firestore in the background
    const q = query(collection(db, 'relationships'), where('relationship_id', '==', relationship_id))
    getDocs(q).then(querySnapshot => {
      if (querySnapshot.empty) return
      const docSnap = querySnapshot.docs[0]
      return updateDoc(docSnap.ref, { status: new_status })
    }).catch((firebaseError: unknown) => {
      console.warn('Firestore update failed:', firebaseError)
    })
  } catch (error) {
    console.error('Error updating lifecycle:', error)
    res.status(500).json({ success: false, error: 'Failed to update lifecycle' })
  }
})

export default router
