'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileSearch,
    CheckSquare,
    Settings,
    LogOut,
    Shield,
    UserCircle
} from 'lucide-react';
import styles from '../styles/Dashboard.module.css';

export default function Sidebar() {
    const pathname = usePathname();
    // Mock logged in state for now
    const isLoggedIn = true;

    const menuItems = [
        { name: 'Home', icon: Shield, path: '/' },
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Analysis', icon: FileSearch, path: '/analyze' },
        { name: 'Checklist', icon: CheckSquare, path: '/checklist' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];

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
                {isLoggedIn ? (
                    <>
                        <div className={styles.userCard}>
                            <div className={styles.avatar}>JD</div>
                            <div className={styles.userInfo}>
                                <div className={styles.userName}>John Doe</div>
                                <div className={styles.userRole}>Premium Member</div>
                            </div>
                        </div>
                        <Link href="/login" className={styles.navLink} style={{ marginTop: '16px' }}>
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
