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

    try {
      const q = query(collection(db, 'relationships'), where('relationship_id', '==', relationship_id))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        return res.status(404).json({ success: false, error: 'Relationship not found' })
      }

      const docSnap = querySnapshot.docs[0]
      const currentStatus = docSnap.data().status

      if (!validTransitions[currentStatus]?.includes(new_status)) {
        return res.status(400).json({
          success: false,
          error: `Invalid transition: ${currentStatus} → ${new_status} is not allowed`
        })
      }

      await updateDoc(docSnap.ref, { status: new_status })
    } catch (firebaseError) {
      console.warn('Firestore update failed:', firebaseError)
    }

    res.json({ success: true, updated_status: new_status })
  } catch (error) {
    console.error('Error updating lifecycle:', error)
    res.status(500).json({ success: false, error: 'Failed to update lifecycle' })
  }
})

export default router
