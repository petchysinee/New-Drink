import React, { useState } from 'react';
import { Sparkles, MessageSquare, Loader2 } from 'lucide-react';
import { getHydrationAdvice } from '../services/geminiService';

interface AICoachProps {
  currentIntake: number;
  goal: number;
  recordsCount: number;
}

export const AICoach: React.FC<AICoachProps> = ({ currentIntake, goal, recordsCount }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    const result = await getHydrationAdvice(currentIntake, goal, recordsCount);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 to-water-50 border border-water-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-water-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          โค้ชสุขภาพ AI
        </h3>
      </div>
      
      {advice && (
        <div className="mb-4 bg-white/80 p-3 rounded-xl border border-water-100 text-water-800 text-sm leading-relaxed animate-in fade-in">
          "{advice}"
        </div>
      )}

      <button
        onClick={handleGetAdvice}
        disabled={loading}
        className="w-full py-2.5 bg-white border border-water-200 hover:bg-water-50 text-water-700 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            กำลังวิเคราะห์...
          </>
        ) : (
          <>
            <MessageSquare className="w-4 h-4" />
            {advice ? 'ขอคำแนะนำใหม่' : 'ขอคำแนะนำ'}
          </>
        )}
      </button>
    </div>
  );
};
