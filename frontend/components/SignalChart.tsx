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

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={graphData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
          <XAxis
            dataKey="week"
            tickFormatter={(value) => `W${value}`}
            className="text-xs"
            stroke="var(--muted-foreground)"
          />
          <YAxis
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
            className="text-xs"
            stroke="var(--muted-foreground)"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '14px',
            }}
            labelFormatter={(value) => `Week ${value}`}
          />
          <Legend
            wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
          />
          <Line
            type="monotone"
            dataKey="clarity"
            name="Clarity"
            stroke="var(--chart-1)"
            strokeWidth={2}
            dot={{ fill: 'var(--chart-1)', strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="uncertainty"
            name="Uncertainty"
            stroke="var(--chart-2)"
            strokeWidth={2}
            dot={{ fill: 'var(--chart-2)', strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="engagement"
            name="Engagement"
            stroke="var(--chart-3)"
            strokeWidth={2}
            dot={{ fill: 'var(--chart-3)', strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
