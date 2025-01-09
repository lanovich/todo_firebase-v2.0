import { db } from "../firebase";
import { ref, push } from 'firebase/database'

export const useRequestAddProject = () => {
  const requestAddProject = (value: string) => {
    const projectsDbRef = ref(db, `projects`)

    push(projectsDbRef, {
      time: new Date(Date.now()).toLocaleString(),
      name: value
    })
  }

  return {
    requestAddProject
  }
}