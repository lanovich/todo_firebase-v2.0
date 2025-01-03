import styles from "./project-list.module.css";

export const ProjectList = () => {
  return (
    <div className={styles.projectListContainer}>
      <div className={styles.currentProject}>Текущий проект</div>

      <div className={styles.listContainer}>
        {Array(4)
          .fill("В разработке")
          .map((text, index) => (
            <div key={index} className={styles.projectItem}>
              {text}
            </div>
          ))}
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.addButton}>+</button>
        <button className={styles.deleteButton}>-</button>
      </div>
    </div>
  );
};
