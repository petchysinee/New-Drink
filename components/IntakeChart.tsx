import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { WaterRecord } from '../types';

interface IntakeChartProps {
  records: WaterRecord[];
}

export const IntakeChart: React.FC<IntakeChartProps> = ({ records }) => {
  // Aggregate data by hour for the chart
  const data = React.useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      amount: 0,
      label: `${i}:00`
    }));

    let cumulative = 0;
    
    // Sort records chronologically
    const sorted = [...records].sort((a, b) => a.timestamp - b.timestamp);

    // Group by hour but cumulative
    // Or just simple cumulative distribution over time?
    // Let's do cumulative intake over the day.
    
    // Create data points for every hour that has passed or has data
    const chartData: { time: string; amount: number }[] = [];
    
    // If no records, just show empty
    if (records.length === 0) return [];

    let currentAmount = 0;
    
    // Add start of day
    chartData.push({ time: '00:00', amount: 0 });

    sorted.forEach(r => {
      currentAmount += r.amount;
      const date = new Date(r.timestamp);
      const timeStr = date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      chartData.push({ time: timeStr, amount: currentAmount });
    });
    
    // Add current time point if last record was before now
    const now = new Date();
    const nowStr = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    chartData.push({ time: nowStr, amount: currentAmount });

    return chartData;
  }, [records]);

  if (records.length === 0) return null;

  return (
    <div className="w-full h-48 bg-white rounded-2xl border border-water-100 p-4 shadow-sm mt-4">
      <h3 className="text-xs font-semibold text-water-800 mb-2 uppercase tracking-wide">กราฟแสดงผลรวม</h3>
      <div className="w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 10, fill: '#94a3b8' }} 
              interval="preserveStartEnd"
              tickMargin={5}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#0369a1', fontSize: '12px', fontWeight: 'bold' }}
              formatter={(value: number) => [`${value} มล.`, 'ปริมาณรวม']}
            />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#0ea5e9" 
              fillOpacity={1} 
              fill="url(#colorWater)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
