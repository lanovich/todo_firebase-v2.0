import React, { useRef, useState, useEffect } from "react";
import {
  useRequestDeleteProject,
  useRequestGetProjectsList,
} from "../../../hooks";
import styles from "./project-list.module.css";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useRequestAddProject } from "../../../hooks/use-request-add-project";
import { useCurrentProjectStore } from "../../../store/useCurrentProjectStore";

export const ProjectList: React.FC = () => {
  const { projects } = useRequestGetProjectsList();
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { requestAddProject } = useRequestAddProject();
  const { projectId } = useParams();
  const { setCurrentProject, currentProjectName } = useCurrentProjectStore();
  const { requestDeleteProject } = useRequestDeleteProject();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const currentProject = projects.find((project) => project.id === projectId);

  useEffect(() => {
    if (currentProject) {
      setCurrentProject(currentProject.id, currentProject.name);
    }
  }, [currentProject, setCurrentProject]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    setIsAddingProject(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleBlur = () => {
    if (inputValue) {
      requestAddProject(inputValue);
    }
    setIsAddingProject(false);
    setInputValue("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue) {
      requestAddProject(inputValue);
    }
    setIsAddingProject(false);
    setInputValue("");
  };

  const handleDelete = () => {
    if (confirm("Вы действительно хотите удалить проект, в котором вы находитесь?")) {
      requestDeleteProject(projectId);
  
      if (currentProject && currentProject.id === projectId) {
        setCurrentProject("", "");
      }
      navigate("/");
    }
  };

  return (
    <div className={styles.projectListContainer}>
      <div className={styles.currentProject}>
        {currentProjectName ? currentProjectName : "Проект не выбран"}
      </div>

      <div className={styles.listContainer}>
        {projects.map(({ id, name }) => (
          <div key={id} className={styles.projectItem}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.currentProjectLink : styles.projectLink
              }
              to={`/project/${id}`}
            >
              {name}
            </NavLink>
          </div>
        ))}
        {isAddingProject ? (
          <form onSubmit={handleSubmit} id="updateTodo">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={styles.projectTextArea}
            />
          </form>
        ) : (
          <div className={styles.helpText}>
            Нажмите "+", чтобы добавить проект
          </div>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <button onClick={handleClick} className={styles.addButton}>
          +
        </button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          -
        </button>
      </div>
    </div>
  );
};
