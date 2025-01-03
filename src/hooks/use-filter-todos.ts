import { useMemo } from "react";
import { Todos } from "../types";
import { useTodoListFilterStore } from "../store";

export const useFilterTodos = (todos: Todos) => {
  const { filterParams } = useTodoListFilterStore();

  const filteredTodos = useMemo(() => {
    if (!todos) return {};

    return Object.fromEntries(
      Object.entries(todos).filter(([, { todoValue }]) =>
        todoValue.toLowerCase().includes(filterParams.toLowerCase())
      )
    );
  }, [todos, filterParams]);

  return { filteredTodos };
};
