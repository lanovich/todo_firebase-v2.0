import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRequestUpdateTodo, useRequestDeleteTodo } from "../../../hooks";
import styles from "./text-field.module.css";
import { ModalWindow } from "../../shared";
import { useModalStore } from "../../../store/useModalStore";

interface TextFieldProps {
  taskId: string | undefined;
  value: string;
}

export const TextField: React.FC<TextFieldProps> = ({ value, taskId }) => {
  const { projectId } = useParams();
  const { requestUpdateTodo } = useRequestUpdateTodo(projectId);
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  const [updatedInputValue, setUpdatedInputValue] = useState(value);
  const { requestDeleteTodo } = useRequestDeleteTodo(projectId);
  const { isModalOpen, setIsModalOpen, openModal, closeModal } =
    useModalStore();

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
      requestUpdateTodo(taskId, updatedInputValue.trim());
    }
    setIsUpdatingTask(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    autoResize(event.target);
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

  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  console.log(projectId);

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
