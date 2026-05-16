"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_1 = require("../lib/firebase");
const firestore_1 = require("firebase/firestore");
const explanations_1 = require("../lib/explanations");
const generative_ai_1 = require("@google/generative-ai");
const router = express_1.default.Router();
const genAI = process.env.GEMINI_API_KEY ? new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
async function extractSignalsFromGemini(summary) {
    if (!genAI) {
        // Fallback to mock data if Gemini is not configured
        return {
            clarity: Math.floor(Math.random() * 10) + 1,
            uncertainty: Math.floor(Math.random() * 10) + 1,
            engagement: Math.floor(Math.random() * 10) + 1,
            friction_level: Math.floor(Math.random() * 10) + 1,
            expectation_mismatch: Math.floor(Math.random() * 10) + 1,
            alignment_speed: Math.floor(Math.random() * 10) + 1,
            ambiguity_tolerance: Math.floor(Math.random() * 10) + 1,
        };
    }
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const prompt = `Extract relationship signal metrics from this interaction summary. Return a JSON object with these fields (1-10 scale):
- clarity: How clear were the discussion topics and next steps?
- uncertainty: How much uncertainty was expressed?
- engagement: How engaged were both parties?
- friction_level: How much friction or disagreement emerged?
- expectation_mismatch: How much were expectations misaligned?
- alignment_speed: How quickly did they reach alignment?
- ambiguity_tolerance: How well did they handle ambiguous situations?

Interaction summary: "${summary}"

Return ONLY valid JSON, no other text.`;
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        // Parse JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
                clarity: Math.max(1, Math.min(10, parsed.clarity || 5)),
                uncertainty: Math.max(1, Math.min(10, parsed.uncertainty || 5)),
                engagement: Math.max(1, Math.min(10, parsed.engagement || 5)),
                friction_level: Math.max(1, Math.min(10, parsed.friction_level || 5)),
                expectation_mismatch: Math.max(1, Math.min(10, parsed.expectation_mismatch || 5)),
                alignment_speed: Math.max(1, Math.min(10, parsed.alignment_speed || 5)),
                ambiguity_tolerance: Math.max(1, Math.min(10, parsed.ambiguity_tolerance || 5)),
            };
        }
        return {
            clarity: 5,
            uncertainty: 5,
            engagement: 5,
            friction_level: 5,
            expectation_mismatch: 5,
            alignment_speed: 5,
            ambiguity_tolerance: 5,
        };
    }
    catch (error) {
        console.warn('Gemini extraction failed, using defaults:', error);
        return {
            clarity: 5,
            uncertainty: 5,
            engagement: 5,
            friction_level: 5,
            expectation_mismatch: 5,
            alignment_speed: 5,
            ambiguity_tolerance: 5,
        };
    }
}
router.post('/', async (req, res) => {
    try {
        const { relationship_id, summary } = req.body;
        if (!relationship_id || !summary) {
            return res.status(400).json({ success: false, error: 'relationship_id and summary are required' });
        }
        if (summary.length < 10) {
            return res.status(400).json({ success: false, error: 'summary must be at least 10 characters' });
        }
        const signals = await extractSignalsFromGemini(summary);
        const relationshipSummary = (0, explanations_1.generateRelationshipSummary)({
            clarity: signals.clarity,
            uncertainty: signals.uncertainty,
            engagement: signals.engagement
        });
        // Save interaction to Firestore (with graceful fallback)
        try {
            const interaction_id = `INT-${Date.now()}`;
            await (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_1.db, 'interactions'), {
                interaction_id,
                relationship_id,
                summary,
                ...signals,
                created_at: firestore_1.Timestamp.now()
            });
        }
        catch (firebaseError) {
            console.warn('Failed to save interaction to Firestore:', firebaseError);
        }
        res.json({
            success: true,
            signals,
            relationship_summary: relationshipSummary
        });
    }
    catch (error) {
        console.error('Error extracting signals:', error);
        res.status(500).json({ success: false, error: 'Failed to extract signals' });
    }
});
exports.default = router;
