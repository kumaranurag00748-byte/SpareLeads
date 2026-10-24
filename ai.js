import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of electronic components that a user has and suggests a electronics-related project they could make with some or all of those components.
Format your response in markdown.
`;

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function getProjectFromGemini(components, optionCount = 1) {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error("Missing VITE_GEMINI_API_KEY. Add it to the .env file.")
  }

  const componentsString = components.join(", ");
  const prompt = `
${SYSTEM_PROMPT}

I have these components: ${componentsString}.
${optionCount === 1
    ? "Please suggest one electronics project I could build."
    : `Please suggest ${optionCount} different electronics project options I could build.
For each option, include a title and a concise description. Do not provide lengthy
step-by-step instructions for every option.`}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
