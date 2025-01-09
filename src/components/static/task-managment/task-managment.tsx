import React from "react";
import { useParams } from "react-router-dom";
import styles from "./task-managment.module.css";
import { Description, InputField } from "../../shared";
import { TaskList } from "../task-list/task-list";
import { useRequestGetTodosList } from "../../../hooks";

export const TaskManagment: React.FC = () => {
  const { projectId } = useParams();
  const { todos } = useRequestGetTodosList(projectId);

  return (
    <main className={styles.container}>
      <InputField placeholder="Поиск по задачам внутри проекта" />
      <TaskList todos={todos} />
      <Description>Список задач в текущем проекте</Description>
    </main>
  );
};
