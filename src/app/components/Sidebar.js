'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileSearch,
    CheckSquare,
    Settings,
    LogOut,
    Shield,
    UserCircle,
    Map
} from 'lucide-react';
import styles from '../styles/Dashboard.module.css';

export default function Sidebar() {
    const pathname = usePathname();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch('/api/auth/me', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setUser(data);
                    } else if (res.status === 401) {
                        localStorage.removeItem('token');
                    }
                } catch (err) {
                    console.error('Failed to fetch user');
                }
            }
        };
        fetchUser();
    }, [pathname]);

    const menuItems = [
        { name: 'Home', icon: Shield, path: '/' },
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Analysis', icon: FileSearch, path: '/analyze' },
        { name: 'Roadmap', icon: Map, path: '/roadmap' },
        { name: 'Checklist', icon: CheckSquare, path: '/checklist' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
    };

    return (
        <aside className={styles.sidebar}>
            <Link href="/" className={styles.logo}>
                <div className={styles.logoIcon}>
                    <Shield size={20} strokeWidth={2.5} />
                </div>
                <span className={styles.logoText}>
                    Career<span className={styles.logoHighlight}>Trust</span>
                </span>
            </Link>

            <nav className={styles.navSection}>
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
                    >
                        <item.icon size={20} />
                        <span className={styles.navText}>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className={styles.footer}>
                {user ? (
                    <>
                        <div className={styles.userCard}>
                            <div className={styles.avatar}>
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className={styles.userInfo}>
                                <div className={styles.userName}>{user.name}</div>
                                <div className={styles.userRole}>Premium Member</div>
                            </div>
                        </div>
                        <Link href="/login" onClick={handleLogout} className={styles.navLink} style={{ marginTop: '16px' }}>
                            <LogOut size={20} />
                            <span className={styles.navText}>Logout</span>
                        </Link>
                    </>
                ) : (
                    <Link href="/login" className={styles.navLink}>
                        <UserCircle size={20} />
                        <span className={styles.navText}>Sign In</span>
                    </Link>
                )}
            </div>
        </aside>
    );
}
