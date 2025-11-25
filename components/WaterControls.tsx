import React, { useState } from 'react';
import { Plus, GlassWater, Coffee, Droplets } from 'lucide-react';

interface WaterControlsProps {
  onAddWater: (amount: number) => void;
}

export const WaterControls: React.FC<WaterControlsProps> = ({ onAddWater }) => {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(customAmount);
    if (amount > 0) {
      onAddWater(amount);
      setCustomAmount('');
      setIsCustomOpen(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => onAddWater(100)}
          className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-water-100 hover:bg-water-50 hover:border-water-300 transition-all active:scale-95"
        >
          <GlassWater className="w-6 h-6 text-water-500 mb-1" />
          <span className="text-sm font-medium text-water-800">100 มล.</span>
        </button>
        <button
          onClick={() => onAddWater(250)}
          className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-water-100 hover:bg-water-50 hover:border-water-300 transition-all active:scale-95"
        >
          <Coffee className="w-6 h-6 text-water-500 mb-1" />
          <span className="text-sm font-medium text-water-800">250 มล.</span>
        </button>
        <button
          onClick={() => onAddWater(500)}
          className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-water-100 hover:bg-water-50 hover:border-water-300 transition-all active:scale-95"
        >
          <Droplets className="w-6 h-6 text-water-500 mb-1" />
          <span className="text-sm font-medium text-water-800">500 มล.</span>
        </button>
      </div>

      {!isCustomOpen ? (
        <button
          onClick={() => setIsCustomOpen(true)}
          className="w-full py-3 flex items-center justify-center gap-2 bg-water-500 hover:bg-water-600 text-white rounded-xl font-medium shadow-md shadow-water-200 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          ระบุจำนวนเอง
        </button>
      ) : (
        <form onSubmit={handleCustomSubmit} className="flex gap-2 animate-in fade-in slide-in-from-top-2">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="จำนวน (มล.)"
            className="flex-1 px-4 py-2 rounded-xl border border-water-200 focus:outline-none focus:ring-2 focus:ring-water-400"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 bg-water-500 text-white rounded-xl font-medium"
            disabled={!customAmount}
          >
            เพิ่ม
          </button>
          <button
            type="button"
            onClick={() => setIsCustomOpen(false)}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-medium"
          >
            ยกเลิก
          </button>
        </form>
      )}
    </div>
  );
};
