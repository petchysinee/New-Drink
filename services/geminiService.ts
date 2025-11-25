import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

export const getHydrationAdvice = async (
  currentIntake: number,
  goal: number,
  recentRecordsCount: number
): Promise<string> => {
  try {
    const currentTime = new Date().toLocaleTimeString('th-TH');
    const percent = Math.round((currentIntake / goal) * 100);

    const prompt = `
      Current time: ${currentTime}
      User's water intake today: ${currentIntake} ml
      Daily Goal: ${goal} ml
      Progress: ${percent}%
      Number of drinks recorded: ${recentRecordsCount}

      Please provide a short, friendly, and encouraging health advice in Thai language based on this data.
      If they are far behind, encourage them gently.
      If they are on track, congratulate them.
      If they drank too much too fast, warn them gently.
      Keep it under 3 sentences.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash-001",
      contents: prompt,
      config: {
        systemInstruction: "You are a friendly personal health assistant specialized in hydration. You speak Thai naturally and encouragingly.",
        temperature: 0.7,
      }
    });

    return response.text || "ไม่สามารถดึงข้อมูลคำแนะนำได้ในขณะนี้";
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI ลองใหม่อีกครั้งนะครับ";
  }
};
