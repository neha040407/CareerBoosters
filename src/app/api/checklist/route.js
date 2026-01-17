import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Checklist from '../../../models/Checklist';
import { verifyToken } from '../../../lib/auth';

export async function GET(req) {
    try {
        const user = verifyToken(req);
        if (!user) {
            // Return mock data for guest users
            return NextResponse.json([
                { id: '1', text: 'Optimize Resume for AI Scanners', category: 'Foundation', completed: true },
                { id: '2', text: 'Master Distributed Systems Basics', category: 'Skills', completed: true },
                { id: '3', text: 'Complete AWS Certified Developer', category: 'Certification', completed: false },
            ]);
        }

        await dbConnect();
        const items = await Checklist.find({ userId: user.id });

        if (items.length === 0) {
            // Seed default items for first time users
            const defaultItems = [
                { userId: user.id, text: 'Optimize Resume for AI Scanners', category: 'Foundation', completed: false },
                { userId: user.id, text: 'Master Distributed Systems Basics', category: 'Skills', completed: false },
                { userId: user.id, text: 'Complete AWS Certified Developer', category: 'Certification', completed: false },
                { userId: user.id, text: 'Build a Personal Project with Next.js', category: 'Portfolio', completed: false },
            ];
            const seeded = await Checklist.insertMany(defaultItems);
            return NextResponse.json(seeded);
        }

        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch checklist' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const user = verifyToken(req);
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id, completed } = await req.json();
        await dbConnect();

        const updatedItem = await Checklist.findOneAndUpdate(
            { _id: id, userId: user.id },
            { completed },
            { new: true }
        );

        return NextResponse.json({ success: true, item: updatedItem });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}
