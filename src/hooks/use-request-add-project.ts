import { db } from "../firebase";
import { ref, push } from 'firebase/database'

export const useRequestAddProject = () => {
  const requestAddTodo = (value: string) => {
    const todosDbRef = ref(db, 'projects')

    push(todosDbRef, {
      todoValue: value,
      time: new Date(Date.now()).toLocaleString()
    })
  }

  return {
    requestAddTodo
  }
}