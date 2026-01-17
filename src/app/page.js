'use client';
import Link from 'next/link';
import styles from './styles/Home.module.css';
import { ArrowRight, Sparkles, Target, TrendingUp, CheckCircle, Briefcase } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Main Content Area */}
      <main className={styles.mainSection}>

        {/* Left: Text Content */}
        <div className={styles.textContent}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            <span>Trusted by 10,000+ Professionals</span>
          </div>

          <h1 className={styles.headline}>
            Guidance You Can <br />
            <span className={styles.gradientText}>Rely On.</span>
          </h1>

          <p className={styles.subheadline}>
            Navigating a career change can be daunting. We provide data-driven, secure, and personalized insights to help you make confident decisions for your future.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/signup" className={styles.btnPrimary}>
              Start Analysis
              <ArrowRight size={20} />
            </Link>
            <div className={styles.btnSecondary}>
              <Briefcase size={20} style={{ color: '#2dd4bf' }} />
              For Employers
            </div>
          </div>

          <div className={styles.trustStats}>
            <div className={styles.statItem}>
              <CheckCircle size={18} color="#2dd4bf" />
              <span>Verified Data</span>
            </div>
            <div className={styles.statItem}>
              <CheckCircle size={18} color="#2dd4bf" />
              <span>Privacy First</span>
            </div>
            <div className={styles.statItem}>
              <CheckCircle size={18} color="#2dd4bf" />
              <span>AI Powered</span>
            </div>
          </div>
        </div>

        {/* Right: Visual Content */}
        <div className={styles.visualContent}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div className="glass-panel animate-float" style={{ position: 'absolute', top: '10%', right: '0', width: '320px', padding: '24px', borderRadius: '24px', zIndex: 10 }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(45, 212, 191, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <TrendingUp size={24} color="#2dd4bf" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Skill Growth</h3>
              <div style={{ width: '100%', height: '8px', background: '#334155', borderRadius: '100px', marginBottom: '8px' }}>
                <div style={{ width: '75%', height: '100%', background: '#2dd4bf', borderRadius: '100px' }}></div>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>+24% improvement this month</p>
            </div>

            <div className="glass-panel animate-float" style={{ position: 'absolute', bottom: '20%', left: '10%', width: '320px', padding: '24px', borderRadius: '24px', zIndex: 20, animationDelay: '2s' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(14, 165, 233, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Target size={24} color="#38bdf8" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Job Match</h3>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '12px' }}>Senior Software Engineer</p>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 'bold' }}>98% Match</div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
