import { db } from "../firebase";
import { ref, remove } from 'firebase/database'

export const useRequestDeleteTodo = () => {
  const requestDeleteTodo = (id: string | undefined) => {
    const removetTodoDbRef = ref(db, `projects/project1/${id}`)
    remove(removetTodoDbRef)
  }

  return {
    requestDeleteTodo
  }
}