"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_1 = require("../lib/firebase");
const firestore_1 = require("firebase/firestore");
const fakeData_1 = require("../lib/fakeData");
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    try {
        let totalRelationships = 0;
        let activeRelationships = 0;
        let totalInteractions = 0;
        const mentorDomainsCount = {};
        try {
            // Get relationships stats
            const relsSnapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'relationships'));
            totalRelationships = relsSnapshot.size;
            relsSnapshot.forEach(doc => {
                if (doc.data().status === 'Active') {
                    activeRelationships++;
                }
            });
            // Get interactions stats
            const interSnapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.db, 'interactions'));
            totalInteractions = interSnapshot.size;
        }
        catch (firebaseError) {
            console.warn('Firestore query failed, using defaults:', firebaseError);
        }
        // Calculate top mentor domains from static data
        fakeData_1.mentors.forEach(mentor => {
            mentor.expertise.forEach(domain => {
                mentorDomainsCount[domain] = (mentorDomainsCount[domain] || 0) + 1;
            });
        });
        const topMentorDomains = Object.entries(mentorDomainsCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([domain]) => domain);
        res.json({
            success: true,
            data: {
                total_relationships: totalRelationships,
                active_relationships: activeRelationships,
                total_interactions: totalInteractions,
                top_mentor_domains: topMentorDomains
            }
        });
    }
    catch (error) {
        console.error('Error fetching ecosystem stats:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch ecosystem stats' });
    }
});
exports.default = router;
