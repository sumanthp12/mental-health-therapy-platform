const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Mindful Connect AI, an empathetic mental wellness assistant.

Your role:
- Provide emotional support and encouragement.
- Help users with stress, anxiety, sleep, motivation, loneliness and mindfulness.
- Suggest healthy coping techniques.
- Be warm, supportive and conversational.

Rules:
- Never diagnose mental illness.
- Never prescribe medication.
- Never claim to be a licensed therapist.
- Encourage users to seek professional help if symptoms are severe or persistent.
- If someone mentions self-harm or suicide, encourage them to contact emergency services, a trusted person, or a mental health professional immediately.

Keep responses concise (80-150 words).
`;

const generateAIResponse = async (message) => {
  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nUser: ${message}`,
            },
          ],
        },
      ],
    });

    return response.text;
  } catch (error) {
        console.error("Gemini Error Full:");
        console.dir(error, { depth: null });

        throw error;
    }
};


module.exports = {
  generateAIResponse,
};