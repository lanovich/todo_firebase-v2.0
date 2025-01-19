import {
  UpdateTodoPayload,
  projectId,
  todoId,
} from "./types";
import { ref, update, push, remove, set } from "firebase/database";
import { db } from "../firebase";

export const createProject = async (value: string) => {
  try {
    const newProjectRef = push(ref(db, "projects"));
    const newProject = { name: value, time: new Date().toISOString(), id: newProjectRef.key };

    await set(newProjectRef, newProject);
    return newProject.id;
  } catch (error) {
    console.error("Ошибка при создании проекта:", error);
    throw error;
  }
};

export const deleteProject = async (projectId: projectId) => {
  const removeProjectsDbRef = ref(db, `projects/${projectId}`);

  try {
    await remove(removeProjectsDbRef);
    console.log(`Проект с ID ${projectId} был удален`);
  } catch (error) {
    console.error("Не удалось удалить проект: ", error);
    throw error;
  }
};

export const createTodo = async (value: string, projectId: projectId) => {
  const todosDbRef = ref(db, `projects/${projectId}/todos`);
  try {
    const newTodo = {
      todoValue: value,
      time: new Date(Date.now()).toLocaleString(),
      checked: false,
    };
    push(todosDbRef, newTodo);
    return newTodo;
  } catch (error) {
    console.error("Не удалось добавить задачу: ", error);
  }
};

export const updateTodo = async (
  projectId: projectId,
  todoId: todoId,
  updates: UpdateTodoPayload
) => {
  const todoRef = ref(db, `projects/${projectId}/todos/${todoId}`);
  try {
    await update(todoRef, updates);
    console.log(`Задача с id: ${todoId} была обновлена`);
  } catch (error) {
    console.error("Ошибка обновления задачи:", error);
  }
};

export const deleteTodo = async (projectId: projectId, todoId: todoId) => {
  const removeTodoDbRef = ref(db, `projects/${projectId}/todos/${todoId}`);
  try {
    remove(removeTodoDbRef);
  } catch (error) {
    console.error("Не удалось удалить задачу: ", error);
  }
};
