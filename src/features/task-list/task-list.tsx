import { useState, useRef, useEffect } from "react";
import styles from "./task-list.module.css";
import { AddTaskField } from "../addTaskField/add-task-field";
import { ArrowDownAZ, ArrowUpAZ, X, ArrowDownUp } from "lucide-react";
import { useTodos } from "../../entities/Todos/useTodos";
import { TaskItem } from "../task-item";
import { useParams } from "react-router-dom";
import { useProjects } from "../../entities/Projects/useProjects";

export const TaskList = () => {
  const { todos, loading } = useTodos();
  const { setProjectId, currentProjectName } = useProjects();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { projectId } = useParams();
  const { filteredTodos, sort, setSort } = useTodos();

  const inputRef = useRef<HTMLInputElement>(null);

  const enableAddTask = () => {
    setIsAddingTask(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleClearSort = () => {
    setSort("disabled");
  };

  const handleToggleSort = () => {
    if (sort !== "disabled") {
      setSort((prev) => (prev === "asc" ? "desc" : "asc"));
    } else setSort("asc")
  };

  useEffect(() => {
    if (projectId) {
      setProjectId(projectId);
    }
  }, [projectId, setProjectId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") enableAddTask();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  console.log(Object.entries(todos));

  return (
    <div className={styles.taskListContainer}>
      <div className={styles.taskList}>
        <h2>
          Список задач для проекта "
          <b className={styles.projectHeading}>
            {projectId ? currentProjectName : "..."}
          </b>
          "
        </h2>
        {loading ? (
          <div className="">"Загрузка..."</div>
        ) : (
          projectId &&
          Object.entries(filteredTodos).map(
            ([id, { checked, time, todoValue }]) => (
              <TaskItem
                key={id}
                time={time}
                todoValue={todoValue}
                id={id}
                checked={checked}
              />
            )
          )
        )}

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
        <div className={styles.sortButtonsGroup}>
          {sort === "disabled" ? (
            ""
          ) : (
            <button
              onClick={handleClearSort}
              className={`${styles.actionButton} ${styles.disableSort}`}
            >
              <X />
            </button>
          )}
          <button
            className={
              projectId
                ? `${styles.actionButton} ${styles.sort}`
                : `${styles.disabled} ${styles.actionButton}`
            }
            onClick={handleToggleSort}
          >
            {sort === "disabled" ? <ArrowDownUp size={24}/> : sort === "asc" ? (
              <ArrowDownAZ size={24} color="#E8E6E3" />
            ) : (
              <ArrowUpAZ size={24} color="#E8E6E3" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
