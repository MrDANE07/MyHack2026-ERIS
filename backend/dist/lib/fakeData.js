"use strict";
// Static synthetic seed data (immutable)
Object.defineProperty(exports, "__esModule", { value: true });
exports.seededRelationshipHistory = exports.serviceProviders = exports.partners = exports.programmes = exports.mentors = exports.startups = void 0;
exports.startups = [
    {
        id: 'startup_1',
        name: 'NeuroFlow AI',
        domain: ['AI', 'Healthcare'],
        stage: 2,
        needs: ['Fundraising', 'B2B Sales'],
        goals: ['Product-Market Fit'],
        verified: true
    }
];
exports.mentors = [
    {
        id: 'mentor_1',
        name: 'Sarah Lim',
        expertise: ['Fundraising', 'Enterprise Sales'],
        preferred_stage: 2,
        availability: 'Weekly',
        verified: true
    },
    {
        id: 'mentor_2',
        name: 'David Tan',
        expertise: ['Product Strategy', 'B2B Sales'],
        preferred_stage: 2,
        availability: 'Bi-Weekly',
        verified: true
    }
];
exports.programmes = [
    {
        id: 'prog_1',
        name: 'Cradle CIP Accelerate 2026 — Malaysia',
        country: 'Malaysia',
        focus_areas: ['AI', 'Healthcare', 'FinTech'],
        status: 'Active',
        cohort_size: 12
    },
    {
        id: 'prog_2',
        name: 'Cradle GENESIS 2025 — — Singapore',
        country: 'Singapore',
        focus_areas: ['SaaS', 'B2B', 'Enterprise'],
        status: 'Completed',
        cohort_size: 8
    }
];
exports.partners = [
    {
        id: 'partner_1',
        name: 'Sunway Group',
        type: 'Corporate',
        initiatives: ['Sunway iLabs Cohort 2026'],
        country: 'Malaysia'
    },
    {
        id: 'partner_2',
        name: 'MDEC',
        type: 'Government',
        initiatives: ['MyDIGITAL Accelerator'],
        country: 'Malaysia'
    }
];
exports.serviceProviders = [
    {
        id: 'sp_1',
        name: 'LegalEase MY',
        services: ['Company Incorporation', 'IP Filing'],
        verified: true
    },
    {
        id: 'sp_2',
        name: 'CloudScale Asia',
        services: ['Cloud Infrastructure', 'DevOps'],
        verified: true
    }
];
exports.seededRelationshipHistory = [
    { week: 1, clarity: 3, uncertainty: 9, engagement: 5 },
    { week: 2, clarity: 5, uncertainty: 7, engagement: 6 }
];
