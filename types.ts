export interface WaterRecord {
  id: string;
  amount: number; // in ml
  timestamp: number; // unix timestamp
}

export interface UserSettings {
  dailyGoal: number; // in ml
}

export interface DailyStats {
  totalIntake: number;
  records: WaterRecord[];
}
