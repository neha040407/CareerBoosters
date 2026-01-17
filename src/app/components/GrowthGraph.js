'use client';
import { useEffect, useState, useId } from 'react';

/**
 * GrowthGraph - A personalised SVG graph component.
 * @param {Array} data - Array of y-values (0-100) representing progress.
 * @param {string} color - The strokes and fill color.
 */
export default function GrowthGraph({ data, color = '#0ea5e9' }) {
    const [points, setPoints] = useState('');
    const [area, setArea] = useState('');
    const uniqueId = useId().replace(/:/g, ''); // Generate unique ID for each instance

    useEffect(() => {
        // Use provided data or fallback to a default growth curve
        const values = data && data.length > 0 ? data : [20, 35, 30, 50, 45, 70, 65, 85, 80, 95];

        const width = 400;
        const height = 120;
        const step = width / (values.length - 1);

        // Map values to coordinates (higher value = lower y coordinate)
        const coords = values.map((v, i) => ({
            x: i * step,
            y: height - (v / 100 * height * 0.8) - (height * 0.1) // Keep padding top/bottom
        }));

        // Generate cubic bezier path for smooth curves
        let pathData = `M ${coords[0].x},${coords[0].y}`;

        for (let i = 0; i < coords.length - 1; i++) {
            const curr = coords[i];
            const next = coords[i + 1];
            const cp1x = curr.x + (next.x - curr.x) / 2;
            const cp1y = curr.y;
            const cp2x = curr.x + (next.x - curr.x) / 2;
            const cp2y = next.y;
            pathData += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
        }

        setPoints(pathData);
        setArea(`${pathData} L ${width},${height} L 0,${height} Z`);
    }, [data]);

    return (
        <div className="w-full h-[120px] relative overflow-hidden group">
            <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="w-full h-full drop-shadow-xl overflow-visible">
                <defs>
                    <linearGradient id={`gradient-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={color.startsWith('var') ? color : color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color.startsWith('var') ? color : color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Animated Area Fill */}
                <path
                    d={area}
                    fill={`url(#gradient-${uniqueId})`}
                    className="line-grow"
                    style={{ animationDelay: '0.2s' }}
                />

                {/* Animated Line */}
                <path
                    d={points}
                    fill="none"
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="line-grow"
                />
            </svg>

            {/* Gliding Overlay for interaction feel */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        </div>
    );
}
