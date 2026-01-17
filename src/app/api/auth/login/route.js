import dbConnect from '../../../../lib/db';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-development-only';

export async function POST(req) {
    try {
        await dbConnect();
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ error: 'Missing credentials' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

        // In a real app, you'd set this as an HttpOnly cookie
        return new Response(
            JSON.stringify({ success: true, token }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=86400;` 
                },
            }
        );
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
