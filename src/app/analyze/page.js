'use client';
import { Upload, FileText, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import styles from '../styles/Analyze.module.css';

export default function Analyze() {
    return (
        <div className={styles.analyzePage}>
            <header className={styles.header}>
                <h1 className={styles.title}>Let's Analyze Your Profile</h1>
                <p className={styles.subtitle}>Upload your PDF resume to receive instant, AI-driven career insights.</p>
            </header>

            <div className={styles.uploadSection}>
                <div className={styles.uploadCard}>
                    <div className={styles.uploadIconBox}>
                        <Upload size={48} />
                    </div>
                    <div>
                        <h3 className={styles.uploadTitle}>Drop your resume here</h3>
                        <p className={styles.uploadLimit}>Supports PDF only (Max 5MB)</p>
                    </div>

                    <button className={styles.selectButton}>
                        Select PDF File
                    </button>
                </div>

                <div className={styles.manualEntry}>
                    <p className={styles.manualText}>Or prefer to type it out?</p>
                    <div className={styles.manualLink}>
                        Enter details manually <ArrowRight size={20} />
                    </div>
                </div>
            </div>

            <div className={styles.securityNote}>
                <Lock size={16} />
                <span>Your data is encrypted and protected by CareerTrust security protocols.</span>
            </div>
        </div>
    );
}
