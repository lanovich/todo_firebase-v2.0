import { useEffect, useState } from "react";
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

interface Todo {
  time: string;
  todoValue: string;
}

interface Project {
  id: string;
  name: string;
  todos: { [key: string]: Todo };
}

export const useRequestGetProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const projectsDbRef = ref(db, 'projects');
    return onValue(projectsDbRef, (snapshot) => {
      const loadedProjects = snapshot.val() || {};

      const transformedProjects = Object.keys(loadedProjects).map((projectId) => {
        const projectData = loadedProjects[projectId];
        
        return {
          id: projectId,
          name: projectData.name,
          todos: projectData.todos || {},
        };
      });

      setProjects(transformedProjects);
    });
  }, []);

  return {
    projects,
  };
};
