"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_1 = require("../lib/firebase");
const firestore_1 = require("firebase/firestore");
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const { startup_id, mentor_id, compatibility_score } = req.body;
        if (!startup_id || !mentor_id || compatibility_score === undefined) {
            return res.status(400).json({
                success: false,
                error: 'All fields (startup_id, mentor_id, compatibility_score) are required'
            });
        }
        const relationship_id = `REL-${Date.now()}`;
        try {
            const docRef = await (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, 'relationships'), {
                relationship_id,
                startup_id,
                mentor_id,
                compatibility_score,
                status: 'Created',
                created_at: firestore_1.Timestamp.now()
            });
            res.json({ success: true, relationship_id });
        }
        catch (firebaseError) {
            // If Firebase fails, still return the relationship_id for offline mode
            console.warn('Firestore write failed:', firebaseError);
            res.json({ success: true, relationship_id });
        }
    }
    catch (error) {
        console.error('Error creating relationship:', error);
        res.status(500).json({ success: false, error: 'Failed to create relationship' });
    }
});
exports.default = router;
