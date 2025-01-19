import { NavLink } from "react-router-dom";
import React from "react";
import styles from "./task-item.module.css";
import { useTodos } from "../../entities/Todos/useTodos";
import { projectId } from "../../entities/types";
import { useProjects } from "../../entities/Projects/useProjects";

interface TaskItemProps {
  id: string;
  time: string;
  todoValue: string;
  checked: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  id,
  time,
  todoValue,
  checked,
}) => {
  const { handleUpdateTodo } = useTodos();
  const { projectId } = useProjects();

  const handleToggleTodo = async (
    projectId: projectId,
    todoId: string,
    checked: boolean
  ) => {
    await handleUpdateTodo(projectId, todoId, { checked });
  };

  return (
    <div className={styles.taskItem}>
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkbox}
          onChange={(e) => handleToggleTodo(projectId, id, e.target.checked)}
          type="checkbox"
          checked={checked}
        />
        <NavLink
          to={`task/${id}`}
          className={({ isActive }) =>
            isActive ? styles.currentTaskLink : styles.taskLink
          }
        >
          {todoValue}
        </NavLink>
      </label>
      <span className={styles.taskTime}>{time}</span>
    </div>
  );
};
