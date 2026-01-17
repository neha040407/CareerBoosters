
const fs = require('fs');
const pdf = require('pdf-parse');
console.log('PDF-Parse Library Type:', typeof pdf);
const { GoogleGenerativeAI } = require('@google/generative-ai');

// --- Configuration ---
const DB_AVAILABLE_SKILLS = [
    'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TypeScript',
    'GraphQL', 'MongoDB', 'System Design', 'CI/CD', 'Next.js'
];

async function analyzePdf(filePath, apiKey) {
    if (!apiKey) {
        console.error('❌ Error: Gemini API Key is missing.');
        console.log('Usage: node run-analysis-cli.js <path-to-pdf> <api-key>');
        process.exit(1);
    }

    if (!fs.existsSync(filePath)) {
        console.error(`❌ Error: File not found at ${filePath}`);
        process.exit(1);
    }

    console.log(`\n📄 Reading PDF: ${filePath}...`);
    const dataBuffer = fs.readFileSync(filePath);

    try {
        const data = await pdf(dataBuffer);
        const text = data.text;
        console.log(`✅ Text extracted (${text.length} characters).`);

        console.log('\n🤖 Analyzing with Gemini...');
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
        ${text.substring(0, 10000)}

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

        // Clean markdown
        const jsonString = textResponse.replace(/^```json\n|\n```$/g, '').trim();
        const geminiData = JSON.parse(jsonString);

        console.log('✅ Analysis complete.');

        // --- Database Comparison Logic ---
        console.log('\n🔍 Comparing against Database Assets...');

        const validatedSkills = geminiData.foundSkills.filter(s =>
            DB_AVAILABLE_SKILLS.some(dbSkill => dbSkill.toLowerCase() === s.toLowerCase())
        );

        const assetValue = {
            candidateName: "Candidate", // PDF parse doesn't reliably get this without AI
            verifiedSkills: validatedSkills,
            unverifiedSkills: geminiData.foundSkills.filter(s => !validatedSkills.includes(s)),
            experienceYears: geminiData.experience,
            marketGaps: geminiData.missingSkills,
            summary: geminiData.summary
        };

        console.log('\n================ ANALYSIS RESULT ================');
        console.log(JSON.stringify(assetValue, null, 2));
        console.log('=================================================');
        console.log(`\nVerified Asset Score: ${validatedSkills.length} / ${geminiData.foundSkills.length} skills matched DB records.`);

    } catch (error) {
        console.error('❌ Analysis Failed:', error.message);
    }
}

// Get args
const args = process.argv.slice(2);
const filePath = args[0];
const apiKey = args[1];

analyzePdf(filePath, apiKey);
