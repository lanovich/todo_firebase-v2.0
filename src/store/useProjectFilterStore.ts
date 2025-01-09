import { create } from 'zustand'

type Store = {
  projectFilterParams: string;
  setProjectFilterParams: (projectFilterParams: string) => void;
}

export const useProjectListFilterStore = create<Store>()((set) => ({
  projectFilterParams: '',
  setProjectFilterParams: (projectFilterParams: string) => set({ projectFilterParams }),
}))
