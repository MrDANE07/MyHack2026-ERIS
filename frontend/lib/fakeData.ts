// ERIS Static Synthetic Seed Data (Immutable)

import type { Startup, Mentor, Programme, Partner, ServiceProvider, GraphDataPoint, Relationship, Interaction } from './types'

export const startups: Startup[] = [
  {
    id: "startup_1",
    name: "NeuroFlow AI",
    domain: ["AI", "Healthcare"],
    stage: 2,
    needs: ["Fundraising", "B2B Sales"],
    goals: ["Product-Market Fit"],
    verified: true
  },
  {
    id: "startup_2",
    name: "GreenTech Solutions",
    domain: ["CleanTech", "IoT"],
    stage: 1,
    needs: ["Product Strategy", "Market Research"],
    goals: ["MVP Launch"],
    verified: true
  },
  {
    id: "startup_3",
    name: "FinSecure",
    domain: ["FinTech", "Cybersecurity"],
    stage: 3,
    needs: ["Enterprise Sales", "Compliance"],
    goals: ["Series A"],
    verified: false
  }
]

export const mentors: Mentor[] = [
  {
    id: "mentor_1",
    name: "Sarah Lim",
    expertise: ["Fundraising", "Enterprise Sales"],
    preferred_stage: 2,
    availability: "Weekly",
    verified: true
  },
  {
    id: "mentor_2",
    name: "David Tan",
    expertise: ["Product Strategy", "B2B Sales"],
    preferred_stage: 2,
    availability: "Bi-Weekly",
    verified: true
  },
  {
    id: "mentor_3",
    name: "Aisha Rahman",
    expertise: ["AI", "Healthcare", "Product-Market Fit"],
    preferred_stage: 2,
    availability: "Weekly",
    verified: true
  },
  {
    id: "mentor_4",
    name: "James Chen",
    expertise: ["FinTech", "Compliance", "Enterprise Sales"],
    preferred_stage: 3,
    availability: "Monthly",
    verified: true
  },
  {
    id: "mentor_5",
    name: "Maria Santos",
    expertise: ["CleanTech", "Market Research", "Sustainability"],
    preferred_stage: 1,
    availability: "Bi-Weekly",
    verified: false
  }
]

export const programmes: Programme[] = [
  {
    id: "prog_1",
    name: "Cradle CIP Accelerate 2026 — Malaysia",
    country: "Malaysia",
    focus_areas: ["AI", "Healthcare", "FinTech"],
    status: "Active",
    cohort_size: 12
  },
  {
    id: "prog_2",
    name: "Cradle GENESIS 2025 — Singapore",
    country: "Singapore",
    focus_areas: ["SaaS", "B2B", "Enterprise"],
    status: "Completed",
    cohort_size: 8
  },
  {
    id: "prog_3",
    name: "MDEC Digital Accelerator 2026",
    country: "Malaysia",
    focus_areas: ["Digital Transformation", "E-commerce"],
    status: "Upcoming",
    cohort_size: 15
  }
]

export const partners: Partner[] = [
  {
    id: "partner_1",
    name: "Sunway Group",
    type: "Corporate",
    initiatives: ["Sunway iLabs Cohort 2026"],
    country: "Malaysia"
  },
  {
    id: "partner_2",
    name: "MDEC",
    type: "Government",
    initiatives: ["MyDIGITAL Accelerator"],
    country: "Malaysia"
  },
  {
    id: "partner_3",
    name: "NUS Enterprise",
    type: "Academic",
    initiatives: ["GRIP Programme", "NUS Overseas Colleges"],
    country: "Singapore"
  },
  {
    id: "partner_4",
    name: "TechNode Global",
    type: "Corporate",
    initiatives: ["SEA Startup Summit"],
    country: "Singapore"
  }
]

export const serviceProviders: ServiceProvider[] = [
  {
    id: "sp_1",
    name: "LegalEase MY",
    services: ["Company Incorporation", "IP Filing"],
    verified: true
  },
  {
    id: "sp_2",
    name: "CloudScale Asia",
    services: ["Cloud Infrastructure", "DevOps"],
    verified: true
  },
  {
    id: "sp_3",
    name: "TalentBridge",
    services: ["Tech Recruitment", "HR Consulting"],
    verified: true
  },
  {
    id: "sp_4",
    name: "AuditPro",
    services: ["Financial Audit", "Tax Advisory"],
    verified: false
  }
]

export const seededRelationshipHistory: GraphDataPoint[] = [
  { week: 1, clarity: 3, uncertainty: 9, engagement: 5 },
  { week: 2, clarity: 5, uncertainty: 7, engagement: 6 }
]

// Mock runtime data (simulating Firestore)
export const mockRelationships: Relationship[] = [
  {
    relationship_id: "REL-001",
    startup_id: "startup_1",
    mentor_id: "mentor_1",
    compatibility_score: 87,
    status: "Active",
    created_at: "2026-05-14T10:00:00Z"
  },
  {
    relationship_id: "REL-002",
    startup_id: "startup_1",
    mentor_id: "mentor_2",
    compatibility_score: 72,
    status: "Created",
    created_at: "2026-05-15T09:30:00Z"
  }
]

export const mockInteractions: Interaction[] = [
  {
    interaction_id: "INT-001",
    relationship_id: "REL-001",
    summary: "Discussed narrowing customer focus and clarified Series A fundraising priorities.",
    clarity: 8,
    uncertainty: 4,
    engagement: 8,
    created_at: "2026-05-14T11:00:00Z"
  },
  {
    interaction_id: "INT-002",
    relationship_id: "REL-001",
    summary: "Reviewed pitch deck structure. Several open questions remain on market sizing.",
    clarity: 5,
    uncertainty: 7,
    engagement: 6,
    created_at: "2026-05-15T14:30:00Z"
  }
]

// Helper functions to get data
export function getStartupById(id: string): Startup | undefined {
  return startups.find(s => s.id === id)
}

export function getMentorById(id: string): Mentor | undefined {
  return mentors.find(m => m.id === id)
}

export function getProgrammeById(id: string): Programme | undefined {
  return programmes.find(p => p.id === id)
}
