import { db } from "../firebase";
import { ref, remove } from 'firebase/database'

export const useRequestDeleteProject = () => {
  const requestDeleteProject = (projectId: string | undefined) => {
    const removeProjectsDbRef = ref(db, `projects/${projectId}`)
    remove(removeProjectsDbRef)
  }

  return {
    requestDeleteProject
  }
}