"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMatchExplanation = generateMatchExplanation;
exports.generateRelationshipSummary = generateRelationshipSummary;
function generateMatchExplanation(startup, mentor, score) {
    const domainMatch = startup.domain.some(d => mentor.expertise.includes(d));
    const stageMatch = startup.stage === mentor.preferred_stage;
    const needMatch = startup.needs.some(n => mentor.expertise.includes(n));
    if (score >= 80) {
        return 'Strong match due to aligned expertise and compatible startup stage.';
    }
    if (score >= 60) {
        return 'Moderate match with some expertise overlap.';
    }
    return 'Limited compatibility based on current startup needs.';
}
function generateRelationshipSummary(signals) {
    const { clarity, uncertainty, engagement } = signals;
    if (clarity >= 7 && uncertainty <= 4 && engagement >= 7) {
        return 'Relationship demonstrates strong clarity, sustained engagement, and low uncertainty.';
    }
    if (clarity <= 4) {
        return 'Relationship shows clarity gaps — recommend focus session on goals.';
    }
    if (engagement <= 4) {
        return 'Engagement levels are declining — consider check-in with both parties.';
    }
    return 'Relationship progressing normally with balanced signals.';
}
