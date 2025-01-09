import { db } from "../firebase";
import { ref, remove } from 'firebase/database'

export const useRequestDeleteTodo = (projectId: string | undefined) => {
  const requestDeleteTodo = (todoId: string | undefined) => {
    const removeTodoDbRef = ref(db, `projects/${projectId}/todos/${todoId}`)
    remove(removeTodoDbRef)
  }

  return {
    requestDeleteTodo
  }
}