'use client';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import styles from '../styles/Dashboard.module.css';

export default function ClientLayout({ children }) {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.body.setAttribute('data-theme', savedTheme);
    }, []);

    return (
        <div className={styles.dashboardLayout}>
            {/* Global Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-sky-900/10 rounded-full blur-[100px]" />
            </div>

            <Sidebar />
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}
