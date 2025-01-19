import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./text-field.module.css";
import { useTodos } from "../../entities/Todos/useTodos";

interface TextFieldProps {
  taskId: string | undefined;
  value: string;
}

export const TextField: React.FC<TextFieldProps> = ({ value, taskId }) => {
  const { projectId } = useParams();
  const { handleDeleteTodo, handleUpdateTodo } = useTodos();
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  const [updatedInputValue, setUpdatedInputValue] = useState(value);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const enableUpdateTask = () => {
    setUpdatedInputValue(value);
    setIsUpdatingTask(true);
    setTimeout(() => {
      if (textAreaRef.current) {
        autoResize(textAreaRef.current);
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(
          textAreaRef.current.value.length,
          textAreaRef.current.value.length
        );
      }
    }, 0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (taskId && updatedInputValue.trim()) {
      handleUpdateTodo(projectId, taskId, {
        todoValue: updatedInputValue.trim(),
      });
    }
    setIsUpdatingTask(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    autoResize(event.target);
    setUpdatedInputValue(event.target.value);
  };

  const handleBlur = () => {
    if (taskId && updatedInputValue.trim() && updatedInputValue !== value) {
      handleUpdateTodo(projectId, taskId, {
        todoValue: updatedInputValue.trim(),
      });
    }
    setIsUpdatingTask(false);
  };

  const handleDeleteTask = () => {
    if (taskId) {
      handleDeleteTodo(projectId, taskId);
    }
  };

  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  useEffect(() => {
    if (!taskId) {
      navigate(-1);
    }
  }, [taskId, navigate]);

  return (
    <div className={styles.taskRedactorContainer}>
      <div className={styles.task}>
        {isUpdatingTask ? (
          <>
            <form onSubmit={handleSubmit} id="updateTodo">
              <textarea
                ref={textAreaRef}
                value={updatedInputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={styles.taskTextArea}
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
          onClick={handleDeleteTask}
        >
          Удалить задачу
        </button>
      </div>
    </div>
  );
};
