import { db } from "../firebase";
import { ref, push } from 'firebase/database'

export const useRequestAddTodo = (projectId: string | undefined) => {
  const requestAddTodo = (value: string) => {
    const todosDbRef = ref(db, `projects/${projectId}/todos`)

    push(todosDbRef, {
      todoValue: value,
      time: new Date(Date.now()).toLocaleString()
    })
  }

  return {
    requestAddTodo
  }
}