export interface Todo {
  time: string;
  todoValue: string;
}

export type Todos = {
  [key: string]: Todo;
};
