import React from "react";
import styles from "./project-managment.module.css";
import { Description, InputField } from "../../shared";
import { ProjectList } from "../project-list/project-list";

interface ProjectManagmentProps {
  className?: string;
}

export const ProjectManagment: React.FC<ProjectManagmentProps> = () => {
  return (
    <aside className={styles.container}>
      <InputField placeholder="Поиск проекта" />
      <ProjectList />
      <Description>Список проектов</Description>
    </aside>
  );
};