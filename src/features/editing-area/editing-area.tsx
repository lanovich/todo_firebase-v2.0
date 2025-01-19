import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import styles from "./editing-area.module.css";
import { Description } from "../../shared";
import { TextField } from "../editing-area-text-field/text-field";
import { Tornado, ArrowBigLeft } from "lucide-react";
import { Todos } from "../../types";
import { useTodos } from "../../entities/Todos/useTodos";

export const EditingArea: React.FC = () => {
  const { taskId } = useParams();
  const { todos }: { todos: Todos } = useTodos();
  const navigate = useNavigate();

  const task = taskId ? todos[taskId] : undefined;

  useEffect(() => {
    if (taskId && !task) {
      navigate(-1);
    }
  }, [taskId, task, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <aside className={styles.container}>
      <div className={styles.headerContainer}>
        {taskId ? (
          <button onClick={handleGoBack} className={styles.goBackArrow}>
            <ArrowBigLeft size={20} />
          </button>
        ) : null}
        <span className={styles.heading}>Область для редактирования</span>
      </div>
      {task ? (
        <TextField value={task.todoValue} taskId={taskId} />
      ) : (
        <div className={styles.emptyTextField}>
          <Tornado className={styles.emptyIcon} />
        </div>
      )}
      <Description>Отредактируйте задачу</Description>
    </aside>
  );
};
