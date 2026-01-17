import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { Shield } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                {/* Logo Section */}
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <span className={styles.logoText}>
                        Career<span className={styles.logoHighlight}>Trust</span>
                    </span>
                </Link>

                {/* Auth Buttons */}
                <div className={styles.navLinks}>
                    <Link href="/login" className={styles.linkLogin}>
                        Log In
                    </Link>
                    <Link href="/signup" className={styles.linkStart}>
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
