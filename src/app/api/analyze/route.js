import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Analysis from '../../../models/Analysis';
import Roadmap from '../../../models/Roadmap';
import Checklist from '../../../models/Checklist';
import { verifyToken } from '../../../lib/auth';
import { analyzeTextWithGemini } from '../../../lib/gemini';

// Simulated "Available Fields in Database" for Asset Value Evaluation
const DB_AVAILABLE_SKILLS = [
    'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TypeScript',
    'GraphQL', 'MongoDB', 'System Design', 'CI/CD', 'Next.js'
];

// Helper to simulate skill/gap detection based on text (Fallback)
function analyzeProfile(text) {
    const skills = ['React', 'Node.js', 'JavaScript', 'Python', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'Next.js'];
    const foundSkills = skills.filter(skill => new RegExp(`\\b${skill}\\b`, 'i').test(text));
    const missingSkills = skills.filter(skill => !foundSkills.includes(skill));

    // Determine Experience Level (Mock logic)
    let experience = 2; // Default
    const expMatch = text.match(/(\d+)\+?\s*years?/i);
    if (expMatch) experience = parseInt(expMatch[1]);

    return {
        foundSkills,
        missingSkills,
        experience
    }
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Dynamically import pdf-parse to avoid ESM/CJS build issues
        const pdf = (await import('pdf-parse/lib/pdf-parse.js')).default;

        // Extract text from PDF
        const pdfData = await pdf(buffer);
        const text = pdfData.text;

        // Check for Gemini API Key in headers or env
        const apiKey = req.headers.get('x-gemini-api-key') || process.env.GOOGLE_API_KEY;
        let profile;

        if (apiKey) {
            try {
                const geminiData = await analyzeTextWithGemini(text, apiKey);

                // Compare with DB Fields (Asset Value Evaluation)
                const validSkills = geminiData.foundSkills.filter(s =>
                    DB_AVAILABLE_SKILLS.some(dbSkill => dbSkill.toLowerCase() === s.toLowerCase())
                );

                // If Gemini returns skills not in our DB, we flag them? 
                // For now, we trust Gemini's extraction but prioritize DB fields for matches.

                profile = {
                    foundSkills: validSkills.length > 0 ? validSkills : geminiData.foundSkills,
                    missingSkills: geminiData.missingSkills,
                    experience: geminiData.experience || 2
                };
            } catch (err) {
                console.warn('Gemini failed, falling back to regex:', err);
                profile = analyzeProfile(text);
            }
        } else {
            profile = analyzeProfile(text);
        }

        // Generate Analysis results
        const analysisResults = {
            readiness: Math.min(60 + (profile.experience * 3) + (profile.foundSkills.length * 2), 98),
            matchScore: Math.min(70 + (profile.foundSkills.length * 3), 99),
            skills: profile.foundSkills,
            gaps: profile.missingSkills.slice(0, 4),
            recommendations: profile.missingSkills.map(s => `Master ${s} to improve market value.`),
            marketValue: profile.experience > 5 ? '+$25k - $40k' : '+$10k - $20k',
            roles: [
                { title: profile.experience > 5 ? 'Staff Software Engineer' : 'Senior Software Engineer', match: 92 },
                { title: 'Technical Lead', match: 85 },
                { title: 'Project Manager', match: 70 }
            ]
        };

        // If authenticated, persist to DB
        const userToken = verifyToken(req);
        if (userToken) {
            await dbConnect();
            const userId = userToken.id;

            // 1. Save Analysis
            await Analysis.create({
                userId,
                fileName: file.name,
                results: analysisResults
            });

            // 2. Generate Roadmap Steps based on Gaps (Kaggle dataset inspiration)
            const targetRole = analysisResults.roles[0].title;
            const roadmapSteps = [
                {
                    title: `Bridge Qualification Gap for ${targetRole}`,
                    description: `Focus on acquiring ${analysisResults.gaps[0] || 'advanced architecture'} knowledge.`,
                    duration: 'Month 1-3',
                    type: 'Qualification',
                    status: 'active'
                },
                {
                    title: 'Skill Acquisition Phase',
                    description: `Deep dive into ${analysisResults.gaps.slice(1, 3).join(' and ') || 'Cloud Native patterns'}.`,
                    duration: 'Month 4-7',
                    type: 'Skill'
                },
                {
                    title: 'Strategic Project Lead',
                    description: 'Take ownership of a high-impact technical initiative to demonstrate senior-level autonomy.',
                    duration: 'Month 8-10',
                    type: 'Experience'
                },
                {
                    title: 'Market Verification',
                    description: 'Optimize profile for target salary range and start verified interview prep.',
                    duration: 'Month 11-12',
                    type: 'Market'
                }
            ];

            await Roadmap.deleteMany({ userId }); // Reset roadmap on new analysis
            await Roadmap.create({
                userId,
                targetRole,
                currentExperience: `${profile.experience} years`,
                targetExperience: `${profile.experience + 2} years`,
                steps: roadmapSteps
            });

            // 3. Update Checklist with new Gaps
            await Checklist.deleteMany({ userId });
            const checklistItems = analysisResults.gaps.map(gap => ({
                userId,
                text: `Master ${gap}`,
                category: 'Skills',
                completed: false
            }));
            await Checklist.insertMany(checklistItems);
        }

        return NextResponse.json({
            success: true,
            analysis: analysisResults
        });

    } catch (error) {
        console.error('Analysis error:', error);
        return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 });
    }
}
