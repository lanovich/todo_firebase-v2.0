import { useMemo, useState } from "react";
import { Todo } from "./types";

type SortOptions = "asc" | "desc" | "disabled";

export type FilteredTodosResult = {
  filteredTodos: Record<string, Todo>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  sort: SortOptions;
  setSort: React.Dispatch<React.SetStateAction<SortOptions>>;
};

export const useFilterTodos = (todos: Record<string, Todo>): FilteredTodosResult => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortOptions>("disabled");

  const sortedTodos = useMemo(() => {
    const todosArray = Object.entries(todos);
    switch (sort) {
      case "asc":
        return Object.fromEntries(
          todosArray.sort(([, a], [, b]) =>
            a.todoValue.localeCompare(b.todoValue)
          )
        );
      case "desc":
        return Object.fromEntries(
          todosArray.sort(([, a], [, b]) =>
            b.todoValue.localeCompare(a.todoValue)
          )
        );
      default:
        return todos;
    }
  }, [sort, todos]);

  const filteredTodos = useMemo(() => {
    if (search) {
      const filtered = Object.entries(sortedTodos).filter(([, todo]) =>
        todo.todoValue.toLowerCase().includes(search.toLowerCase())
      );
      return Object.fromEntries(filtered);
    }

    return sortedTodos;
  }, [search, sortedTodos]);

  return { filteredTodos, search, setSearch, sort, setSort };
};
