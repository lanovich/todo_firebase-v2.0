import React from "react";
import styles from "./task-managment.module.css";
import { Description, InputField } from "../../shared";
import { TaskList } from "../task-list/task-list";
import { useRequestGetTodosList } from "../../../hooks";
import { Todos } from "../../../types";

export const TaskManagment: React.FC = () => {
  const { todos }: { todos: Todos } = useRequestGetTodosList();

  return (
    <main className={styles.container}>
      <InputField placeholder="Поиск по задачам внутри проекта" />
      <TaskList todos={todos} />
      <Description>Список задач в текущем проекте</Description>
    </main>
  );
};
