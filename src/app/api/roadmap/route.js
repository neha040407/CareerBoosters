import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Roadmap from '../../../models/Roadmap';
import { verifyToken } from '../../../lib/auth';

export async function GET(req) {
    try {
        const user = verifyToken(req);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const roadmap = await Roadmap.findOne({ userId: user.id });

        if (!roadmap) {
            return NextResponse.json({ error: 'No roadmap found. Please analyze your resume first.' }, { status: 404 });
        }

        return NextResponse.json(roadmap);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch roadmap' }, { status: 500 });
    }
}
