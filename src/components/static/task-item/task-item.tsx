import { NavLink } from 'react-router-dom';
import React from 'react';
import styles from './task-item.module.css';

interface TaskItemProps {
  id: string;
  time: string;
  todoValue: string;
}

export const TaskItem: React.FC<TaskItemProps> = ({ id, time, todoValue }) => {
  return (
    <div className={styles.taskItem}>
      <label className={styles.checkboxLabel}>
        <input type="checkbox" className={styles.checkbox} />
        <NavLink to={`/task/${id}`} className={({ isActive }) => (isActive ? styles.currentTaskLink : styles.taskLink)}>
          {todoValue}
        </NavLink>
      </label>
      <span className={styles.taskTime}>{time}</span>
    </div>
  );
};
