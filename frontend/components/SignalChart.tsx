"use client"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export interface SignalChartProps {
  graphData: {
    week: number;
    clarity: number;
    uncertainty: number;
    engagement: number;
  }[];
}

export default function SignalChart({ graphData }: SignalChartProps) {
  if (graphData.length < 2) {
    return (
      <div className="p-8 flex items-center justify-center text-muted-foreground text-sm">
        Submit interactions to see relationship signals
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={graphData}>
          <CartesianGrid
            strokeDasharray="0"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="week"
            tick={{ fill: '#8B8BA0', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            label="Week"
          />
          <YAxis
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fill: '#8B8BA0', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#1A1A26',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            itemStyle={{ padding: '2px 0' }}
          />
          <Line
            type="monotone"
            dataKey="clarity"
            stroke="#00D4FF"
            strokeWidth={2}
            dot={{ r: 4, fill: '#00D4FF' }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
            animationDuration={1200}
          />
          <Line
            type="monotone"
            dataKey="uncertainty"
            stroke="#FFB020"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={{ r: 4, fill: '#FFB020' }}
            isAnimationActive={true}
            animationDuration={1200}
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="#00E676"
            strokeWidth={2}
            dot={{ r: 4, fill: '#00E676' }}
            isAnimationActive={true}
            animationDuration={1200}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
