import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateHomeworkWithAI(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a statistics homework assignment based on the following topic: "${prompt}". 
      Return a JSON object with:
      - title: A catchy title
      - description: A brief description
      - type: either "quiz" or "formula"
      - totalPoints: sum of points for all questions
      - questions: array of objects with:
        - question: the question text
        - options: array of 4 strings
        - correctAnswer: index of the correct option (0-3)
        - points: points for this question (e.g. 5 or 10)
      
      Make sure the questions are educational and accurate to statistics standards.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            type: { type: Type.STRING, enum: ["quiz", "formula"] },
            totalPoints: { type: Type.NUMBER },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctAnswer: { type: Type.NUMBER },
                  points: { type: Type.NUMBER }
                },
                required: ["question", "options", "correctAnswer", "points"]
              }
            }
          },
          required: ["title", "description", "type", "totalPoints", "questions"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate homework content. Please try again.");
  }
}
