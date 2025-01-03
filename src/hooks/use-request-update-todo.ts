import { db } from '../firebase'
import { ref, set } from 'firebase/database'

export const useRequestUpdateTodo = () => {
  const requestUpdateTodo = (id: string | undefined, updatedValue: string) => {
    const todoDbRef = ref(db, `projects/project1/${id}`);

    set (todoDbRef, {
      time: new Date(Date.now()).toLocaleString(),
      todoValue: updatedValue,
    })
  }

  return {
    requestUpdateTodo
  };
}