import React, { useState } from "react";
import styles from "./add-task-field.module.css";
import { useTodos } from "../../entities/Todos/useTodos";
import { useParams } from "react-router-dom";

interface AddTaskFieldProps {
  className?: string;
  isAddingTask: boolean;
  setIsAddingTask: (arg: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  enableAddTask: () => void;
}

export const AddTaskField: React.FC<AddTaskFieldProps> = ({
  isAddingTask,
  setIsAddingTask,
  inputRef,
  enableAddTask,
}) => {
  const { handleAddTodo } = useTodos();
  const { projectId } = useParams();
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim()) {
      handleAddTodo(value.trim(), projectId);
      setValue("");
      setIsAddingTask(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    if (value.trim()) {
      handleAddTodo(value.trim(), projectId);
    }
    setValue("");
    setIsAddingTask(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <>
      {isAddingTask ? (
        <>
          <form onSubmit={handleSubmit} id="addTodo">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className={styles.taskInput}
            />
          </form>
          <span className={styles.helpText}>
            Для сохранения задачи <b>нажмите Enter</b>
          </span>
        </>
      ) : (
        <div
          onClick={enableAddTask}
          className={`${styles.addTaskField} ${styles.helpText}`}
        >
          <b>Нажмите на область</b> или <b>Ctrl</b>, чтобы добавить задачу
        </div>
      )}
    </>
  );
};
