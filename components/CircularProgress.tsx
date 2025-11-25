import React from 'react';

interface CircularProgressProps {
  current: number;
  max: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ current, max }) => {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="#e0f2fe"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#0ea5e9"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute flex flex-col items-center text-water-900">
        <span className="text-4xl font-bold">{Math.round(percentage)}%</span>
        <span className="text-sm text-water-600 font-medium">
          {current} / {max} มล.
        </span>
      </div>
    </div>
  );
};
