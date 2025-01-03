import { db } from "../firebase";
import { ref, push } from 'firebase/database'

export const useRequestAddTodo = () => {
  const requestAddTodo = (value: string) => {
    const todosDbRef = ref(db, 'projects/project1')

    push(todosDbRef, {
      todoValue: value,
      time: new Date(Date.now()).toLocaleString()
    })
  }

  return {
    requestAddTodo
  }
}