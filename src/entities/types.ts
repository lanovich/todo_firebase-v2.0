export interface Todo {
  time: string;
  todoValue: string;
  checked: boolean;
}

export interface Project {
  name: string;
  time: string;
  todos: Record<string, Record<string, Todo>>;
}

export type CreateProjectPayload = Project;
export type CreateTodoPayload = Todo;
export type UpdateTodoPayload = Partial<Todo>;
export type projectId = string | null | undefined;
export type todoId = string | null | undefined;
