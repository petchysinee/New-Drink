import React from 'react';
import { WaterRecord } from '../types';
import { Trash2, Droplet } from 'lucide-react';

interface HistoryListProps {
  records: WaterRecord[];
  onDelete: (id: string) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ records, onDelete }) => {
  if (records.length === 0) {
    return (
      <div className="text-center py-8 text-water-400 text-sm">
        ยังไม่มีบันทึกการดื่มน้ำวันนี้
        <br />
        เริ่มต้นด้วยแก้วแรกกันเลย!
      </div>
    );
  }

  // Sort by time descending
  const sortedRecords = [...records].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="space-y-2 mt-2">
      <h3 className="text-sm font-semibold text-water-900 mb-2 px-1">ประวัติวันนี้</h3>
      <div className="max-h-64 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {sortedRecords.map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between p-3 bg-white rounded-xl border border-water-50 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-water-50 flex items-center justify-center text-water-500">
                <Droplet className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-water-900">{record.amount} มล.</p>
                <p className="text-xs text-water-400">
                  {new Date(record.timestamp).toLocaleTimeString('th-TH', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={() => onDelete(record.id)}
              className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
