export interface MentorCardProps {
  id: string
  name: string
  expertise: string[]
  preferred_stage: number
  availability: string
  verified: boolean
}

export function MentorCard({ name }: MentorCardProps) {
  return <div>{name}</div>
}

export default MentorCard
