import { useMemo } from "react";
import { Todos } from "../types";

export const useSortTodos = (filteredTodos: Todos) => {
  const sortedTodos = useMemo(() => {
    if (!filteredTodos) return {};

    return Object.fromEntries(
      Object.entries(filteredTodos).sort(([, todoA], [, todoB]) => {
        return todoA.todoValue.localeCompare(todoB.todoValue, "ru");
      })
    );
  }, [filteredTodos]);

  return { sortedTodos };
};
