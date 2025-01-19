import React, { useEffect, useRef, useState } from "react";
import styles from "./project-list.module.css";
import { FolderPlus, FolderX } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useProjects } from "../../entities/Projects/useProjects";

export const ProjectList: React.FC = () => {
  const {
    projects,
    handleAddProject,
    handleDeleteProject,
    currentProjectName,
    handleCurrentProjectChange,
    projectListLoading,
  } = useProjects();

  const [isAddingProject, setIsAddingProject] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { projectId } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    handleCurrentProjectChange(projectId);
  }, [handleCurrentProjectChange, projectId]);

  const focusInput = () => {
    setIsAddingProject(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const resetInput = () => {
    setIsAddingProject(false);
    setInputValue("");
  };

  const addProject = () => {
    if (inputValue.trim()) {
      handleAddProject(inputValue.trim());
      resetInput();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCreateProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addProject();
  };

  const handleBlur = () => {
    if (inputValue) {
      addProject();
    }
    setInputValue("");
    setIsAddingProject(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addProject();
    }
  };

  const handleDelete = () => {
    if (
      confirm(
        "Вы действительно хотите удалить проект, в котором вы находитесь?"
      )
    ) {
      handleDeleteProject(projectId);
      navigate("/");
    }
  };

  return (
    <div className={styles.projectListContainer}>
      <div className={styles.currentProject}>{currentProjectName}</div>

      <div className={styles.listContainer}>
        {projectListLoading
          ? "Загрузка проектов..."
          : Object.entries(projects).map(([id, { name }]) => (
              <div key={id} className={styles.projectItem}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.currentProjectLink : styles.projectLink
                  }
                  to={`/project/${id}`}
                >
                  {`${name}`}
                </NavLink>
              </div>
            ))}
        {isAddingProject ? (
          <form onSubmit={handleCreateProject} id="addProjectForm">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className={styles.projectTextArea}
            />
          </form>
        ) : (
          <div className={styles.helpText}>
            Нажмите <b>на зеленую кнопку</b>, чтобы добавить проект
          </div>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <button
          onClick={focusInput}
          className={`${styles.actionButton} ${styles.addButton}`}
        >
          <FolderPlus size={23} />
        </button>
        <button
          onClick={handleDelete}
          className={`${styles.actionButton} ${styles.deleteButton} ${ !projectId ? styles.disabledDelete : ""}`}
        >
          <FolderX size={23} />
        </button>
      </div>
    </div>
  );
};
