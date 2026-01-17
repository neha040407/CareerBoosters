'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import styles from '../styles/Signup.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                router.push('/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.signupPage}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Shield size={32} className="text-sky-500" />
                    </div>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Enter your details to access your dashboard.</p>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Registered Email</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.icon} size={22} />
                            <input
                                type="email"
                                className={styles.input}
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Secure Password</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.icon} size={22} />
                            <input
                                type="password"
                                className={styles.input}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Sign In'}
                        {!loading && <ArrowRight size={22} />}
                    </button>
                </form>

                <div className={styles.footer}>
                    New to CareerTrust?
                    <Link href="/signup" className={styles.link}> Joining is free</Link>
                </div>
            </div>
        </div>
    );
}
