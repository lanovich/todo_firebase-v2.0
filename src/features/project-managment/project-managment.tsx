import styles from "./project-managment.module.css";
import { Description } from "../../shared";
import { ProjectList } from "../project-list/project-list";

export const ProjectManagment = () => {
  return (
    <aside className={styles.container}>
      <ProjectList />
      <Description>Список проектов</Description>
    </aside>
  );
};
