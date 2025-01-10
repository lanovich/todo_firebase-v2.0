import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./task-list.module.css";
import { TaskItem } from "../task-item/task-item";
import { AddTaskField } from "../addTaskField/add-task-field";
import { ArrowDownAZ } from "lucide-react";
import { Todos } from "../../../types";
import {
  useFilterTodos,
  useRequestGetProjectsList,
  useSortTodos,
} from "../../../hooks";
import { useCurrentProjectStore } from "../../../store/useCurrentProjectStore";
import { useParams } from "react-router-dom";

interface TaskListProps {
  todos: Todos;
}

export const TaskList: React.FC<TaskListProps> = ({ todos }) => {
  const { projectId } = useParams();
  const { filteredTodos } = useFilterTodos(todos);
  const { projects } = useRequestGetProjectsList();
  const { sortedTodos } = useSortTodos(filteredTodos);
  const { setCurrentProject, currentProjectName } = useCurrentProjectStore();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentProject = useMemo(
    () => projects.find((project) => project.id === projectId),
    [projects, projectId]
  );

  useEffect(() => {
    if (currentProject && currentProject.id !== projectId) {
      setCurrentProject(currentProject.id, currentProject.name);
    }
  }, [currentProject, projectId, setCurrentProject]);

  const displayedTodos = useMemo(
    () => (isSorted ? sortedTodos : filteredTodos),
    [isSorted, sortedTodos, filteredTodos]
  );

  const enableAddTask = () => {
    setIsAddingTask(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") enableAddTask();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSort = () => setIsSorted((prev) => !prev);

  return (
    <div className={styles.taskListContainer}>
      <div className={styles.taskList}>
        <h2>
          Список задач для проекта "
          <b className={styles.projectHeading}>
            {currentProjectName ? currentProjectName : "выберите проект"}
          </b>
          "
        </h2>

        {Object.entries(displayedTodos).map(([id, { time, todoValue }]) => (
          <TaskItem key={id} time={time} todoValue={todoValue} id={id} />
        ))}

        {projectId ? (
          <AddTaskField
            isAddingTask={isAddingTask}
            setIsAddingTask={setIsAddingTask}
            inputRef={inputRef}
            enableAddTask={enableAddTask}
          />
        ) : (
          <h5>Вы должны выбрать проект, чтобы добавлять задачи 👮‍♀️</h5>
        )}
      </div>

      <div className={styles.actionButtons}>
        <button
          className={
            projectId
              ? isAddingTask
                ? `${styles.disabled} ${styles.actionButton}`
                : `${styles.actionButton} ${styles.green}`
              : `${styles.disabled} ${styles.actionButton}`
          }
          onClick={enableAddTask}
        >
          {projectId
            ? isAddingTask
              ? `Напишите задачу`
              : `Добавить новую задачу`
            : "Проект не выбран"}
        </button>
        <button
          className={projectId ? `${styles.actionButton} ${styles.sort}` : `${styles.disabled} ${styles.actionButton}`}
          onClick={toggleSort}
        >
          {isSorted ? (
            "Сброс сортировки"
          ) : (
            <ArrowDownAZ size={32} color="#E8E6E3" />
          )}
        </button>
      </div>
    </div>
  );
};
