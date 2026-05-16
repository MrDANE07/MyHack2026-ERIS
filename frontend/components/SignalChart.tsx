'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { GraphDataPoint } from '@/lib/types'

interface SignalChartProps {
  graphData: GraphDataPoint[]
}

export function SignalChart({ graphData }: SignalChartProps) {
  if (graphData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        No interaction data yet. Submit an interaction to see signals.
      </div>
    )
  }

  const colors = {
    teal: 'hsl(166, 100%, 50%)',
    violet: 'hsl(275, 100%, 69%)',
    amber: 'hsl(38, 100%, 59%)',
    grid: 'hsl(var(--border))',
    text: 'hsl(var(--muted-foreground))',
    card: 'hsl(var(--card))',
    border: 'hsl(var(--border))'
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={graphData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} opacity={0.3} />
          <XAxis
            dataKey="week"
            tickFormatter={(value) => `W${value}`}
            className="text-xs"
            stroke={colors.text}
            fontSize={12}
          />
          <YAxis
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
            className="text-xs"
            stroke={colors.text}
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              fontSize: '14px',
              boxShadow: '0 0 20px hsla(166, 100%, 50%, 0.1)',
            }}
            labelFormatter={(value) => `Week ${value}`}
          />
          <Legend
            wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="clarity"
            name="Clarity"
            stroke={colors.teal}
            strokeWidth={2.5}
            dot={{ fill: colors.teal, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 3, stroke: colors.teal }}
            animationDuration={800}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="uncertainty"
            name="Uncertainty"
            stroke={colors.violet}
            strokeWidth={2.5}
            dot={{ fill: colors.violet, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 3, stroke: colors.violet }}
            animationDuration={800}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="engagement"
            name="Engagement"
            stroke={colors.amber}
            strokeWidth={2.5}
            dot={{ fill: colors.amber, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 3, stroke: colors.amber }}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
