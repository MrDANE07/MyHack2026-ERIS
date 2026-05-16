"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidSignals = isValidSignals;
exports.extractSignals = extractSignals;
const generative_ai_1 = require("@google/generative-ai");
const GENAI_API_KEY = process.env.GEMINI_API_KEY;
if (!GENAI_API_KEY) {
    throw new Error('GEMINI_API_KEY is required');
}
const genAI = new generative_ai_1.GoogleGenerativeAI(GENAI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
function isValidSignals(data) {
    if (typeof data !== 'object' || data === null)
        return false;
    const d = data;
    const isValidSignal = (val) => typeof val === 'number' && Number.isInteger(val) && val >= 1 && val <= 10;
    return (isValidSignal(d.clarity) &&
        isValidSignal(d.uncertainty) &&
        isValidSignal(d.engagement) &&
        isValidSignal(d.friction_level) &&
        isValidSignal(d.expectation_mismatch) &&
        isValidSignal(d.alignment_speed) &&
        isValidSignal(d.ambiguity_tolerance));
}
async function extractSignals(summary) {
    const { SIGNAL_EXTRACTION_PROMPT } = await Promise.resolve().then(() => __importStar(require('./prompts')));
    const prompt = SIGNAL_EXTRACTION_PROMPT(summary);
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    try {
        const parsed = JSON.parse(text);
        if (!isValidSignals(parsed)) {
            throw new Error('Invalid signals structure');
        }
        return parsed;
    }
    catch (error) {
        throw new Error('Failed to parse Gemini response');
    }
}
