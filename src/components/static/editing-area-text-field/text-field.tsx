import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем navigate
import { useRequestUpdateTodo, useRequestDeleteTodo } from "../../../hooks";
import styles from "./text-field.module.css";
import { ModalWindow } from "../../shared";

interface TextFieldProps {
  taskId: string | undefined;
  value: string;
}

export const TextField: React.FC<TextFieldProps> = ({ value, taskId }) => {
  const { requestUpdateTodo } = useRequestUpdateTodo();
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  const [updatedInputValue, setUpdatedInputValue] = useState(value);
  const { requestDeleteTodo } = useRequestDeleteTodo();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); // Хук для навигации

  const enableUpdateTask = () => {
    setUpdatedInputValue(value);
    setIsUpdatingTask(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskId && updatedInputValue.trim()) {
      requestUpdateTodo(taskId, updatedInputValue.trim());
    }
    setIsUpdatingTask(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedInputValue(event.target.value);
  };

  const handleBlur = () => {
    if (taskId && updatedInputValue.trim() && updatedInputValue !== value) {
      requestUpdateTodo(taskId, updatedInputValue.trim());
    }
    setIsUpdatingTask(false);
  };

  const handleDeleteTask = () => {
    if (taskId) {
      requestDeleteTodo(taskId);
      setIsModalOpen(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!taskId) {
      navigate("/");
    }
  }, [taskId, navigate]);

  return (
    <div className={styles.taskRedactorContainer}>
      <div className={styles.task}>
        {isUpdatingTask ? (
          <>
            <form onSubmit={handleSubmit} id="updateTodo">
              <input
                ref={inputRef}
                type="text"
                value={updatedInputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={styles.taskInput}
              />
            </form>
            <div className={styles.helpText}>
              Чтобы сохранить изменения нажмите в любом месте
            </div>
          </>
        ) : taskId ? (
          <>
            <div onDoubleClick={enableUpdateTask}>{value}</div>
            <div className={styles.helpText}>
              Для редактирования <b>нажмите дважды на текст</b>
            </div>
          </>
        ) : (
          <div>задача не найдена</div>
        )}
      </div>

      <div className={styles.actionButtons}>
        <button
          className={
            isUpdatingTask
              ? `${styles.actionButton} ${styles.disabled}`
              : `${styles.actionButton} ${styles.update}`
          }
          onClick={enableUpdateTask}
        >
          {isUpdatingTask ? "Сохраните изменение" : "Редактировать задачу"}
        </button>
        <button
          className={`${styles.actionButton} ${styles.delete}`}
          onClick={openModal}
        >
          Удалить задачу
        </button>

        <ModalWindow
          isOpen={isModalOpen}
          title="Подтверждение удаления"
          description="Вы уверены, что хотите удалить эту задачу?"
          taskName={value}
          onConfirm={handleDeleteTask}
          onCancel={closeModal}
        />
      </div>
    </div>
  );
};
