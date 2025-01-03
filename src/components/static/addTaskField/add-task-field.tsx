import React, { useState } from "react";
import { useRequestAddTodo } from "../../../hooks/use-request-add-todo";
import styles from './add-task-field.module.css'

interface AddTaskFieldProps {
  className?: string;
  isAddingTask: boolean;
  setIsAddingTask: (arg: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  enableAddTask: () => void;
}

export const AddTaskField: React.FC<AddTaskFieldProps> = ( { isAddingTask, setIsAddingTask, inputRef, enableAddTask } ) => {
  const { requestAddTodo } = useRequestAddTodo();
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim()) {
      requestAddTodo(value.trim());
      setValue("");
      setIsAddingTask(false);
    }
    setIsAddingTask(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleBlur = () => {
    if (value.trim()) {
      requestAddTodo(value.trim());
    }
    setValue("");
    setIsAddingTask(false);
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
              className={styles.taskInput}
            />
          </form>
          <span className={styles.helpText}>
            Для сохранения задачи <b>нажмите в любом месте</b> или <b>Enter</b>
          </span>
        </>
      ) : (
        <div onDoubleClick={enableAddTask} className={`${styles.addTaskField} ${styles.helpText}`}>
          <b>Нажмите дважды</b> или <b>Ctrl</b>, чтобы добавить задачу
        </div>
      )}
    </>
  );
};
