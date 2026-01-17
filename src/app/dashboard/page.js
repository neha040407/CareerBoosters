'use client';
import { LayoutDashboard, FileText, CheckSquare, Zap, Target, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';
import styles from '../styles/DashboardContent.module.css';

export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.welcomeTitle}>Welcome Back, John</h1>
                    <p className={styles.welcomeSubtitle}>Here's what's happening with your career analysis today.</p>
                </div>
                <Link href="/analyze" className={styles.freshBtn}>
                    <Zap size={20} fill="currentColor" />
                    Start Fresh Analysis
                </Link>
            </header>

            {/* Stats Overview */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statGlow} style={{ background: 'var(--primary)' }}></div>
                    <div className={`${styles.statLabel} text-sky-400`}>
                        <Target size={18} />
                        <span>Job Ready</span>
                    </div>
                    <div className={styles.statValue}>84%</div>
                    <p className={styles.statDesc}>Based on your recent resume scan</p>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statGlow} style={{ background: 'var(--secondary)' }}></div>
                    <div className={`${styles.statLabel} text-teal-400`}>
                        <TrendingUp size={18} />
                        <span>Growth Rate</span>
                    </div>
                    <div className={styles.statValue}>+12%</div>
                    <p className={styles.statDesc}>Skills improved in the last 30 days</p>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statGlow} style={{ background: 'var(--accent)' }}></div>
                    <div className={`${styles.statLabel} text-indigo-400`}>
                        <CheckSquare size={18} />
                        <span>Tasks Done</span>
                    </div>
                    <div className={styles.statValue}>12/15</div>
                    <p className={styles.statDesc}>Recommended milestones completed</p>
                </div>
            </div>

            <div className={styles.mainGrid}>
                {/* Recent Analysis Card */}
                <section className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>
                            <FileText className="text-sky-400" />
                            Latest Analysis
                        </h2>
                        <Link href="/analyze" className={styles.cardLink}>View Full Report</Link>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.analysisRow}>
                            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-1">Top Recommendation</h4>
                                <p className="text-sm text-slate-400">Focus on learning "Deep Learning" to qualify for Senior Data Science roles in your area.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Matched Roles</h4>
                            <div className={styles.roleItem}>
                                <span className="font-semibold text-slate-200">Senior React Developer</span>
                                <span className={styles.roleMatch}>96% Match</span>
                            </div>
                            <div className={styles.roleItem}>
                                <span className="font-semibold text-slate-200">Technical Lead</span>
                                <span className={styles.roleMatch}>89% Match</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Upgrade Card */}
                <section className={`${styles.card} ${styles.upgradeCard}`}>
                    <div className={styles.upgradeIcon}>
                        <Sparkles size={40} />
                    </div>
                    <h2 className={styles.upgradeTitle}>Ready to Level Up?</h2>
                    <p className={styles.upgradeText}>Complete your skill checklist to unlock a personalized career roadmap.</p>
                    <Link href="/checklist" className={styles.upgradeBtn}>
                        Go to My Checklist
                    </Link>
                </section>
            </div>
        </div>
    );
}
