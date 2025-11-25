import React, { useState, useEffect } from 'react';
import { Settings, Info } from 'lucide-react';
import { CircularProgress } from './components/CircularProgress';
import { WaterControls } from './components/WaterControls';
import { HistoryList } from './components/HistoryList';
import { AICoach } from './components/AICoach';
import { IntakeChart } from './components/IntakeChart';
import { WaterRecord } from './types';
import { v4 as uuidv4 } from 'uuid'; // Since we can't use uuid lib directly without npm install in this env, we'll implement a simple one or assume it works.
// Actually, standard uuid import works in many react sandboxes, but let's write a simple helper to be safe in this strict env.

// Simple UUID generator
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const DEFAULT_GOAL = 2500;

const App: React.FC = () => {
  // State
  const [goal, setGoal] = useState<number>(DEFAULT_GOAL);
  const [records, setRecords] = useState<WaterRecord[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedGoal = localStorage.getItem('waterflow_goal');
    if (savedGoal) setGoal(parseInt(savedGoal));

    const savedRecords = localStorage.getItem('waterflow_records');
    if (savedRecords) {
      const parsed: WaterRecord[] = JSON.parse(savedRecords);
      // Filter for today only
      const today = new Date().toDateString();
      const todaysRecords = parsed.filter(r => new Date(r.timestamp).toDateString() === today);
      setRecords(todaysRecords);
    }
  }, []);

  // Save to local storage whenever changes occur
  useEffect(() => {
    localStorage.setItem('waterflow_goal', goal.toString());
    localStorage.setItem('waterflow_records', JSON.stringify(records));
  }, [goal, records]);

  const totalIntake = records.reduce((sum, record) => sum + record.amount, 0);

  const addWater = (amount: number) => {
    const newRecord: WaterRecord = {
      id: generateId(),
      amount,
      timestamp: Date.now(),
    };
    setRecords(prev => [...prev, newRecord]);
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (val > 0) setGoal(val);
  };

  return (
    <div className="min-h-screen bg-water-50 pb-10 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-bold text-water-800 flex items-center gap-2">
          💧 WaterFlow
        </h1>
        <button 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="p-2 rounded-full hover:bg-water-50 text-water-600 transition-colors"
        >
          <Settings className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-md px-5 mt-6 flex flex-col gap-6">
        
        {/* Settings Panel (Collapsible) */}
        {isSettingsOpen && (
          <div className="bg-white p-4 rounded-2xl border border-water-200 shadow-md animate-in slide-in-from-top-4">
            <h2 className="font-semibold text-water-900 mb-3">ตั้งค่าเป้าหมาย</h2>
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 whitespace-nowrap">เป้าหมายรายวัน (มล.):</label>
              <input 
                type="number" 
                value={goal} 
                onChange={handleGoalChange}
                className="w-full px-3 py-2 border border-water-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-water-400"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              ค่ามาตรฐานที่แนะนำคือ 2000 - 3000 มล. ต่อวัน ขึ้นอยู่กับน้ำหนักตัวและกิจกรรม
            </p>
          </div>
        )}

        {/* Progress Section */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-water-100 flex flex-col items-center justify-center">
          <CircularProgress current={totalIntake} max={goal} />
          
          <div className="mt-4 text-center">
            {totalIntake >= goal ? (
              <p className="text-green-500 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">
                🎉 ยอดเยี่ยม! คุณทำสำเร็จแล้ว
              </p>
            ) : (
              <p className="text-water-500 text-sm font-medium">
                อีก {goal - totalIntake} มล. เพื่อให้ถึงเป้าหมาย
              </p>
            )}
          </div>
        </section>

        {/* Controls */}
        <section>
          <h2 className="text-sm font-semibold text-water-900 mb-3 px-1">เพิ่มปริมาณน้ำ</h2>
          <WaterControls onAddWater={addWater} />
        </section>

        {/* AI Coach */}
        <AICoach 
          currentIntake={totalIntake} 
          goal={goal} 
          recordsCount={records.length} 
        />

        {/* Chart */}
        <IntakeChart records={records} />

        {/* History */}
        <HistoryList records={records} onDelete={deleteRecord} />
        
      </main>

      {/* Footer Info */}
      <footer className="mt-10 text-center text-xs text-water-300">
        <p>© 2024 WaterFlow. Daily Hydration Tracker.</p>
        <p className="mt-1 flex items-center justify-center gap-1">
          <Info className="w-3 h-3" /> ข้อมูลจะถูกรีเซ็ตในวันถัดไป
        </p>
      </footer>
    </div>
  );
};

export default App;
