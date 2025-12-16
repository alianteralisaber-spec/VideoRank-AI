import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, SeoResult } from "../types";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is missing in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const generateVideoSeo = async (input: UserInput): Promise<SeoResult> => {
  if (!apiKey) throw new Error("API Key not found");

  const systemInstruction = `
    You are VideoRank AI, an expert YouTube SEO strategist. 
    Your goal is to optimize video metadata for maximum discoverability (CTR and Retention) based on REAL patterns, not guesses.

    **RULES:**
    1. **Analyze:** Simulate an analysis of top-performing videos in the '${input.country}' for the niche '${input.niche}'.
    2. **Language:** Strict adherence. If Country is an Arab state, use Arabic (unless specific tech terms are better in English). If US/UK, use English. Do NOT translate blindly. Match the local creator dialect if applicable.
    3. **Titles:** Create 10 clickable, high-CTR titles. No clickbait that lies, but use curiosity gaps and strong hooks common in the niche.
    4. **Description:**
       - **Part 1 (Hook):** Direct, includes main keyword naturally. No "Hello guys welcome back".
       - **Part 2 (Value):** What will they learn? Why watch?
       - **Part 3 (SEO):** Natural sentence integration of keywords. No list stuffing.
       - NO flowery language, NO storytelling fluff.
    5. **Keywords:** 15-25 high-volume, low-competition tags relevant to the specific country/niche.
    6. **Explanation:** Briefly explain (in the output language) why this strategy works for this specific region/niche.
  `;

  const prompt = `
    Video Idea: ${input.idea}
    Target Country: ${input.country}
    Target Language: ${input.language}
    Niche: ${input.niche}
    
    Generate the SEO strategy JSON now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "10 high CTR titles",
            },
            description: {
              type: Type.OBJECT,
              properties: {
                hook: { type: Type.STRING, description: "First paragraph: Hook & Keyword" },
                value: { type: Type.STRING, description: "Second paragraph: Value proposition" },
                keywords_integration: { type: Type.STRING, description: "Third paragraph: Keywords in context" },
              },
              required: ["hook", "value", "keywords_integration"],
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "15-25 Optimized keywords",
            },
            explanation: {
              type: Type.STRING,
              description: "Brief strategy explanation",
            },
          },
          required: ["titles", "description", "keywords", "explanation"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");

    return JSON.parse(resultText) as SeoResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate SEO data. Please try again.");
  }
};