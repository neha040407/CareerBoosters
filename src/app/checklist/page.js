'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ListTodo, Rocket, BookOpen, GraduationCap, Users, Search, Target } from 'lucide-react';
import styles from '../styles/Checklist.module.css';

const ICON_MAP = {
    'Foundation': Target,
    'Skills': Rocket,
    'Certification': GraduationCap,
    'Portfolio': BookOpen,
    'Networking': Users,
    'Preparation': Search
};

export default function Checklist() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('/api/checklist', {
            headers: {
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        })
            .then(res => res.json())
            .then(data => {
                setTasks(data);
                setLoading(false);
            });
    }, []);

    const toggleTask = async (id) => {
        const task = tasks.find(t => t.id === id);
        const newStatus = !task.completed;

        // Optimistic update
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: newStatus } : t));

        const token = localStorage.getItem('token');
        await fetch('/api/checklist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify({ id, completed: newStatus })
        });
    };

    const progress = tasks.length > 0
        ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
        : 0;

    if (loading) return <div className="p-20 text-center font-bold opacity-50">Authenticating Checklist...</div>;

    return (
        <div className={styles.checklistPage}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Skill Verification</h1>
                    <p className={styles.subtitle}>Verified audit of your professional development milestones.</p>
                </div>
                <div className={styles.progressContainer}>
                    <div className={styles.progressValue}>{progress}%</div>
                    <div className={styles.progressLabel}>Compliance</div>
                </div>
            </header>

            <div className={styles.progressBarWrapper}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <div className={styles.taskList}>
                {tasks.map((task) => {
                    const Icon = ICON_MAP[task.category] || Target;
                    return (
                        <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`${styles.taskCard} ${task.completed ? styles.completedTask : ''}`}
                        >
                            <div className={`${styles.iconBox} ${task.completed ? styles.completedIconBox : ''}`}>
                                <Icon size={24} />
                            </div>

                            <div className={styles.taskInfo}>
                                <h3 className={`${styles.taskText} ${task.completed ? styles.completedText : ''}`}>
                                    {task.text}
                                </h3>
                                <span className={styles.categoryBadge}>{task.category}</span>
                            </div>

                            <div className={`${styles.checkIcon} ${task.completed ? styles.checked : ''}`}>
                                {task.completed ? <CheckCircle2 size={32} /> : <Circle size={32} />}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles.tipCard}>
                <div className={styles.tipIcon}>
                    <ListTodo size={24} />
                </div>
                <p className={styles.tipText}>
                    <b>Professional Assurance:</b> These milestones are dynamically generated based on current market trends for <b>Staff Level</b> engineering roles.
                </p>
            </div>
        </div>
    );
}
