import React from "react";
import styles from "./task-managment.module.css";
import { Description } from "../../shared";
import { TaskList } from "../task-list/task-list";
import { InputField } from "../input-field";

export const TaskManagment: React.FC = () => {

  return (
    <main className={styles.container}>
      <InputField placeholder="Поиск по задачам внутри проекта" />
      <TaskList />
      <Description>Список задач в текущем проекте</Description>
    </main>
  );
};
