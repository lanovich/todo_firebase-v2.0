import { NavLink, useParams } from "react-router-dom";
import React from "react";
import styles from "./editing-area.module.css";
import { Description } from "../../shared";
import { TextField } from "../editing-area-text-field/text-field";
import { useRequestGetTodosList } from "../../../hooks";
import { Tornado, ArrowBigLeft } from "lucide-react";
import { Todos } from "../../../types";

export const EditingArea: React.FC = () => {
  const { taskId } = useParams();
  const { todos }: { todos: Todos } = useRequestGetTodosList();

  console.log("рендер редактирования");

  const task = taskId && todos[taskId];

  return (
    <aside className={styles.container}>
      <div className={styles.headerContainer}>
        {taskId ? (
          <NavLink to={"/"} className={styles.goBackArrow}>
            <ArrowBigLeft size={20}></ArrowBigLeft>
          </NavLink>
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
