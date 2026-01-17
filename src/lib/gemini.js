
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function analyzeTextWithGemini(text, apiKey) {
    if (!apiKey) {
        throw new Error('Gemini API Key is missing');
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        You are an expert Resume Analyzer.
        Analyze the following resume text and extract the "User Asset Value" details.
        
        Task:
        1. Identify the candidate's core skills.
        2. Identify experience level (in years).
        3. Identify any gaps compared to a standard "Senior Software Engineer" role.
        4. Return the result strictly in JSON format.

        Resume Text:
        ${text.substring(0, 10000)} // Limit text length

        Output JSON Structure:
        {
            "foundSkills": ["Skill1", "Skill2"],
            "experience": 5,
            "missingSkills": ["Gap1", "Gap2"],
            "summary": "Brief professional summary"
        }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        // Clean markdown code blocks if present
        const jsonString = textResponse.replace(/^```json\n|\n```$/g, '').trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error('Gemini Analysis Error:', error);
        throw error;
    }
}
