import { MapPin } from 'lucide-react'
import { Card } from './ui/card'

export interface ProgrammeCardProps {
  id: string
  name: string
  country: string
  focus_areas: string[]
  status: 'Active' | 'Completed' | 'Upcoming'
  cohort_size: number
}

const statusColors = {
  Active: 'bg-emerald-500/10 text-emerald-400',
  Completed: 'bg-zinc-500/10 text-zinc-400',
  Upcoming: 'bg-cyan-500/10 text-cyan-400',
}

export default function ProgrammeCard({ name, country, focus_areas, status, cohort_size }: ProgrammeCardProps) {
  return (
    <Card className="p-5 flex flex-col gap-3 cursor-pointer hover:border-white/10 transition-colors">
      <div className="flex justify-between items-start">
        <h3 className="text-base font-medium">{name}</h3>
        <span className={`text-xs rounded-full px-2 py-0.5 ${statusColors[status]}`}>{status}</span>
      </div>

      <div>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <MapPin size={12} />
          {country}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {focus_areas.map((area, index) => (
            <span key={index} className="text-zinc-400 text-xs rounded-full px-2 py-0.5">
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground/60">Cohort size: {cohort_size}</div>
    </Card>
  )
}
