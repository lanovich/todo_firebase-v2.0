import { db } from '../firebase'
import { ref, set } from 'firebase/database'

export const useRequestUpdateTodo = (projectId: string | undefined) => {
  const requestUpdateTodo = (todoId: string | undefined, updatedValue: string) => {
    const todoDbRef = ref(db, `projects/${projectId}/todos/${todoId}`);

    set (todoDbRef, {
      time: new Date(Date.now()).toLocaleString(),
      todoValue: updatedValue,
    })
  }

  return {
    requestUpdateTodo
  };
}