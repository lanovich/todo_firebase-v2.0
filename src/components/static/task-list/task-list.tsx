import React, { useState, useRef, useEffect } from "react";
import styles from "./task-list.module.css";
import { TaskItem } from "../task-item/task-item";
import { AddTaskField } from "../addTaskField/add-task-field";
import { ArrowDownAZ } from "lucide-react";
import { Todos } from "../../../types";
import { useFilterTodos, useSortTodos } from "../../../hooks";

interface TaskListProps {
  todos: Todos;
}

export const TaskList: React.FC<TaskListProps> = ({ todos }) => {
  const { filteredTodos } = useFilterTodos(todos);
  const { sortedTodos } = useSortTodos(filteredTodos);

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const displayedTodos = isSorted ? sortedTodos : filteredTodos;

  const enableAddTask = () => {
    setIsAddingTask(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  console.log('рендер списка задач')

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Control") enableAddTask();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSort = () => setIsSorted((prev) => !prev);

  return (
    <div className={styles.taskListContainer}>
      <div className={styles.taskList}>
        <h2>Список задач для проекта</h2>

        {Object.entries(displayedTodos).map(([id, { time, todoValue }]) => (
          <TaskItem key={id} time={time} todoValue={todoValue} id={id} />
        ))}

        <AddTaskField
          isAddingTask={isAddingTask}
          setIsAddingTask={setIsAddingTask}
          inputRef={inputRef}
          enableAddTask={enableAddTask}
        />
      </div>

      <div className={styles.actionButtons}>
        <button
          className={
            isAddingTask
              ? `${styles.disabled} ${styles.actionButton}`
              : `${styles.actionButton} ${styles.green}`
          }
          onClick={enableAddTask}
        >
          {isAddingTask ? `Напишите задачу` : `Добавить новую задачу`}
        </button>
        <button
          className={`${styles.actionButton} ${styles.sort}`}
          onClick={toggleSort}
        >
          {isSorted ? 'Сброс сортировки' : <ArrowDownAZ size={32} color="#4d4646" />}
        </button>
      </div>
    </div>
  );
};
