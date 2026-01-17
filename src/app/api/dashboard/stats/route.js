import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Analysis from '../../../../models/Analysis';
import Checklist from '../../../../models/Checklist';
import { verifyToken } from '../../../../lib/auth';

export async function GET(req) {
    try {
        const user = verifyToken(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await dbConnect();

        // Get latest analysis
        const latestAnalysis = await Analysis.findOne({ userId: user.id }).sort({ createdAt: -1 });

        // Get checklist progress
        const checklistItems = await Checklist.find({ userId: user.id });
        const completedCount = checklistItems.filter(item => item.completed).length;
        const totalCount = checklistItems.length;

        // Default stats if no data exists
        const stats = {
            readiness: latestAnalysis?.results.readiness || 0,
            growth: 12.4, // Placeholder for trend analysis
            milestones: {
                completed: completedCount,
                total: totalCount || 15
            },
            latestRole: latestAnalysis?.results.roles[0]?.title || 'Not Analyzed',
            roles: latestAnalysis?.results.roles || []
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
    }
}
