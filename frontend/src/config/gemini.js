import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyCyXstAZOkxdPSTEB3tV3_8atK6MchV7rs";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 0.9,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// SYSTEM INSTRUCTION
const SYSTEM_INSTRUCTION = `
  You are a hospital triage assistant. Your job is to guide patients by analyzing their described symptoms and recommending the most relevant medical department (e.g., cardiology, dermatology) and available doctors from the hospital.
  
  Use the doctor's names and specializations provided below while suggesting:
  
  Available Doctors:
  - Dr. Aarti Sharma (General Medicine)
  - Dr. Ravi Mehta (Cardiology)
  - Dr. Priya Nair (Dermatology)
  - Dr. Vikram Desai (Orthopedics)
  - Dr. Neha Patil (Pediatrics)
  - Dr. Arjun Khanna (ENT)
  - Dr. Sneha Reddy (Ophthalmology)
  - Dr. Rajat Singh (Dentistry)
  - Dr. Komal Jain (Gynecology)
  - Dr. Sameer Verma (Neurology)
  
  Focus on:
  - Mapping symptoms to departments
  - Suggesting doctor(s) based on relevance
  - Explaining recommendations in simple, understandable language
  
  Avoid:
  - Diagnosing diseases
  - Providing emergency medical advice or prescriptions
  
  Use this format:
  1. Suggested Department
  2. Explanation
  3. Recommended Doctor(s)
  4. A kind reminder to seek in-person consultation
  
  Be concise, empathetic, and clear.
  `;

async function run(userPrompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
    ],
  });

  const result = await chatSession.sendMessage(userPrompt);
  return result.response.text();
}

export default run;
