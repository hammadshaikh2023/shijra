
import { GoogleGenAI, Type } from "@google/genai";

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { seed } = req.body;
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a wise, metaphorical short story based on this seed thought: "${seed}". 
      The tone should be dreamy, philosophical, and inspiring. 
      Limit the story to around 200 words. 
      Also provide a title, a one-sentence summary, and 3 relatable tags.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            summary: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "content", "summary", "tags"]
        }
      }
    });

    return res.status(200).json(JSON.parse(response.text || '{}'));
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ error: "Failed to generate story" });
  }
}
