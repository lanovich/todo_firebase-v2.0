import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom"
import { projectId } from "../types";
import { createProject, deleteProject } from "../api";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import { Todos } from "../../types";

type ProjectsContextProps = {
  projects: Record<string, Record<string, string | Todos>>;
  handleAddProject: (value: string) => Promise<void>;
  handleDeleteProject: (projectId: projectId) => Promise<void>;
  setProjectId: (projectId: string) => void;
  setProjects: (
    value: React.SetStateAction<Record<string, Record<string, string | Todos>>>
  ) => void;
  projectId: projectId;
  handleCurrentProjectChange: (projectId: string | undefined) => void;
  currentProjectName: string;
  projectListLoading: boolean;
};

const ProjectsContext = createContext<ProjectsContextProps | null>(null);

export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<
    Record<string, Record<string, string | Todos>>
  >({});
  const [projectListLoading, setProjectListLoading] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [currentProjectName, setCurrentProjectName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const projectsRef = ref(db, "projects");
    setProjectListLoading(true);

    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const projectsFromDb = snapshot.val();
      if (projectsFromDb) {
        setProjects(projectsFromDb);
      } else {
        setProjects({});
        setProjectListLoading(false);
      }
      setProjectListLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleCurrentProjectChange = (projectId: string | undefined) => {
    if (Object.entries(projects).length) {
      const currentProject =
        Object.entries(projects).find(([id]) => id === projectId)?.[1]?.name ||
        "Проект не выбран";

      setCurrentProjectName(`${currentProject}`);
    } else {
      setCurrentProjectName("Список проектов пуст");
    }
  };

  const handleAddProject = async (value: string) => {
    try {
      const projectId = await createProject(value);
      setProjects((prevProjects) => ({
        ...prevProjects,
        [`${projectId}`]: {
          name: value,
          time: new Date().toISOString(),
        },
      }));
      navigate(`project/${projectId}`)
    } catch (error) {
      console.error("Ошибка при добавлении проекта:", error);
    }
  };

  const handleDeleteProject = async (projectId: projectId) => {
    try {
      await deleteProject(projectId);
      setProjects((prevProjects) => {
        const updatedProjects = { ...prevProjects };
        delete updatedProjects[projectId || ""];
        return updatedProjects;
      });
    } catch (error) {
      console.error("Ошибка при удалении проекта:", error);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        handleAddProject,
        handleDeleteProject,
        projectListLoading,
        setProjectId,
        projectId,
        setProjects,
        handleCurrentProjectChange,
        currentProjectName,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProjects = (): ProjectsContextProps => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
