'use client';
import { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, CheckSquare, Zap, Target, TrendingUp, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';
import styles from '../styles/DashboardContent.module.css';
import GrowthGraph from '../components/GrowthGraph';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/dashboard/stats', {
                    headers: {
                        ...(token && { 'Authorization': `Bearer ${token}` })
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    setStats(data);
                }
            } catch (err) {
                console.error('Failed to fetch stats');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-sky-500 animate-spin" />
            </div>
        );
    }

    // Default values if stats are missing
    const readiness = stats?.readiness || 0;
    const milestones = stats?.milestones || { completed: 0, total: 15 };
    const roles = stats?.roles || [];

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <div className="fade-slide-up">
                    <h1 className={styles.welcomeTitle}>Your Intelligence Hub</h1>
                    <p className={styles.welcomeSubtitle}>Experience assured career growth with AI transparency.</p>
                </div>
                <Link href="/analyze" className={styles.freshBtn}>
                    <Zap size={22} fill="currentColor" />
                    Start Fresh Analysis
                </Link>
            </header>

            {/* Stats Overview */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        <Target size={18} />
                        <span>Job Readiness</span>
                    </div>
                    <div className={styles.statValue}>{readiness}%</div>
                    <p className="text-muted text-sm">Based on your latest profile analysis.</p>
                    <div className="mt-8">
                        <GrowthGraph data={[readiness * 0.4, readiness * 0.6, readiness * 0.8, readiness]} color="#0ea5e9" />
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        <TrendingUp size={18} />
                        <span>Growth Curve</span>
                    </div>
                    <div className={styles.statValue}>+12.4%</div>
                    <p className="text-muted">Monthly skill acquisition velocity.</p>
                    <div className="mt-6">
                        <GrowthGraph data={[10, 20, 15, 30, 45, 35, 50]} color="#2dd4bf" />
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>
                        <CheckSquare size={18} />
                        <span>Milestones</span>
                    </div>
                    <div className={styles.statValue}>{milestones.completed}/{milestones.total}</div>
                    <p className="text-muted">Steps completed in your career roadmap.</p>
                    <div className="mt-6">
                        <GrowthGraph data={[5, 10, 25, 40, 55, 70, 80]} color="#6366f1" />
                    </div>
                </div>
            </div>

            <div className={styles.mainGrid}>
                {/* Recent Analysis Card */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            <FileText className="text-sky-500" size={28} />
                            Market Compatibility
                        </h2>
                        <Link href="/analyze" className={styles.cardLink}>Retrain AI</Link>
                    </div>
                    <div className={styles.cardBody}>
                        {roles.length > 0 ? (
                            <div className="space-y-4">
                                {roles.map((role, i) => (
                                    <div key={i} className={styles.roleItem}>
                                        <span className="font-bold">{role.title}</span>
                                        <span className={styles.roleMatch}>{role.match}% Confidence</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-muted mb-6">No profile data found. Upload your resume to start.</p>
                                <Link href="/analyze" className={styles.freshBtn} style={{ display: 'inline-flex' }}>
                                    Upload Resume
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Upgrade Card */}
                <section className={`${styles.card} ${styles.upgradeCard}`}>
                    <div className={styles.upgradeIcon}>
                        <Target size={48} />
                    </div>
                    <h2 className={styles.upgradeTitle}>Future Mapping</h2>
                    <p className={styles.upgradeText}>Unlock your personalized 12-month career roadmap with deep market analysis.</p>
                    <Link href="/roadmap" className={styles.upgradeBtn}>
                        View Roadmap
                    </Link>
                </section>
            </div>
        </div>
    );
}
