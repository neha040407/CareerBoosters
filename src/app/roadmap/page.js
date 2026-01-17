'use client';
import { useState, useEffect } from 'react';
import { Target, Milestone, Map, Calendar, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';
import styles from '../styles/Roadmap.module.css';
import Link from 'next/link';

export default function RoadmapPage() {
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/roadmap', {
                    headers: {
                        ...(token && { 'Authorization': `Bearer ${token}` })
                    }
                });
                const data = await res.json();

                if (res.ok) {
                    setRoadmap(data);
                } else {
                    setError(data.error);
                }
            } catch (err) {
                setError('Failed to load roadmap. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchRoadmap();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-12 h-12 text-sky-500 animate-spin" />
                <p className="text-muted font-bold animate-pulse">Generating Strategic Timeline...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto gap-6">
                <div className="w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center">
                    <AlertTriangle size={40} className="text-amber-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-2">No Roadmap Found</h2>
                    <p className="text-muted">{error}</p>
                </div>
                <Link href="/analyze" className="px-8 py-4 bg-sky-500 text-white rounded-2xl font-bold hover:scale-105 transition-transform">
                    Start AI Analysis
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.roadmapPage}>
            <header className={styles.header}>
                <div className="px-3 py-1 bg-sky-500/10 text-sky-500 border border-sky-500/20 rounded-full text-xs font-black uppercase tracking-widest w-fit mb-4">
                    Target: {roadmap.targetRole}
                </div>
                <h1 className={styles.title}>12-Month Mapping</h1>
                <p className={styles.subtitle}>
                    Strategic progression from <b>{roadmap.currentExperience}</b> to <b>{roadmap.targetExperience}</b> expert status.
                </p>
            </header>

            <div className={styles.timeline}>
                {roadmap.steps.map((step, index) => (
                    <div key={index} className={`${styles.step} ${step.status === 'active' ? styles.activeStep : ''}`}>
                        <div className={styles.stepIcon}></div>
                        <div className={styles.stepCard}>
                            <div className="flex justify-between items-start mb-4">
                                <span className={styles.stepDate}>{step.duration}</span>
                                <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full font-bold uppercase text-muted">
                                    {step.type}
                                </span>
                            </div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDesc}>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-8 bg-sky-500/5 border border-sky-500/20 rounded-3xl flex items-center justify-between">
                <div>
                    <h4 className="text-xl font-bold mb-2">Next Milestone</h4>
                    <p className="text-muted">You are focused on the <b className="text-sky-500">{roadmap.steps.find(s => s.status === 'active')?.type}</b> phase.</p>
                </div>
                <button className="px-8 py-4 bg-sky-500 text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                    Complete Current Step <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}
