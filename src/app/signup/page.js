'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import styles from '../styles/Signup.module.css';

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');
            router.push('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.signupPage}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="text-sky-500 w-7 h-7" />
                    </div>
                    <h1 className={styles.title}>Secure Sign Up</h1>
                    <p className={styles.subtitle}>Build your professional future with confidence.</p>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Full Name</label>
                        <div className={styles.inputWrapper}>
                            <User className={styles.icon} size={22} />
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="e.g. John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email Address</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.icon} size={22} />
                            <input
                                className={styles.input}
                                type="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Password</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.icon} size={22} />
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Minimum 6 characters"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Securing Account...' : 'Create Account'}
                        {!loading && <ArrowRight size={22} />}
                    </button>
                </form>

                <div className={styles.footer}>
                    Already a member?
                    <Link href="/login" className={styles.link}>Sign in now</Link>
                </div>
            </div>
        </div>
    );
}
