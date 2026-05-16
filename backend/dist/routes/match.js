"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fakeData_1 = require("../lib/fakeData");
const scoring_1 = require("../lib/scoring");
const explanations_1 = require("../lib/explanations");
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const { startup_id } = req.body;
        if (!startup_id) {
            return res.status(400).json({ success: false, error: 'startup_id is required' });
        }
        const startup = fakeData_1.startups.find(s => s.id === startup_id);
        if (!startup) {
            return res.status(400).json({ success: false, error: 'Startup not found' });
        }
        const matches = fakeData_1.mentors.map(mentor => {
            const score = (0, scoring_1.calculateCompatibility)(startup, mentor);
            const explanation = (0, explanations_1.generateMatchExplanation)(startup, mentor, score);
            return {
                mentor_id: mentor.id,
                mentor_name: mentor.name,
                mentor_expertise: mentor.expertise,
                compatibility_score: score,
                explanation
            };
        }).sort((a, b) => b.compatibility_score - a.compatibility_score);
        res.json({ success: true, data: { matches } });
    }
    catch (error) {
        console.error('Error generating matches:', error);
        res.status(500).json({ success: false, error: 'Failed to generate matches' });
    }
});
exports.default = router;
