import React from "react";
import { RouteProvider } from "./RouteProvider";
import { TodosProvider } from "../../entities/Todos/useTodos";
import { ProjectsProvider } from "../../entities/Projects/useProjects";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RouteProvider>
      <ProjectsProvider>
        <TodosProvider>{children}</TodosProvider>
      </ProjectsProvider>
    </RouteProvider>
  );
};
