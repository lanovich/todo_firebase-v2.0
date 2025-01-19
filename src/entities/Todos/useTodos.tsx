import { projectId, Todo, UpdateTodoPayload, todoId } from "../types";
import { onValue, ref } from "firebase/database";
import { createTodo, updateTodo, deleteTodo } from "../api";
import { ReactNode, useEffect, useState } from "react";
import React from "react";
import { db } from "../../firebase";
import { useProjects } from "../Projects/useProjects";
import { useFilterTodos, FilteredTodosResult } from "../useFilterTodos";

type TodosContextProps = {
  todos: Record<string, Todo>;
  handleAddTodo: (
    todoValue: string,
    projectId: string | undefined
  ) => Promise<void>;
  handleDeleteTodo: (projectId: projectId, todoId: todoId) => Promise<void>;
  handleUpdateTodo: (
    projectId: projectId,
    todoId: string,
    value: UpdateTodoPayload
  ) => Promise<void>;
  loading: boolean;
} & FilteredTodosResult;

const TodoContext = React.createContext<Omit<
  TodosContextProps,
  "FilteredTodosResult"
> | null>(null);

export const TodosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Record<string, Todo>>({});
  const { projectId } = useProjects();
  const [loading, setLoading] = useState(false);
  const { filteredTodos, search, setSearch, sort, setSort } =
    useFilterTodos(todos);

  useEffect(() => {
    setLoading(true);
    const todosDbRef = ref(db, `projects/${projectId}/todos`);

    const unsubscribe = onValue(todosDbRef, (snapshot) => {
      const todosFromDb = snapshot.val();

      if (todosFromDb) {
        setTodos(todosFromDb);
        setLoading(false);
      } else {
        setTodos({});
        setLoading(false);
      }

      console.log(todosFromDb);
    });

    return () => unsubscribe();
  }, [projectId]);

  const handleAddTodo = async (
    todoValue: string,
    projectId: string | undefined
  ) => {
    const newTodo = await createTodo(todoValue, projectId);
    if (newTodo) {
      console.log("Задача добавлена:", newTodo);
    }
  };

  const handleUpdateTodo = async (
    projectId: projectId,
    todoId: string,
    value: UpdateTodoPayload
  ) => {
    await updateTodo(projectId, todoId, value);

    setTodos((prevTodos) =>
      Object.entries(prevTodos).reduce((updatedTodos, [id, todo]) => {
        updatedTodos[id] = id === todoId
          ? { ...todo, ...value }
          : todo;
        return updatedTodos;
      }, {} as Record<string, Todo>)
    );
  };
  
  

  const handleDeleteTodo = async (projectId: projectId, todoId: todoId) => {
    await deleteTodo(projectId, todoId);
  };

  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        filteredTodos,
        search,
        setSearch,
        sort,
        setSort,
        handleAddTodo,
        handleUpdateTodo,
        handleDeleteTodo,
        loading,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTodos = () => {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }

  return context;
};
