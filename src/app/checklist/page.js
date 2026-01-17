'use client';
import { useState } from 'react';
import { CheckCircle2, Circle, ListTodo, Trophy, Rocket, BookOpen, UserPlus } from 'lucide-react';
import styles from '../styles/Checklist.module.css';

export default function Checklist() {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Complete your profile analysis', completed: true, category: 'Onboarding', icon: UserPlus },
        { id: 2, text: 'Update resume with recent skills', completed: false, category: 'Career', icon: Rocket },
        { id: 3, text: 'Complete "Advanced React" certification', completed: false, category: 'Learning', icon: BookOpen },
        { id: 4, text: 'Connect with 3 industry mentors', completed: false, category: 'Networking', icon: Trophy },
        { id: 5, text: 'Review salary benchmark analysis', completed: false, category: 'Career', icon: Trophy },
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const progress = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);

    return (
        <div className={styles.checklistPage}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>My Checklist</h1>
                    <p className={styles.subtitle}>Track your career growth and completed milestones</p>
                </div>
                <div className={styles.progressContainer}>
                    <div className={styles.progressValue}>{progress}%</div>
                    <div className={styles.progressLabel}>Completion</div>
                </div>
            </header>

            <div className={styles.progressBarWrapper}>
                <div
                    className={styles.progressBar}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <div className={styles.taskList}>
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`${styles.taskCard} ${task.completed ? styles.completedTask : ''}`}
                    >
                        <div className={`${styles.iconBox} ${task.completed ? styles.completedIconBox : ''}`}>
                            <task.icon size={24} />
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
                ))}
            </div>

            <div className={styles.tipCard}>
                <div className={styles.tipIcon}>
                    <ListTodo size={24} />
                </div>
                <p className={styles.tipText}>
                    <b>Pro Tip:</b> Completing your profile analysis unlocks personalized job recommendations tailored to your expertise.
                </p>
            </div>
        </div>
    );
}
