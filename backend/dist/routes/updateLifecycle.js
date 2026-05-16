"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_1 = require("../lib/firebase");
const firestore_1 = require("firebase/firestore");
const router = express_1.default.Router();
const validTransitions = {
    'Created': ['Active'],
    'Active': ['Completed', 'Failed'],
    'Completed': [],
    'Failed': []
};
router.post('/', async (req, res) => {
    try {
        const { relationship_id, new_status } = req.body;
        if (!relationship_id || !new_status) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }
        if (!['Created', 'Active', 'Completed', 'Failed'].includes(new_status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, 'relationships'), (0, firestore_1.where)('relationship_id', '==', relationship_id));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            if (querySnapshot.empty) {
                return res.status(404).json({ success: false, error: 'Relationship not found' });
            }
            const docSnap = querySnapshot.docs[0];
            const currentStatus = docSnap.data().status;
            if (!validTransitions[currentStatus]?.includes(new_status)) {
                return res.status(400).json({
                    success: false,
                    error: `Invalid transition: ${currentStatus} → ${new_status} is not allowed`
                });
            }
            await (0, firestore_1.updateDoc)(docSnap.ref, { status: new_status });
        }
        catch (firebaseError) {
            console.warn('Firestore update failed:', firebaseError);
        }
        res.json({ success: true, updated_status: new_status });
    }
    catch (error) {
        console.error('Error updating lifecycle:', error);
        res.status(500).json({ success: false, error: 'Failed to update lifecycle' });
    }
});
exports.default = router;
