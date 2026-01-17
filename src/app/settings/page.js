'use client';
import { useState, useEffect } from 'react';
import { Sun, Moon, Palette, Bell, Lock, User, Check } from 'lucide-react';
import styles from '../styles/Settings.module.css';

export default function Settings() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
    }, []);

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    return (
        <div className={styles.settingsPage}>
            <header className={styles.titleSection}>
                <h1 className={styles.title}>Settings</h1>
                <p className={styles.subtitle}>Personalize your experience and manage your account preferences.</p>
            </header>

            <div className={styles.content}>
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <Palette className={styles.sectionIcon} size={24} />
                        <h2 className={styles.sectionTitle}>Appearance</h2>
                    </div>

                    <div className={styles.themeGrid}>
                        <div
                            onClick={() => toggleTheme('light')}
                            className={`${styles.themeCard} ${theme === 'light' ? styles.activeTheme : ''}`}
                        >
                            <div className={`${styles.themeIconBox} ${styles.lightIconBox}`}>
                                <Sun size={28} />
                            </div>
                            <span className="font-bold">Light Mode</span>
                            {theme === 'light' && <Check className="text-sky-500" size={20} />}
                        </div>

                        <div
                            onClick={() => toggleTheme('dark')}
                            className={`${styles.themeCard} ${theme === 'dark' ? styles.activeTheme : ''}`}
                        >
                            <div className={`${styles.themeIconBox} ${styles.darkIconBox}`}>
                                <Moon size={28} />
                            </div>
                            <span className="font-bold">Dark Mode</span>
                            {theme === 'dark' && <Check className="text-sky-500" size={20} />}
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <User className={styles.sectionIcon} size={24} />
                        <h2 className={styles.sectionTitle}>Profile Information</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Display Name</label>
                            <input type="text" defaultValue="John Doe" className={styles.input} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email Address</label>
                            <input type="email" defaultValue="john@career-trust.com" className={styles.input} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <Bell className={styles.sectionIcon} size={24} />
                        <h2 className={styles.sectionTitle}>Notifications</h2>
                    </div>
                    <div className={styles.toggleRow}>
                        <div className={styles.toggleInfo}>
                            <h4>Email Security Alerts</h4>
                            <p>Receive notifications about new login attempts and security changes.</p>
                        </div>
                        <div className="w-12 h-6 bg-sky-500 rounded-full relative cursor-pointer">
                            <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
