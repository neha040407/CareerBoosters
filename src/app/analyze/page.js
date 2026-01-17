'use client';
import { useState, useRef } from 'react';
import { Upload, FileText, ArrowRight, ShieldCheck, Lock, CheckCircle, AlertCircle, Sparkles, Loader2 } from "lucide-react";
import styles from '../styles/Analyze.module.css';

export default function Analyze() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, uploading, success, error
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError('');
        } else {
            setError('Please select a valid PDF file.');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setStatus('uploading');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setResults(data.analysis);
                setStatus('success');
            } else {
                throw new Error(data.error || 'Failed to analyze resume');
            }
        } catch (err) {
            setError(err.message);
            setStatus('error');
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    if (status === 'success' && results) {
        return (
            <div className={styles.analyzePage}>
                <header className={styles.header}>
                    <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-500 w-8 h-8" />
                    </div>
                    <h1 className={styles.title}>Analysis Complete</h1>
                    <p className={styles.subtitle}>Our AI has decoded your professional profile.</p>
                </header>

                <div className="grid md:grid-cols-2 gap-8 fade-slide-up">
                    <div className="premium-card p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Sparkles className="text-sky-500" />
                            Market Compatibility
                        </h3>
                        <div className="space-y-6">
                            {results.roles.map((role, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-background rounded-2xl border border-border">
                                    <span className="font-bold">{role.title}</span>
                                    <span className="text-sky-500 font-bold">{role.match}% Match</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="premium-card p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <ShieldCheck className="text-sky-500" />
                            Skill Gap Analysis
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {results.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-sky-500/10 text-sky-500 rounded-full text-xs font-bold">{skill}</span>
                            ))}
                        </div>
                        <h4 className="text-sm font-bold text-muted mb-4 uppercase tracking-widest">Recommended Actions</h4>
                        <ul className="space-y-3">
                            {results.recommendations.map((rec, i) => (
                                <li key={i} className="text-sm flex gap-3 text-muted">
                                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1.5 shrink-0" />
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <button onClick={() => setStatus('idle')} className={styles.selectButton}>
                        Analyze Another Resume
                    </button>
                    <p className="mt-6 text-sm text-muted">Results are archived in your dashboard.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.analyzePage}>
            <header className={styles.header}>
                <h1 className={styles.title}>Let's Analyze Your Profile</h1>
                <p className={styles.subtitle}>Upload your PDF resume to receive instant, AI-driven career insights.</p>
            </header>

            <div className={styles.uploadSection}>
                <div
                    className={`${styles.uploadCard} ${file ? 'border-sky-500 bg-sky-500/5' : ''}`}
                    onClick={status === 'idle' ? triggerFileSelect : null}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept=".pdf"
                        className="hidden"
                    />

                    <div className={styles.uploadIconBox}>
                        {status === 'uploading' ? (
                            <Loader2 className="w-12 h-12 text-sky-500 animate-spin" />
                        ) : (
                            <Upload size={48} />
                        )}
                    </div>

                    <div>
                        <h3 className={styles.uploadTitle}>
                            {file ? file.name : 'Drop your resume here'}
                        </h3>
                        <p className={styles.uploadLimit}>
                            {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Supports PDF only (Max 5MB)'}
                        </p>
                    </div>

                    {file && status === 'idle' && (
                        <button
                            className={styles.selectButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleUpload();
                            }}
                        >
                            Analyze Now
                        </button>
                    )}

                    {!file && (
                        <button className={styles.selectButton}>
                            Select PDF File
                        </button>
                    )}

                    {status === 'uploading' && (
                        <p className="font-bold text-sky-500 animate-pulse">
                            Processing with AI...
                        </p>
                    )}
                </div>

                {error && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 font-bold">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

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
