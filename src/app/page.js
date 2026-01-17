'use client';
import Link from 'next/link';
import styles from './styles/Home.module.css';
import GrowthGraph from './components/GrowthGraph';
import { ArrowRight, Sparkles, Target, TrendingUp, CheckCircle, Briefcase, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.mainSection}>

        {/* Left: Text Content */}
        <div className={styles.textContent}>
          <div className={styles.badge}>
            <ShieldCheck size={18} />
            <span>Regulated & Secure Career Intelligence</span>
          </div>

          <h1 className={styles.headline}>
            Your Career Path, <br />
            <span className={styles.gradientText}>Fully Optimized.</span>
          </h1>

          <p className={styles.subheadline}>
            Join 12,000+ professionals leveraging AI-driven insights to navigate career transitions with absolute confidence and data-backed assurance.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/signup" className={styles.btnPrimary}>
              Start Free Analysis
              <ArrowRight size={22} />
            </Link>
            <div className={styles.btnSecondary}>
              <Briefcase size={22} className="text-sky-500" />
              Enterprise Solutions
            </div>
          </div>

          <div className={styles.trustStats}>
            <div className={styles.statItem}>
              <CheckCircle size={20} className="text-sky-500" />
              <span>Bank-Level Security</span>
            </div>
            <div className={styles.statItem}>
              <CheckCircle size={20} className="text-sky-500" />
              <span>Real-time Job Data</span>
            </div>
            <div className={styles.statItem}>
              <CheckCircle size={20} className="text-sky-500" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>

        {/* Right: Visual Content */}
        <div className={styles.visualContent}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px', height: '100%' }}>

            {/* Main Premium Card */}
            <div className="premium-card" style={{ position: 'absolute', top: '15%', left: '0', width: '100%', padding: '40px', zIndex: 5 }}>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">Growth Projection</h3>
                <div className="px-3 py-1 bg-sky-500/10 text-sky-500 rounded-full text-xs font-bold">+42% YoY</div>
              </div>
              <GrowthGraph data={[20, 30, 45, 40, 60, 55, 80]} color="#0ea5e9" />
              <div className="mt-8 flex gap-4">
                <div className="flex-1 p-4 bg-background/50 rounded-2xl border border-border">
                  <span className="text-xs text-muted font-bold uppercase">Skills Gap</span>
                  <div className="text-lg font-bold">Minimized</div>
                </div>
                <div className="flex-1 p-4 bg-background/50 rounded-2xl border border-border">
                  <span className="text-xs text-muted font-bold uppercase">Market Value</span>
                  <div className="text-lg font-bold">+$12.5k</div>
                </div>
              </div>
            </div>

            {/* Small Floating Assurance Card */}
            <div className="glass-panel animate-float" style={{ position: 'absolute', bottom: '15%', right: '-30px', width: '260px', padding: '24px', borderRadius: '24px', zIndex: 10 }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-sky-500/20 rounded-full flex items-center justify-center">
                  <Target size={24} className="text-sky-500" />
                </div>
                <div>
                  <h4 className="font-bold">Job Match</h4>
                  <p className="text-xs text-muted">Technical Lead</p>
                </div>
              </div>
              <div className="text-2xl font-black text-sky-500">98.4%</div>
              <p className="text-[10px] text-muted font-bold uppercase mt-2">Accuracy Rating</p>
            </div>

          </div>
        </div>

      </main>

      {/* Brand Trust Section (Corrected Footer) */}
      <section className={styles.brandSection}>
        <div className={styles.brandContainer}>
          <p className="text-[10px] uppercase tracking-widest font-black text-muted mb-8 text-center opacity-60">
            Securing Futures for Industry Leaders
          </p>
          <div className={styles.brandGrid}>
            <div className={styles.brandLogo}>FORTUNE</div>
            <div className={`${styles.brandLogo} italic`}>techCorp</div>
            <div className={styles.brandLogo}>GLOBAL</div>
            <div className={`${styles.brandLogo} tracking-tighter`}>nextStep</div>
            <div className={styles.brandLogo}>PIONEER</div>
          </div>
        </div>
      </section>
    </div>
  );
}
