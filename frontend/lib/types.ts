// ERIS TypeScript Interfaces - Source of Truth

export interface Startup {
  id: string
  name: string
  domain: string[]
  stage: number
  needs: string[]
  goals: string[]
  verified: boolean
}

export interface Mentor {
  id: string
  name: string
  expertise: string[]
  preferred_stage: number
  availability: "Weekly" | "Bi-Weekly" | "Monthly"
  verified: boolean
}

export interface Programme {
  id: string
  name: string
  country: string
  focus_areas: string[]
  status: "Active" | "Completed" | "Upcoming"
  cohort_size: number
}

export interface Partner {
  id: string
  name: string
  type: "Corporate" | "Government" | "Academic" | "NGO"
  initiatives: string[]
  country: string
}

export interface ServiceProvider {
  id: string
  name: string
  services: string[]
  verified: boolean
}

export interface Relationship {
  relationship_id: string
  startup_id: string
  mentor_id: string
  compatibility_score: number
  status: "Created" | "Active" | "Completed" | "Failed"
  created_at: string
}

export interface Interaction {
  interaction_id: string
  relationship_id: string
  summary: string
  clarity: number
  uncertainty: number
  engagement: number
  created_at: string
}

export interface CompanyProgramme {
  assignment_id: string
  startup_id: string
  programme_id: string
  assigned_at: string
  status: "Active" | "Completed" | "Withdrawn"
}

export interface GraphDataPoint {
  week: number
  clarity: number
  uncertainty: number
  engagement: number
}

export interface MatchResult {
  mentor_id: string
  mentor_name: string
  compatibility_score: number
  explanation: string
  expertise: string[]
  availability: string
  verified: boolean
}

export interface Signals {
  clarity: number
  uncertainty: number
  engagement: number
}

export interface EcosystemStats {
  total_relationships: number
  active_relationships: number
  total_interactions: number
  top_mentor_domains: string[]
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export interface MatchResponse {
  success: boolean
  matches?: MatchResult[]
  error?: string
}

export interface CreateRelationshipResponse {
  success: boolean
  relationship_id?: string
  error?: string
}

export interface ExtractSignalsResponse {
  success: boolean
  signals?: Signals
  relationship_summary?: string
  error?: string
}

export interface UpdateLifecycleResponse {
  success: boolean
  updated_status?: string
  error?: string
}

export interface EcosystemStatsResponse {
  success: boolean
  stats?: EcosystemStats
  error?: string
}

export interface ProgrammesResponse {
  success: boolean
  data?: {
    programmes: Programme[]
    partners: Partner[]
    serviceProviders: ServiceProvider[]
  }
  error?: string
}
